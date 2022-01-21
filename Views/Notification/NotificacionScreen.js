import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MentorScreen from './NotificacionMentor';
import PadawanScreen from './NotificacionPadawan';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = React.useState('');

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('rol');
      setUser(user);
    } catch (e) {}
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      LoadScreen();
      setUser('');
    });
    return unsubscribe;
  }, [navigation,user]);

  React.useEffect(() => {
    getUser();
  });

  const LoadScreen = () =>{
    if (user == 'mentor') {
    return <MentorScreen />;
  } else {
    return <PadawanScreen />;
  }
  }

  return LoadScreen();
};
