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
import GLOBALS from '../../Utils/Global';

const RequestMentory = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [mentoringTypes, setMentoringTypes] = useState({
    mentoring_types: [],
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [diaDisponible, setDiaDisponible] = useState('');
  const [later, setLater] = useState('');
  const [items, setItems] = useState([]);
  const [mentores, setMentores] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [token, setToken] = useState('');

  const [initialHour, setInitialHour] = useState(null);
  const [finalHour, setFinalHour] = useState(null);
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
  }, [mentoringTypes]);

  const getMentoring = async () => {
    try {
      const { data } = await axios.get(`${GLOBALS.API}events/mentoringdata/`);
      setMentoringTypes({ mentoring_types: data.mentoring_types });
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
    const mentors = mentory.mentors.map((item) => {
      return { label: item.name, value: item.id };
    });
    const itemMentors = { label: 'Sin Mentores', value: null };
    if (mentors[0] !== undefined) {
      setMentores(mentors);
    } else {
      setMentores(itemMentors);
    }
  };

  const getAvailability = (id) => {
    const mentory = mentoringTypes.mentoring_types.find(
      (item) => item.name == later
    );
    const mentors = mentory.mentors.find((item) => {
      return item.id == id;
    });
    console.log(mentors);
    if (mentors !== undefined) {
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
      const itemDisponibilidad = { label: 'Sin disponibilidad', value: null };
      if (disponibilidad[0] !== undefined) {
        setAvailability(disponibilidad);
      } else {
        setAvailability(itemDisponibilidad);
      }
    }
  };

  const filterType = () => {
    const newTypes = mentoringTypes.mentoring_types.map((item) => {
      return { label: item.name, value: item.id };
    });
    setItems(newTypes);
  };

  const DIAS = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const getHours = (day) => {
    console.log(mentorSelected);
    if (day !== null && mentorSelected !== undefined) {
      const mentory = mentoringTypes.mentoring_types.find(
        (item) => item.name == later
      );
      const mentors = mentory.mentors.find((item) => {
        return item.name == mentorSelected;
      });
      const availability = mentors.availability.find((item) => item.day == day);
      setInitialHour(availability.start_hour);
      setFinalHour(availability.final_hour);
    } else {
      setInitialHour(null);
      setFinalHour(null);
    }
  };

  const onChange = (event, selectedDate) => {
    if (initialHour !== null) {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      let day = currentDate.toISOString();
      let dates = day.slice(0, 10);
      let hour = currentDate.toLocaleTimeString();
      let dia = currentDate.getDay();
      if (diaDisponible == DIAS[dia]) {
        setDay(dates);
        if (initialHour <= hour && hour <= finalHour) {
          setTime(hour);
        } else {
          Alert.alert('Coloca el la hora disponible del mentor');
        }
      } else {
        Alert.alert('Coloca el dia disponible del mentor que seleccionaste');
      }
    } else {
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

  const loadData = async () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const datas = {
      mentor: mentorId,
      mentoring_type: mentoringId,
      event: {
        date: day,
        time,
        title,
        duration: '01:00:00',
        type: 'mentoria',
      },
      observation: description,
    };

    try {
      const { data } = await axios.post(
        `${GLOBALS.API}events/mentoring/create/`,
        datas,
        options
      );
      Alert.alert(
        'Mentoria Agendada',
        'Se ha agendado su mentoria de ' +
          title +
          ' el dia ' +
          day +
          ' a las ' +
          time +
          ' horas,\n con el mentor ' +
          mentorSelected
      );
      setTitle('');
      setDescription('');
      setLoading(false);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.error);
      Alert.alert(
        'Error',
        errorObject.data.error !== undefined
          ? errorObject.data.error
          : 'Selecciona bien los datos'
      );
      setLoading(false);
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
      <View style={styles.borderInput}>
        <RNPickerSelect //mentoring
          onValueChange={(value) => {
            getMentor(value);
          }}
          items={items}
          placeholder={{}}
          // useNativeAndroidPickerStyle={false}
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
      </View>
      <View paddingVertical={5} />
      <Text>Selecciona al mentor</Text>
      <View style={styles.borderInput}>
        <RNPickerSelect //Mentor
          onValueChange={(value) => {
            getAvailability(value);
          }}
          items={mentores}
          placeholder={{}}
          // useNativeAndroidPickerStyle={false}
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
      </View>
      <View paddingVertical={5} />
      <Text>Selecciona el horario y el dia</Text>
      <View style={styles.borderInput}>
        <RNPickerSelect //availability
          onValueChange={(value) => {
            getHours(value);
            setDiaDisponible(value);
          }}
          items={availability}
          // placeholder={{}}
          // useNativeAndroidPickerStyle={false}
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
      </View>
      <View style={{ marginTop: 12 }}>
        <Button
          disabled={initialHour !== null ? false : true}
          onPress={showDatepicker}
          title='Selecciona el Dia'
          color='#00b7b8'
          style={{ borderRadius: 5 }}
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button
          disabled={initialHour !== null ? false : true}
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
          loadData();
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
  borderInput: {
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderRadius: 10,
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
    display: 'flex',
    fontSize: 35,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 15,
  },
});
