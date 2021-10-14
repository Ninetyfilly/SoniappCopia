import React from 'react';
import {Text, View, Button,StyleSheet,TextInput} from 'react-native';

const LoginScreen=({navigation})=>{

        return(
            <View style={styles.view}>
                <View style={styles.form}>
                    <TextInput placeholder={'Ingresa tu correo'}></TextInput>
                </View>
                <Button title={"Inicia sesion"} onPress={()=>{
                    navigation.navigate('HomeScreen')
                }}></Button>
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
   }
});