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

const PadawanScreen = ({ navigation }) => {
  const [userToken, setUserToken] = useState('');
  const [events, setEvents] = useState('');

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
    console.log(userToken);
    const options = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${GLOBALS.API}events/myevents/`,
        options
      );
      const dataFormateados = data.events.map((item) => {
        return {
          id: item.id,
          title: item.title,
          date: item.date,
          time: item.time,
          type: item.type,
          duration: item.duration,
        };
      });
      setEvents(dataFormateados);
      console.log(events);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id % 2 == 0 ? '#c4d043' : '#585490';
    const color = item.id % 2 == 0 ? 'black' : 'white';
    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const Item = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Text style={[styles.title, textColor]}>fecha: {item.date}</Text>
      <Text style={[styles.title, textColor]}>time: {item.time}</Text>
      <Text style={[styles.title, textColor]}>tipo de evento: {item.type}</Text>
      <Text style={[styles.title, textColor]}>duracion: {item.duration}</Text>
    </View>
  );

  const LoadScreen = () => {
    if (events[0] !== undefined) {
      return (
        <View style={styles.view}>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={events}
              renderItem={renderItem}
              keyExtractor={(item) => `eventos-${item.id}`}
            />
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <View style={styles.view}>
          <Text style={styles.empty}>No hay eventos disponibles</Text>
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
  state: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  empty: {
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
