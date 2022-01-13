import React, { Component, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageSoni from '../../assets/SONIAPP.png';
import { Button } from 'react-native-paper';
import axios from 'axios';
import GLOBALS from '../../Utils/Global';

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [shown, setShown] = React.useState(false);
  const [ojo, setOjo] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [phoneToken, setPhoneToken] = React.useState('');


  const image = {
    uri: 'https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png',
  };

  _signIn = async ({token, name, rol}) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('rol', rol);
      setUser('')
      setPassword('')
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('ERROOOOOOOOOOR en logiiin');
    }
  };

  _Login = async () => {
    const tokenP = await AsyncStorage.getItem('phoneToken');
    // setPhoneToken(tokenP);
    setLoading(true);
    if (user == '') {
      setLoading(false);
      Alert.alert('Por favor, ingresa tu usuario');
    } else if (password == '') {
      setLoading(false);
      Alert.alert('Por favor, ingresa tu Contraseña');
    } else {
      try {
        const { data } = await axios.post(
          `${GLOBALS.API}users/login/`,
          {
            "email": user,
            password,
            "token-expo": tokenP, 
          }
        );
        console.log(data);
        setLoading(false)
        _signIn(data);
      } catch (error) {
          setLoading(false)
          Alert.alert("Ha ocurrio un error")
          console.log(error)
      }
    }
  };

  const mostrarContraseña = () => setShown(!shown);
  const mostrarOjo = () => setOjo(!ojo);
  const funcionesContraseña = () => {
    mostrarContraseña();
    mostrarOjo();
  };

  _Recuperar = () => {
    navigation.navigate('RecuperarScreen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <StatusBar barStyle='light-content' />
      <View style={styles.view}>
        <ImageBackground
          source={image}
          style={styles.imageHackademy}
          resizeMode='cover'
        ></ImageBackground>
        <View style={styles.form}>
          <TextInput
            placeholder={'Ingresa tu correo'}
            style={styles.textoUsuario}
            placeholderTextColor={'black'}
            autoCapitalize='none'
            onChangeText={setUser}
          />
          <View style={styles.textoPassword}>
            <TextInput
              placeholder={'Ingresa tu Contraseña'}
              placeholderTextColor={'black'}
              style={{ marginRight: 20 }}
              secureTextEntry={shown ? false : true}
              onChangeText={setPassword}
              autoCapitalize='none'
            />
            <TouchableOpacity onPress={funcionesContraseña}>
              <Button
                icon={ojo ? 'eye' : 'eye-off'}
                color='black'
                style={styles.ojoStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.bottonRecuperar}
          onPress={() => {
            _Recuperar();
          }}
        >
          <Text style={{ color: '#39579e' }}> Olvide mi Contraseña </Text>
        </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  imageHackademy: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  ojoStyle: {
    flex: 1,
    transform: [{ scale: 1.5 }, { translateX: 20 }, { translateY: -4 }],
  },
  view: {
    flex: 1,
    padding: 10,
  },
  form: {
    paddingVertical: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  textoBotonLogin: {
    color: '#ffffff',
    fontFamily: ('Poppins', 'sans-serif'),
    fontWeight: 'bold',
    fontSize: 18,
  },
  textoUsuario: {
    color: '#000000',
    fontFamily: ('Poppins', 'sans-serif'),
    borderRadius: 10,
    minWidth: '55%',
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 5,
  },
  textoPassword: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: '#000000',
    fontFamily: ('Poppins', 'sans-serif'),
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#ffffff',
    borderWidth: 1,
  },
  bottonLogin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4d043',
    paddingVertical: 10,
    borderRadius: 10,
  },
  bottonRecuperar: {
    marginVertical: 10,
    fontFamily: ('Poppins', 'sans-serif'),
    alignItems: 'flex-end',
  },
});
