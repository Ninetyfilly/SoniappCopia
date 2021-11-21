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

const RegisterScreen = ({ navigation }) => {
  const [correo, setCorreo] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const image = {
    uri: 'https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png',
  };

 const verificate = async ({token, uid, code}) => {
    try {
      await AsyncStorage.setItem('resetToken', token);
      await AsyncStorage.setItem('uid', uid);
      await AsyncStorage.setItem('code', code);
      navigation.navigate('verificateScreen');
    } catch (error) {
      Alert.alert('ERROOOOOOOOOOR en verificar');
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
          'https://api.soniapp.hackademy.lat/users/request-reset-email/',
          {
            email: correo,
          }
        );
        console.log(data);
        setLoading(false)
        verificate(data);
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
    backgroundColor: '#00b7b8',
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
