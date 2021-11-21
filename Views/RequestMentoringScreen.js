import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
const moment = require('moment');

const RequestMentory = ({ navigation }) => {
  const _format = 'YYYY-MM-DD';
  const _today = moment().format(_format);
  const _maxDate = moment().add(30, 'days').format(_format);

  const [day, setDay] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const onSubmit = async () => {};

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
      <Button title='Open' onPress={() => setShowDatePicker(true)} />
      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        mode='date'
        onConfirm={(date) => {
          setDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
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
