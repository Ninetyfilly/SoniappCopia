import React, { Component, useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const RequestMentory = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [mentoringTypes, setMentoringTypes] = useState({
    mentoring_types: [],
  });

  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [mentor, setMentor] = useState({ mentors: [] });

  const [availability, setAvailability] = useState({ availability: [] });

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [typeArray, setTypeArray] = useState([]);
  const [items, setItems] = useState([]);
  const [id, setId] = useState([]);
  const [mentores, setMentores] = useState([]);
  const [date, setDate] = useState([]);
  
  const [ejemplo, setEjemplo] = useState({});

  const [mentorArray, setMentorArray] = useState([]);
  const [dateArray, setDateArray] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // Screen was focused
      // Do something
      await getMentoring();
    });
    return unsubscribe;
  });

  const getMentoring = async () => {
    try {
      const { data } = await axios.get(
        'https://api.soniapp.hackademy.lat/events/mentoringdata/'
      );
      setMentoringTypes({ mentoring_types: data.mentoring_types });
      // console.log(mentoringTypes.mentoring_types);
      filterType();
      renderItems();
    } catch (error) {
      console.log(error + ' ha salido mal sin aprametros');
    }
  };

  const getMentor = async (skill) => {
    try {
      const { data } = await axios.get(
        `https://api.soniapp.hackademy.lat/events/mentoringdata/?skill=${skill}`
      );
      setMentor({ mentors: data.mentors });
      filterMentor();
      renderMentors();
    } catch (error) {
      console.log(error + ' ha salido mal skill');
    }
  };

  const getAvailability = async (id) => {
    try {
      const { data } = await axios.get(
        `https://api.soniapp.hackademy.lat/events/mentoringdata/?mentor=${id}`
      );
      setAvailability({ availability: data.availability });
      filterAvailability();
      renderAvailability();
    } catch (error) {
      console.log(error + ' ha salido mal id');
    }
  };

  const filterType = () => {
    const newTypes = [];
    for (
      let index = 1;
      index <= mentoringTypes.mentoring_types.length;
      index++
    ) {
      const types = mentoringTypes.mentoring_types
        .filter((item) => item.id == index)
        .map((item) => item.name);
      let type = types.toString();
      newTypes[index] = type;
    }
    setTypeArray([...newTypes]);
  };

  const filterMentor = () => {
    const newMentor = [];
    for (let index = 1; index <= mentor.mentors.length; index++) {
      const name = mentor.mentors
        .filter((item) => item.id == index)
        .map((item) => item.name);
      let type = name.toString();
      newMentor[index] = type;
    }
    setMentorArray([...newMentor]);
  };

  const filterAvailability = () => {
    const newAvailability = [];
    for (let index = 1; index <= availability.availability.length; index++) {
      const day = availability.availability
        .filter((item) => item.id == index)
        .map((item) => item.day);

      const initialHour = availability.availability
        .filter((item) => item.id == index)
        .map((item) => item.start_hour);

      const finalHour = availability.availability
        .filter((item) => item.id == index)
        .map((item) => item.final_hour);

      let day1 = day.toString();
      let iniH = initialHour.toString();
      let finH = finalHour.toString();

      newAvailability[
        index
      ] = `dia: ${day1} \n Hora inicial: ${iniH}\nHora Final: ${finH}`;
    }
    console.log(availability.availability);
    setDateArray([...newAvailability]);
  };

  const renderItems = () => {
    const newItems = [];
    for (let index = 0; index < typeArray.length - 1; index++) {
      newItems[index] = {
        label: typeArray[index + 1],
        value: typeArray[index + 1],
      };
    }
    setItems([...newItems]);
  };

  const renderMentors = () => {
    const newMentor = [];
    for (let index = 0; index < mentorArray.length - 1; index++) {
      newMentor[index] = {
        label: mentorArray[index + 1],
        value: index + 1,
      };
    }
    setMentores([...newMentor]);
  };

  const renderAvailability = () => {
    const newAvailability = [];
    for (let index = 0; index < dateArray.length - 1; index++) {
      newAvailability[index] = {
        label: dateArray[index + 1],
        value: dateArray[index + 1],
      };
    }
    setDate([...newAvailability]);
  };

  const _Login = () => {
  };

  setEjemplo({
    titulo: "este es un titulo",
    mentoring: "React native",
    mentor: "Luis",
    date: "martes 25"
  })

  return (
    <View style={styles.view}>
      <Text>Selecciona la mentoria que deseas editar</Text>
      <RNPickerSelect //mentoring
        onValueChange={(value) => console.log(value)}
        items={id}
        placeholder={ejemplo.titulo}
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
        onValueChange={(value) => console.log(value)}
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
      <Text>Selecciona la habilidad</Text>
      <RNPickerSelect //skill
        onValueChange={(value) => {
          console.log(value);
          getMentor(value);
        }}
        items={[
          { label: 'Backend', value: 'back' },
          { label: 'Frontend', value: 'front' },
          { label: 'Móvil', value: 'movil' },
        ]}
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
      <RNPickerSelect //Availability
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
      <RNPickerSelect //date
        onValueChange={(value) => {
          console.log(value);
        }}
        items={date}
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
    marginTop: 35
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
