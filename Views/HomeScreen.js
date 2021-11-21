import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageSoni from '../assets/SONIAPP.png';

const HomeScreen = ({ navigation }) => {


  const [user, setUser] = React.useState('');

  const _getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('name');
      setUser(name);
    } catch (e) {}
  };

  _getUser();

  const _deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('LoginScreen');
    } catch (e) {}
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
        <Image source={imageSoni} style={styles.imageSonia} />
      </ImageBackground>
      <Button
        title={'Cerrar Sesion'}
        style={styles.logOut}
        onPress={() => {
          _deleteToken();
        }}
      ></Button>
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
  imageSonia: {
    height: 200,
    width: 250,
    marginLeft: 5,
  },
  imageHackademy: {
    flex: 1,
    justifyContent: 'center',
    height: 250,
    width: 250,
  },
  logOut: {
    flex: 1,
    justifyContent: 'center',
    height: 250,
    width: 250,
  },
});
