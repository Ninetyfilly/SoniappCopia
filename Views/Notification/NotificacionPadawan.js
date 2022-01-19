import React, { useState, useEffect } from 'react';
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

const PadawanScreen = () => {
  const [userToken, setUserToken] = useState('');
  const [events, setEvents] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [changue, setChangue] = useState(false);

  useEffect(() => {
    getEvents();
  }, [userToken, changue]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (e) {}
  };

  const getEvents = async () => {
    const options = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${GLOBALS.API}events/event/padawan/assistance/`,
        options
      );
      const dataFormateados = data.events.map((item) => {
        return {
          id: item.id,
          title: item.title,
          date: item.date,
          time: item.time,
          type: item.type,
          observation: 'sin descripcion',
        };
      });
      setEvents(dataFormateados);
      console.log(dataFormateados);
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
        <Text style={[styles.type, textColor]}>{item.type}</Text>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text style={[styles.title, textColor]}>Dia: {item.date}</Text>
        <Text style={[styles.title, textColor]}>Hora {item.time}</Text>
      </TouchableOpacity>
    );
  };

  const eventResponse = async (response,id) => {
    console.log(response);
    console.log(id)
    const options = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${GLOBALS.API}events/event/padawan/confirm/${id}/`,
        { response },
        options
      );
      const attendance = response == 1 ? 'confirmada' : 'rechazada';
      Alert.alert('Asistencia ' + attendance + ' correctamente');
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

  const renderItem = ({ item }) => {
    const backgroundColor = item.id % 2 == 0 ? '#c4d043' : '#585490';
    const color = item.id % 2 == 0 ? 'black' : 'white';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          Alert.alert(
            'Confirmar asistencia en el evento',
            item.title + '\ndia: ' + item.date + '\nhora: ' + item.time,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Confirmar',
                onPress: () => eventResponse(1,item.id), //1 es asistira
                style: 'cancel',
              },
              {
                text: 'Rechazar',
                onPress: () => eventResponse(0,item.id), //0 es no asistira
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            }
          ); //urilizar Modals
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
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
};

export default PadawanScreen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
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
  type: {
    fontSize: 20,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  empty: {
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
