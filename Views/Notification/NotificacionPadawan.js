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

  

  useEffect(() => {
    getEvents();
  }, [userToken]);

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
      // const dataFormateados = data.mentorships.map((item) => {
      //   let descripcion =
      //     item.observation !== null ? item.observation : 'Sin descripcion';
      //   return {
      //       id: item.id,
      //       title: item.event.title,
      //       date: item.event.date,
      //       time: item.event.time,
      //       observation: descripcion,
      //       status: item.status,
      //     }
      //   }
      // )
      // setEvents(dataFormateados)
      console.log(data);
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
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text style={[styles.title, textColor]}>Dia: {item.date}</Text>
        <Text style={[styles.title, textColor]}>Hora {item.time}</Text>
        <Text style={[styles.title, textColor]}>
          Observacion: {item.observation}
        </Text>
      </TouchableOpacity>
    );
  };
  const backgroundColorChange = (status) => {
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
    const backgroundColor = backgroundColorChange(item.status);
    const color = item.status === 'solicitada' ? 'black' : 'white';
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
                  onPress: () => mentoringResponse('confirmada'),
                  style: 'cancel',
                },
                {
                  text: 'Rechazar',
                  onPress: () => mentoringResponse('rechazada'),
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
    } else {
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

export default PadawanScreen;
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
  state: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
});
