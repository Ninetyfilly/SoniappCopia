import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Agenda,LocaleConfig } from 'react-native-calendars';
import { Card, Paragraph, Avatar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const moment = require('moment');
import GLOBALS from '../../Utils/Global';
import axios from 'axios';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ],
  monthNamesShort: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
  dayNames: ['domingo', 'lunnes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom.', 'lun.', 'mar.', 'miér.', 'jue.', 'vie.', 'sáb.'],
  today: "Hoy"
};
LocaleConfig.defaultLocale = 'fr';

const CalendarioScreen = ({ navigation }) => {
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
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  const loadItems = (day) => {
    var temporalDots= [];
    for (let i = 0; i < 30; i++) {
      const strTime = moment().add(i, 'days').format(_format);
      const find = evento.eventos.filter((element) => element.date === strTime);
      const type = evento.eventos
        .filter((item) => item.date === strTime)
        .map((item) => item.type);
      const date = evento.eventos.filter((item) => item.date === strTime);
      let indexo = date.map((item) => item.date).indexOf(strTime);
      if (indexo !== -1) {
        item[strTime] = [];
        let suceso = type.toString();
        const r = find.map((item) => {
          return {
            name: `${item.title.toString()}`, //ya sea su nombre, letra o lo que se requiera
            label: item.type,
            date: item.date,
            time: item.time,
          };
        });
        for (let index = 0; index < r.length; index++) {
          let letras =
            r[index].label == 'mentoria'
              ? 'M'
              : r[index].label == 'revision'
              ? 'R'
              : 'S';
          item[strTime].push({
            name: r[index].name, //ya sea su nombre, letra o lo que se requiera
            label: letras,
            date: r[index].date,
            time: r[index].time,
          });
        }
        const _selectedDay = strTime.toString();
        let tipo =
          suceso == 'mentoria'
            ? mentoria
            : suceso == 'revision'
            ? revision
            : sesion;
        // var temporal2 = { [_selectedDay]: { dots: [tipo] } }
        temporalDots[i] =[{ [_selectedDay]: { dots: [tipo] } }]

        // const markedDates = { [_selectedDay]: { dots: [tipo] } };
        // console.log('Dots: ', markedDates);
        // setMarcas( [_selectedDay]: { dots: [tipo] } );

      } else {
        item[strTime] = [];
      }
    }
    var temporal2 = temporalDots.flatMap(x => x == undefined ? {} : x);
    // const obj = Object.assign({}, temporal2);
    // console.log(temporal2)
    // as(temporal2)
    const newItems = {};
    Object.keys(item).forEach((key) => {
      newItems[key] = item[key];
    });
    setItems(newItems);
  };

  // const as = (tempo)=>{
    // console.log(tempo)
    // var obj = {}
    // if(tempo[0] !== undefined){
    //   obj = Object.assign(tempo);
      // obj = Object.assign(tempo[1]);
    // }
    // console.log(obj)
    // for (let index = 0; index < tempo.length; index++) {
    //   obj = Object.assign(tempo[index]);
    //   console.log("Objeto: ",obj)
    // }
    // console.log("objeto encadenado: ", obj)
  // }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Alert.alert(item.name, item.date+'\n'+item.time );
        }}
      >
        <Card>
          <Card.Content>
            <View style={styles.agendado}>
              <Paragraph style={{fontSize: 21}}>{item.name}</Paragraph>
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

  // console.log(marcas);
  return (
    <View style={styles.view}>
      <View style={{ flexDirection: 'row' }}>
        <Button icon='circle' color='#cf3232'>
          Mentoria
        </Button>
        <Button icon='circle' color='black'>
          Revision
        </Button>
        <Button icon='circle' color='#c4d043'>
          Sesion
        </Button>
      </View>
      <Agenda
        items={item} //aqui se asignan los items
        loadItemsForMonth={loadItems} //aqui se generan los datos de los items
        selected={_today} //Fecha seleccionada por defecto
        renderItem={renderItem} //aqui se renderizan los items que pertenecen al dia a dia
        minDate={_today} //Aqui se declara el dia minimo para ser seleccionado
        maxDate={_maxDate}
        renderEmptyDate={renderEmptyDate}
        // markingType={'multi-dot'}
        // markedDates={marcas}
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
    marginTop: 10,
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
    marginTop: 35,
  },
  mentoria: {
    backgroundColor: '#cf3232',
  },
  revision: {
    backgroundColor: 'black',
  },
  sesion: {
    backgroundColor: '#c4d043',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
