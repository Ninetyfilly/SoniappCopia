import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Paragraph, Avatar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const moment = require('moment');
import GLOBALS from '../../Utils/Global';
import axios from 'axios';

const CalendarioScreen = ({navigation}) => {
  const _format = 'YYYY-MM-DD';
  const _today = moment().format(_format);
  const _maxDate = moment().add(30, 'days').format(_format);

  const mentoria = {
    key: 'metoria',
    color: 'black',
    selectedDotColor: 'black',
  };
  const revision = { key: 'revision', color: 'red', selectedDotColor: 'red' };
  const sesion = { key: 'sesion', color: 'green', selectedDotColor: 'green' };

  const [item, setItems] = useState({});
  const [marcas, setMarcas] = useState({});
  const [evento, setEvento] = useState({ eventos: [] });
  const [ready, setReady] = useState(false);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      getEventos();
    });
    return unsubscribe;
  }, [navigation]);

  const getEventos = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      try {
        const { data } = await axios.get(`${GLOBALS.API}events/list/`);
        setEvento({ eventos: data.eventos });
        console.log(data)
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    };


  const loadItems = (day) => {
    for (let i = 0; i < 30; i++) {
      var temporalDate = toString(evento.eventos.date)
      if(temporalDate > "2022-01-01")console.log("fecha mayor a enero")
      else console.log("fecha menor a enero")
      const strTime = moment().add(i, 'days').format(_format);
      const find = evento.eventos.filter((element) => element.date === strTime);
      const titulo = evento.eventos
        .filter((item) => item.date === strTime)
        .map((item) => item.title);
      const type = evento.eventos
        .filter((item) => item.date === strTime)
        .map((item) => item.type);
      const date = evento.eventos.filter((item) => item.date === strTime);
      let index = date.map((item) => item.date).indexOf(strTime);
      if (index !== -1) {
        item[strTime] = [];
        let suceso = type.toString();
        let letras =
          suceso == 'mentoria' ? 'M' : suceso == 'revision' ? 'R' : 'S';
        item[strTime].push({
          name: `${titulo.toString()}\n`, //ya sea su nombre, letra o lo que se requiera
          height: Math.max(50, Math.floor(Math.random() * 150)),
          label: letras,
        });
        const _selectedDay = strTime.toString();
        let tipo =
          suceso == 'mentoria'
            ? mentoria
            : suceso == 'revision'
            ? revision
            : sesion;
        const markedDates = { [_selectedDay]: { dots: tipo } };
        setMarcas({ dias: { ...marcas.dias, ...markedDates } });
      } else {
        item[strTime] = [];
      }
    }
    const newItems = {};
    Object.keys(item).forEach((key) => {
      newItems[key] = item[key];
    });
    setItems(newItems);
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Alert.alert(item.name, _today);
        }}
      >
        <Card>
          <Card.Content>
            <View style={styles.agendado}>
              <Paragraph>{item.name}</Paragraph>
              <Avatar.Text
                label={item.label}
                style={
                  item.label == 'M'
                    ? styles.mentoria
                    : item.label == 'R'
                    ? styles.revision
                    : styles.sesion
                }
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>___________________________________________________</Text>
      </View>
    );
  };
    return (
      <View style={styles.view}>
        <View style={{ flexDirection: 'row' }}>
          <Button icon='circle' color='red'>
            Mentoria
          </Button>
          <Button icon='circle' color='black'>
            Revision
          </Button>
          <Button icon='circle' color='green'>
            Sesion
          </Button>
        </View>
        <Agenda
          items={item} //aqui se asignan los items
          loadItemsForMonth={loadItems} //aqui se generan los datos de los items
          //selected={fechaActual}//Fecha seleccionada por defecto
          renderItem={renderItem} //aqui se renderizan los items que pertenecen al dia a dia
          minDate={_today} //Aqui se declara el dia minimo para ser seleccionado
          maxDate={_maxDate}
          renderEmptyDate={renderEmptyDate}
          markingType={'multi-dot'}
          //markedDates={marcas}
        />
      </View>
    );
};

export default CalendarioScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  agendado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:35
  },
  mentoria: {
    backgroundColor: 'red',
  },
  revision: {
    backgroundColor: 'black',
  },
  sesion: {
    backgroundColor: 'green',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
