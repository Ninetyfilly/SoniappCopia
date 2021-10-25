import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const ProfileScreen=({navigation})=>{

        return(
            <View style={styles.view}>
                <Text>Esta es la pantalla de perfil</Text>
                <Button title={"Menú"} onPress={()=>{
                    navigation.navigate('HomeScreen')
                }}></Button>
                <Button title={"Cerrar sesion"} onPress={()=>{
                    navigation.navigate('LoginScreen')
                }}></Button>
            </View>
        );
};
export default ProfileScreen;
const styles = StyleSheet.create({
   view:{
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
   }
});