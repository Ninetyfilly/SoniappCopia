import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);

  const getNoti = async () => {
      try {
        const noti = await AsyncStorage.getItem('notification');
        if (noti == true) {
          await AsyncStorage.removeItem('notification');
          navigation.navigate('Notificaciones');
        }
      } catch (e) {}
    };

  getNoti();

  const [user, setUser] = React.useState('');

  const _getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('name');
      setUser(name);
    } catch (e) {}
  };

  _getUser();

  const logOut = async () => {
      setLoading(true)
      navigation.navigate('LogOutScreen');
      setLoading(false)
  };

  const image = {
    uri: 'https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png',
  };

  return (
    <View style={styles.soniapp}>
      <ImageBackground
        source={image}
        style={styles.imageHackademy}
        resizeMode='cover'
      >
      </ImageBackground>
      <TouchableOpacity
          style={styles.logOut}
          onPress={() => {
            logOut();
          }}
          disabled={loading}
        >
          <Text style={styles.textLogOut}>
            {loading ? 'Cargando...' : 'Cerrar Sesion'}
          </Text>
        </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  soniapp: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageHackademy: {
    justifyContent: 'center',
    height: 250,
    width: 250,
  },
  logOut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#585490',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  textLogOut: {
    color: '#ffffff',
    fontFamily: ('Poppins', 'sans-serif'),
    fontWeight: 'bold',
    fontSize: 18,
  },
});
