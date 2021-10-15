import React, {Component} from 'react';
import {Text, View, Button,StyleSheet,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen=({navigation})=>{

    const [user, setUser] = React.useState('');

    _Login=async () =>{
        try{
            await AsyncStorage.setItem('user', user);
            navigation.navigate('HomeScreen');
        } catch(e){ }
        
    }

    return(
        <View style={styles.view}>
            <View style={styles.form}>
                <TextInput placeholder={'Ingresa tu correo'} onChangeText={setUser}></TextInput>
                <TextInput placeholder={'Ingresa tu Contraseña'}></TextInput>
            </View>
            <Button title={"Inicia sesion"} onPress={()=>{_Login()}}></Button>
            <Button title={"Recuperar contraseña"} onPress={()=>{
                navigation.navigate('RegisterScreen')
            }}></Button>
            </View>
        );
}
export default LoginScreen;
const styles = StyleSheet.create({
   view:{
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
   },
   form:{
       marginTop: 4,
   },
   botton:{
       marginTop: 10,
       backgroundColor: '#00b7b8',
       color: '#ffffff',
       fontFamily: ('Poppins', 'sans-serif'),
   }
});