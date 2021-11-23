import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
const moment = require('moment');

const RequestMentory = ({ navigation }) => {
  const _format = 'YYYY-MM-DD';
  const _today = moment().format(_format);
  const _maxDate = moment().add(30, 'days').format(_format);

  const [day, setDay] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onSubmit=()=>{

  }

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <TextInput
        label='titulo'
        mode='outlined'
        maxLength={21}
        characterRestriction={20}
        // onChangeText={setPasswordConfirm}
        onSubmitEditing={onSubmit}
        autoCapitalize='none'
        autoCorrect={false}
        // error={errors.password}
      />
      <TextInput
        label='Mentor'
        mode='outlined'
        maxLength={21}
        characterRestriction={20}
        // onChangeText={setPasswordConfirm}
        onSubmitEditing={onSubmit}
        autoCapitalize='none'
        autoCorrect={false}
        // error={errors.password}
      />
      <Button onPress={showDatepicker} title="Elegir Dia" />
      {show && (
      <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        )}
      <TextInput
        label='hora'
        mode='outlined'
        maxLength={21}
        characterRestriction={20}
        // onChangeText={setPasswordConfirm}
        onSubmitEditing={onSubmit}
        autoCapitalize='none'
        autoCorrect={false}
        // error={errors.password}
      />
      <TextInput
        label='tipo'
        mode='outlined'
        maxLength={21}
        characterRestriction={20}
        // onChangeText={setPasswordConfirm}
        onSubmitEditing={onSubmit}
        autoCapitalize='none'
        autoCorrect={false}
        // error={errors.password}
      />
    </View>
  );
};

export default RequestMentory;
