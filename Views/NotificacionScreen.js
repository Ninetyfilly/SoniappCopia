import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const ProfileScreen=({navigation})=>{

        return(
            <View style={styles.view}>
                <Text>Esta es la pantalla de Notificaciones</Text>
                <Button title={"Menú"} onPress={()=>{
                    navigation.navigate('HomeScreen')
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