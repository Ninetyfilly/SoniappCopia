import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import { Card, Paragraph, Avatar, Button } from 'react-native-paper';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState("");

  const image = {
    uri: 'https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png',
  };

  const _getData = async () => {
    try {
      const code = await AsyncStorage.getItem('code');
      setCode(code)
    } catch (e) {

    }
  };

  _getData();

  const verifyCode = async () => {
    setLoading(true)
    if (phoneNum == '') {
      setLoading(false)
      Alert.alert('Por favor, ingresa tu codigo');
    } else if (phoneNum == code) {
      setLoading(false)
      navigation.navigate("registrarcontra");
    }
  };

  const formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  return (
    <View style={styles.view}>
      <View style={styles.soniapp}>
        <ImageBackground
          source={image}
          style={styles.imageHackademy}
          resizeMode='cover'
        >
        </ImageBackground>
      </View>
      <View style={styles.formCode}>
        <OutlinedTextField
          label='Ingresa el codigo'
          maxLength={6}
          characterRestriction={6}
          onChangeText={setPhoneNum}
          keyboardType='phone-pad'
          formatText={formatText}
        />
      </View>
      <TouchableOpacity
        style={styles.form2}
        onPress={() => {
          verifyCode();
        }}
      >
        <Text style={styles.textoBotonRecuperar}> {loading?"Cargando...":"Validar"} </Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  soniapp: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  imageHackademy: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  form2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4d043',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  formCode: {
    marginBottom: 10,
    width: 250,
    transform: [{ translateX: 85 }],
  },
  textoBotonRecuperar: {
    color: '#ffffff',
    fontFamily: ('Poppins', 'sans-serif'),
    fontWeight: 'bold',
    fontSize: 18,
  },
});
