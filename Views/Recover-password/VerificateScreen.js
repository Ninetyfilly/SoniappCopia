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
import imageSoni from '../../assets/SONIAPP.png';
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
          <Image source={imageSoni} style={styles.imageSonia} />
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  imageSonia: {
    height: 200,
    width: 250,
    marginLeft: 5,
  },
  imageHackademy: {
    flex: 0,
    justifyContent: 'center',
    height: 250,
    width: 250,
  },
  form2: {
    flex: 2,
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  formCode: {
    flex: 1,
    marginBottom: 10,
    width: 250,
    transform: [{ translateX: 85 }],
  },
  textoBotonRecuperar: {
    color: '#ffffff',
    fontFamily: ('Poppins', 'sans-serif'),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'flex-start',
    minWidth: '20%',
    paddingVertical: 7,
    backgroundColor: '#00b7b8',
    height: 35,
  },
});
