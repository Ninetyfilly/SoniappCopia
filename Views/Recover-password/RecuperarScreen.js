import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBALS from '../../Utils/Global';

const RegisterScreen = ({ navigation }) => {
  const [correo, setCorreo] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const image = {
    uri: 'https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png',
  };

 const verificate = async (token, uidb64, code) => {
    try {
      console.log(token)
      await AsyncStorage.setItem('resetToken', token);
      await AsyncStorage.setItem('uidb64', uidb64);
      await AsyncStorage.setItem('code', `${code}`);
      navigation.navigate('VerificateScreen');
    } catch (error) {
      Alert.alert('ERROOOOOOOOOOR en verificar');
      console.log(error)
    }
  };

  const enviarCorreo = async () => {
    setLoading(true)
    if (correo == '') {
      setLoading(false)
      Alert.alert('Por favor, ingresa tu correo');
    } else {
      try {
        const { data } = await axios.post(
          `${GLOBALS.API}password-reset/`,
          {
            email: correo
          }
        );
        console.log(data.hecho.code);
        setLoading(false)
        verificate(data.hecho.token,data.hecho.uidb64,data.hecho.code);
      } catch (error) {
        setLoading(false)
        Alert.alert("Ha ocurrio un error")
      }
    }
  };

  _Regresar = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.flecha}
        onPress={() => {
          _Regresar();
        }}
      >
        <Button icon='arrow-left' color='black'>
          Regresar
        </Button>
      </TouchableOpacity>
      <View style={styles.soniapp}>
        <ImageBackground
          source={image}
          style={styles.imageHackademy}
          resizeMode='cover'
        >
        </ImageBackground>
      </View>
      <View style={styles.formText}>
        <TextInput
          mode='outlined'
          label="ingresa tu Correo"
          placeholder={'example@example.com'}
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={setCorreo}
        />
      </View>
      <TouchableOpacity
        style={styles.form2}
        onPress={() => {
          enviarCorreo();
        }}
      >
        <Text style={styles.textoBotonRecuperar}> {loading?"Cargando...":"Recuperar Contraseña"} </Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  flecha: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    transform: [{ scale: 1.5 }, { translateX: 55 }],
  },
  imageHackademy: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  formText: {
    display: 'flex',
    marginBottom: 50,
    width: '100%',
  },
  form2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4d043',
    paddingVertical: 10,
    borderRadius: 10,
  },
  textoBotonRecuperar: {
    color: '#ffffff',
    fontFamily: ('Poppins', 'sans-serif'),
    fontWeight: 'bold',
    fontSize: 18,
  },
});
