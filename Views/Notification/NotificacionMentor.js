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
import GLOBALS from '../../Utils/Global';

const MentorScreen = () => {
  const [token, setToken] = React.useState('');
  const [events, setEvents] = React.useState('');
  const [changue, setChangue] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  React.useEffect(() => {
    getToken();
  }, []);

  React.useEffect(() => {
    getData();
  }, [token, changue]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setToken(token);
    } catch (e) {}
  };

  const getData = async () => {
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${GLOBALS.API}events/mentoring/teach/`,
        options
      );
      const dataFormateados = data.mentorships.map((item) => {
        let descripcion =
          item.observation !== null ? item.observation : 'Sin descripcion';
        return {
          id: item.id,
          title: item.event.title,
          date: item.event.date,
          time: item.event.time,
          observation: descripcion,
          status: item.status,
        };
      });
      setEvents(dataFormateados);
    } catch (error) {
      console.log(error);
    }
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <Text style={[styles.state, textColor]}>{item.status}</Text>
        <Text style={[styles.title]}>{item.title}</Text>
        <Text style={[styles.title]}>
          Dia: <Text style={styles.subTitle}>{item.date}</Text>
        </Text>
        <Text style={[styles.title]}>
          Hora: <Text style={styles.subTitle}>{item.time}</Text>
        </Text>
        <Text style={[styles.title]}>
          Observacion: <Text style={styles.subTitle}>{item.observation}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const mentoringResponse = async (response, id) => {
    console.log(response);
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${GLOBALS.API}events/mentoring/response/${id}/`,
        { response },
        options
      );
      Alert.alert(
        'Mentoria ' + response,
        'La mentoria ha sido ' + response + ' correctamente'
      );
      if (!changue) {
        setChangue(true);
      } else {
        setChangue(false);
      }
    } catch (error) {
      console.log(error);
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.error);
      Alert.alert(
        'Error',
        errorObject.data.error !== undefined
          ? errorObject.data.error
          : 'Ha ocurrido un error'
      );
    }
  };

  const textColorStatusChange = (status) => {
    if (status === 'solicitada') {
      return 'grey';
    } else if (status === 'confirmada') {
      return '#00b7b8';
    } else if (status === 'finalizada') {
      return 'black';
    } else {
      return '#cf3232';
    }
  };

  const renderItem = ({ item }) => {
    const color = textColorStatusChange(item.status);
    if (item.status == 'solicitada') {
      return (
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.id);
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
                  onPress: () => mentoringResponse('confirmada', item.id),
                  style: 'cancel',
                },
                {
                  text: 'Rechazar',
                  onPress: () => mentoringResponse('rechazada', item.id),
                  style: 'cancel',
                },
              ],
              {
                cancelable: true,
              }
            ); //urilizar Modals
          }}
          textColor={{ color }}
        />
      );
    } else {
      return <Item item={item} textColor={{ color }} />;
    }
  };
  const LoadScreen = () => {
    if (events[0] !== undefined) {
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
    } else {
      return (
        <View style={styles.view}>
          <Text style={styles.empty}>No hay eventos por confirmar</Text>
        </View>
      );
    }
  };
  return LoadScreen();
}

export default MentorScreen;
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
    borderWidth: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 25,
  },
  state: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },empty: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
