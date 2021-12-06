import React, { Component, useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const RequestMentory = ({ navigation }) => {
  const _format = 'YYYY-MM-DD';

  const [loading, setLoading] = useState(false);
  const [mentoringTypes, setMentoringTypes] = useState({
    mentoring_types: [],
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [diaDisponible, setDiaDisponible] = useState('');

  const [later, setLater] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [typeArray, setTypeArray] = useState([]);
  const [items, setItems] = useState([]);
  const [mentores, setMentores] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [token, setToken] = useState('');

  const [initialHour, setInitialHour] = useState('');
  const [finalHour, setFinalHour] = useState('');

  const [mentorArray, setMentorArray] = useState([]);
  const [dateArray, setDateArray] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [mentorSelected, setMentorSelected] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [mentoringId, setMentoringId] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      getMentoring();
      getToken();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterType();
    console.log('Listo');
  }, [mentoringTypes]);

  const getMentoring = async () => {
    try {
      const { data } = await axios.get(
        'https://api.soniapp.hackademy.lat/events/mentoringdata/'
      );
      setMentoringTypes({ mentoring_types: data.mentoring_types });
      // console.log(mentoringTypes.mentoring_types);
    } catch (error) {
      console.log(error + ' ha salido mal sin aprametros');
    }
  };

  const getMentor = (id) => {
    setMentoringId(id);
    const mentory = mentoringTypes.mentoring_types.find(
      (item) => item.id == id
    );
    setLater(mentory.name);
    console.log(later);
    const mentors = mentory.mentors.map((item) => {
      return { label: item.name, value: item.id };
    });
    setMentores(mentors);
  };

  const getAvailability = (id) => {
    const mentory = mentoringTypes.mentoring_types.find(
      (item) => item.name == later
    );
    const mentors = mentory.mentors.find((item) => {
      return item.id == id;
    });
    setMentorSelected(mentors.name);
    setMentorId(mentors.id);
    const disponibilidad = mentors.availability.map((item) => {
      return {
        label:
          item.day +
          ' Hora Inicial: ' +
          item.start_hour +
          ' Hora final: ' +
          item.final_hour,
        value: item.day,
      };
    });
    setAvailability(disponibilidad);
  };

  const filterType = () => {
    const newTypes = [];
    for (
      let index = 1;
      index <= mentoringTypes.mentoring_types.length;
      index++
    ) {
      const typeMentoring = mentoringTypes.mentoring_types.find(
        (item) => item.id == index
      );
      newTypes[index - 1] = {
        label: typeMentoring.name,
        value: typeMentoring.id,
      };
    }
    setItems(newTypes);
  };

  const DIAS = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  const getHours = (day) => {
    const mentory = mentoringTypes.mentoring_types.find(
      (item) => item.name == later
    );
    const mentors = mentory.mentors.find((item) => {
      return item.name == mentorSelected;
    });
    const availability = mentors.availability.find((item) => item.day == day);
    setInitialHour(availability.start_hour);
    setFinalHour(availability.final_hour);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let day = currentDate.toISOString();
    let dates = day.slice(0, 10);
    let hour = currentDate.toLocaleTimeString();
    let dia = currentDate.getDay();
    if (diaDisponible == DIAS[dia - 1]) {
      setDay(dates);
      if (initialHour <= hour && hour <= finalHour) {
        setTime(hour);
      } else {
        Alert.alert('Coloca el la hora disponible del mentor');
      }
    } else {
      Alert.alert('Coloca el dia disponible del mentor que seleccionaste');
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setToken(token);
    } catch (e) {}
  };

  const _Login = async () => {
    console.log('mentor id: ', mentorId);
    console.log('mentoring id: ', mentoringId);
    console.log(day);
    console.log(time);
    console.log(title);
    console.log(description);
    console.log(token);
    let datas = {
      mentor: mentorId,
      mentoring_type: mentoringId,
      event: {
        date: day,
        time: time,
        title: title,
        duration: '00:10:00',
      },
    };
    let headers = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Token ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        'https://api.soniapp.hackademy.lat/events/mentoring/',
        {
          //   mentor: mentorId,
          // mentoring_type: mentoringId,
          // event: {
          //   date,
          //   time,
          //   title,
          //   duration: "01:30:00"
          // }
          mentor: 2,
          mentoring_type: 1,
          event: {
            date: '2021-11-22',
            time: '17:21:00',
            title: 'Prueba 4',
            duration: '00:10:00',
          },
        },
        {
          headers: headers,
        }
      );
      console.log(data);
      Alert.alert(
        'Se ha agendado su cita de ' +
          title +
          ' el dia ' +
          day +
          ' a las ' +
          time +
          ' horas, con el mentor ' +
          mentorSelected
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.view}>
      <TextInput
        label='titulo'
        mode='outlined'
        maxLength={21}
        characterRestriction={20}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setTitle}
      />
      <View paddingVertical={5} />
      <Text>Selecciona el tipo de mentoria</Text>
      <RNPickerSelect //mentoring
        onValueChange={(value) => {
          console.log(value);
          getMentor(value);
        }}
        items={items}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        Icon={() => {
          return <Ionicons name='md-arrow-down' size={24} color='gray' />;
        }}
      />
      <View paddingVertical={5} />
      <Text>Selecciona al mentor</Text>
      <RNPickerSelect //Mentor
        onValueChange={(value) => {
          console.log(value);
          getAvailability(value);
        }}
        items={mentores}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        Icon={() => {
          return <Ionicons name='md-arrow-down' size={24} color='gray' />;
        }}
      />
      <View paddingVertical={5} />
      <Text>Selecciona el horario y el dia</Text>
      <RNPickerSelect //availability
        onValueChange={(value) => {
          console.log(value);
          getHours(value);
          setDiaDisponible(value);
        }}
        items={availability}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        Icon={() => {
          return <Ionicons name='md-arrow-down' size={24} color='gray' />;
        }}
      />
      <View style={{ marginTop: 12 }}>
        <Button
          onPress={showDatepicker}
          title='Selecciona el Dia'
          color='#00b7b8'
          style={{ borderRadius: 5 }}
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button
          onPress={showTimepicker}
          title='Selecciona la hora'
          color='#00b7b8'
          style={{ borderRadius: 5 }}
        />
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      <TextInput
        label='Descripcion (opcional)'
        mode='outlined'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={styles.bottonLogin}
        onPress={() => {
          _Login();
        }}
        disabled={loading}
      >
        <Text style={styles.textoBotonLogin}>
          {loading ? 'Cargando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestMentory;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  mentoringBox: {
    marginBottom: 5,
  },
  skillBox: {
    marginBottom: 5,
  },
  availabilityBox: {
    marginBottom: 5,
  },
  dateBox: {
    marginBottom: 5,
  },
  bottonLogin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b7b8',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 35,
  },
  textoBotonLogin: {
    color: '#ffffff',
    fontFamily: ('Poppins', 'sans-serif'),
    fontWeight: 'bold',
    fontSize: 18,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
