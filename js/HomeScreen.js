import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const HomeScreen=({navigation})=>{
  return (
        <View style={styles.view}>
        <Text>Hola Mundo asas</Text>
        <Button title={"Perfil"} onPress={()=>{
                    navigation.navigate('ProfileScreen')
                }}></Button>
        <Button title={"Cerrar Sesion"} onPress={()=>{
                    navigation.navigate('LoginScreen')
                }}></Button>
        </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
   view:{
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
   }
});