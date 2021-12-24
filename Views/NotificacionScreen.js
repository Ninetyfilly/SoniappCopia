import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
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
      setDatas({ mentorships: data.mentorships });
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedId, setSelectedId] = React.useState(null);
  const DATA = [
    {
      id: '1',
      title: 'Mentoria de React Native',
    },
    {
      id: '2',
      title: 'Reunion de Padawans',
    },
    {
      id: '3',
      title: 'Revision tecnica Soniapp',
    },
  ];

  const filterData = () => {
    console.log(datas.mentorships.length);
    const newTypes = [];
    let control = 0;
    for (let index = 1; index <= /*datas.mentorships.length*/ 100; index++) {
      const tempo = datas.mentorships.find((item) => item.id == index);
      if (tempo) {
        let descripcion =
          tempo.observation !== null ? tempo.observation : 'Sin descripcion';
        newTypes[control] = {
          id: tempo.id,
          title: tempo.event.title,
          date: tempo.event.date,
          time: tempo.event.time,
          observation: descripcion,
        };
        control++;
      }
    }
    setEvents(newTypes);
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Text style={[styles.title, textColor]}>Dia: {item.date}</Text>
      <Text style={[styles.title, textColor]}>Hora {item.time}</Text>
      <Text style={[styles.title, textColor]}>
        Observacion: {item.observation}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#b414c9' : '#00b7b8';
    const color = item.id === selectedId ? 'white' : 'black';
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
                onPress: () => Alert.alert('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  'This alert was dismissed by tapping outside of the alert dialog.'
                ),
            }
          ); //urilizar Modals
          setSelectedId(item.id);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    backgroundColor: '#00b7b8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
