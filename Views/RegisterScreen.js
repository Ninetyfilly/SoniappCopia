import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const RegisterScreen =({navigation})=>{
        return(
            <View style={styles.view}>
                <Text>Esto es un texto sencillo del registro</Text>
                <Button title={"Regresar"} onPress={()=>{
                    navigation.navigate('LoginScreen')
                }}></Button>
            </View>
        );
}
export default RegisterScreen;
const styles = StyleSheet.create({
   view:{
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
   } 
});