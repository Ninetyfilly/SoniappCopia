import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [token, setToken] = React.useState('');
  const [events, setEvents] = React.useState('');
  const [datas, setDatas] = React.useState({ mentorships: [] });
  const [selectedId, setSelectedId] = React.useState(null);
  
  React.useEffect(() => {
    getToken();
  }, []);

  React.useEffect(() => {
    getData();
  }, [token]);

  React.useEffect(() => {
    filterData();
  }, [datas]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setToken(token);
    } catch (e) {}
  };

  const getData = async () => {
    const options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Token ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `https://api.soniapp.hackademy.lat/events/mentoring/retrieve/`,
        options
      );
      const dataFormateados = data.mentorships.map((item) => {
        return {
            id: item.id,
            title: item.event.title
          }
        }
      )
      console.log(dataFormateados)
      setDatas({ mentorships: data.mentorships });

    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    const newTypes = [];
    let control = 0;
    for (let index = 1; index <= /*datas.mentorships.length*/ 100; index++) {
      const tempo = datas.mentorships.find((item) => item.id == index);
      if (tempo) {
        console.log(tempo)
        let descripcion =
          tempo.observation !== null ? tempo.observation : 'Sin descripcion';
        newTypes[control] = {
          id: tempo.id,
          title: tempo.event.title,
          date: tempo.event.date,
          time: tempo.event.time,
          observation: descripcion,
          status: tempo.status,
        };
        control++;
      }

    }
    setEvents(newTypes);
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text style={[styles.title, textColor]}>Dia: {item.date}</Text>
        <Text style={[styles.title, textColor]}>Hora {item.time}</Text>
        <Text style={[styles.title, textColor]}>
          Observacion: {item.observation}
        </Text>
      </TouchableOpacity>
    );
  };

  const mentoringResponse = async(response) => {
    const options = {
      headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        // 'Access-Control-Allow-Origin': '*',
        Authorization: `Token ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `https://api.soniapp.hackademy.lat/events/mentoring/response/${selectedId}/`,
        {response},
        options
      );
      Alert.alert("Mentoria "+respónse,
        'La mentoria ha sido '+response+' correctamente'
      );
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.error);
      Alert.alert("Error",errorObject.data.error !== undefined?errorObject.data.error:"Ha ocurrido un error");
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#b414c9' : item.status === 'solicitada'? 'grey' : item.status === 'confirmada'? '#00b7b8' : item.status === 'finalizada'?'black':'#cf3232';
    const color = item.id === selectedId ? 'white' : item.status === 'solicitada'? 'black' : 'white';
    if (item.status == 'solicitada') {
      return (
        <Item
          item={item}
          onPress={() => {
            Alert.alert(
              'Aceptar o rechazar mentoria',
              item.title + '\ndia: ' + item.date + '\nhora: ' + item.time,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Aceptar',
                  onPress: () => mentoringResponse("confirmada"),
                  style: 'cancel',
                },
                {
                  text: 'Rechazar',
                  onPress: () => mentoringResponse("rechazada"),
                  style: 'cancel',
                },
              ],
              {
                cancelable: true,
              }
            ); //urilizar Modals
            setSelectedId(item.id);
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    }else{
      return (
        <Item
          item={item}
          textColor={{ color }}
          backgroundColor={{ backgroundColor }}
        />
      );
    }
  };

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => `Notificacion-${item.id}`}
          extraData={selectedId}
          //   horizontal={true} //seutiliza para renderizar los elementos de forma horizontal
        />
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});
