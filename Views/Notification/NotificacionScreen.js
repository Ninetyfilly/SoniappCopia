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
      console.log("Se cargo la pantalla de: ",user)
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

export default ProfileScreen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  state: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
});
