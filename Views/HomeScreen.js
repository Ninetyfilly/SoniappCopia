import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen=({navigation})=>{

  const [user, setUser] = React.useState('');

  _getUser=async ()=>{
    try{
        const user=await AsyncStorage.getItem('user');
        setUser(user);
        } catch(e){ }
  }
  _getUser();

  _deleteToken=async()=>{
    try{
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('AuthLoadingScreen'); 
      } catch(e){}
  }

  _calendario=()=>{
    navigation.navigate('CalendarioScreen');
  }

  return (
        <View style={styles.view}>
        <Text>Hola {user} bienvenido </Text>
        <Button title={"Perfil"} onPress={()=>{navigation.navigate('ProfileScreen')}}></Button>
        <Button title={"Cerrar Sesion"} onPress={()=>{_deleteToken()}}></Button>
        <Button title={"Calendario"} onPress={()=>{_calendario()}}></Button>
        </View>
  );
  console.log(user);
};
export default HomeScreen;

const styles = StyleSheet.create({
   view:{
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
   }
   
});