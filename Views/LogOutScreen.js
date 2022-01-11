import React, { useEffect } from 'react';
import { View, Text,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GLOBALS from '../Utils/Global';

const AuthLoadingScreen = ({ navigation }) => {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      _signIn();
    });
    return unsubscribe;
  }, [navigation]);

  _signIn = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const { data } = await axios.get(`${GLOBALS.API}users/logout/?token=${userToken}`, {
          token: userToken,
        });
        console.log(data);
      } catch (error) {
        Alert.alert('Ha ocurrio un error');
        console.log(error);
      }
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('LoginScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AuthLoadingScreen;
