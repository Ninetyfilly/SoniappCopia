import React, {useState} from 'react';
import {View,StyleSheet, TouchableOpacity,Text} from 'react-native';
import { Agenda} from 'react-native-calendars';
import { Card, Paragraph, Avatar } from 'react-native-paper';

const CalendarioScreen:React.FC = () =>{

    const [item, setItems] = useState({})

    const loadItems = (day) => {
        setTimeout(() => {
        for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!item[strTime]) {
          item[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            item[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(item).forEach(key => {
        newItems[key] = item[key];
      });
        setItems(newItems);
    }, 1000);
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };

    const renderItem = (item) =>{
        return(
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View style={styles.agendado}>
                              <Paragraph>{item.name}</Paragraph>
                            <Avatar.Text label="J"/>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );

    }


    return(
        <View style={styles.view}>
            <Agenda
                items={item}
                loadItemsForMonth={loadItems}
                selected={'2021-10-20'}
                renderItem={renderItem}
                //renderEmptyDate={this.renderEmptyDate.bind(this)}
                //rowHasChanged={this.rowHasChanged.bind(this)}
                //showClosingKnob={true}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#43515c'},
                //    '2017-05-09': {textColor: '#43515c'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                // hideExtraDays={false}
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
  }
});