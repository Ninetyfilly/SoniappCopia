import React, {useState} from 'react';
import {View,StyleSheet, TouchableOpacity,Text,Alert} from 'react-native';
import { Agenda} from 'react-native-calendars';
import { Card, Paragraph, Avatar,Button} from 'react-native-paper';
const moment = require('moment');

const CalendarioScreen:React.FC = () =>{

    const [item, setItems] = useState({})
    const [marcas, setMarcas] = useState({})
    const [Dias, setDias] = useState({})

    const loadItems = (day) => {
          for (let i = 0; i < 13; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!item[strTime]) {
              item[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              let letras = ["M","R","ME"];
              let colores = ["black","red","green"];
              let Tema = ["Mentoria","Revision","Mentoria externa"];
              for (let j = 0; j < numItems; j++) { //en este ciclo se agregan los atributos que llevara la agenda por dia
                item[strTime].push({
                  name: strTime + '\n '+ Tema[j] + ' sobre *****', //ya sea su nombre, letra o lo que se requiera
                  height: Math.max(50, Math.floor(Math.random() * 150)), 
                  label: letras[j],
                  selectedDotColor: colores[j],
                });
              }
            }
          }
          const newItems = {};
          Object.keys(item).forEach(key => {
            newItems[key] = item[key];
          });
          setItems(newItems);
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };

    const generarAgenda=()=>{



    }    


    const renderItem = (item) =>{
        return(
            <TouchableOpacity style={styles.item} onPress={()=>{Alert.alert("Oh, oprimiste el botón" + fechaActual())}}>
                <Card>
                    <Card.Content>
                        <View style={styles.agendado}>
                            <Paragraph>{item.name}</Paragraph>
                            <Avatar.Text label={item.label} style={ item.label == 'M' ? styles.mentoria : item.label == "R" ? styles.revision : styles.mentoriaExterna}/>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );

    }

    const fechaActual =() =>{ //este metodo regresa el dia actual
      let now = moment().format('L');
      console.log(now);
      return now;
    }

    const renderEmptyDate=()=> {
    return (
      <Card>
        <Card.Content>
          <View style={styles.agendado}>
            <Paragraph>Esto esta vacio, demasiado vacio</Paragraph>
          </View>
        </Card.Content>
      </Card>
    );
  }

 /* const marcasDiarias =()=>{
    const vacation = {key: 'metoria', color: 'red', selectedDotColor: 'blue'};
    //const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    //const workout = {key: 'workout', color: 'green'};

    for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!marcas[strTime]) {
                marcas[strTime] = [];
                marcas[strTime].push({

                });
            }
          }
  } */
const mentoria = {key: 'mentoria', color: 'red'};
const revision = {key: 'revision', color: 'black'};
const mentoriaExt = {key: 'mentoriaExt', color: 'green'};
  return(
      <View style={styles.view}>
          <View style={{flexDirection: "row"}}>
          <Button icon="circle" color="red">Mentoria</Button>
          <Button icon="circle" color="black">Revision</Button>
          <Button icon="circle" color="green">Mentoria ext</Button>
          </View>
          <Agenda
              items={item}//aqui se asignan los items
              loadItemsForMonth={loadItems}//aqui se generan los datos de los items
              //selected={fechaActual}//Fecha seleccionada por defecto
              renderItem={renderItem}//aqui se renderizan los items que pertenecen al dia a dia
              minDate={fechaActual} //Aqui se declara el dia minimo para ser seleccionado
              //maxDate={fechaActual}
              renderEmptyDate={renderEmptyDate}
              
              markingType={'multi-dot'}
              markedDates={{
              '2021-11-01': {dots: [mentoria, revision, mentoriaExt], selected: true, selectedColor: 'red'},
              '2021-11-02': {dots: [revision, mentoriaExt]},
              '2021-11-03': {dots: [mentoria, mentoriaExt],},
              '2021-11-05': {dots: [mentoria],}
              }}
            />
     </View>
    );
}

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
    paddingTop: 30
  },
  agendado:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
  },
  view:{
      flex: 1,
      marginTop: 50
  },
  mentoria:{
    backgroundColor: "red",
  },
  revision:{
    backgroundColor: "black",
  },
  mentoriaExterna:{
    backgroundColor: "green",
  }
});