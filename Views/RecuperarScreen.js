import React, {Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Image} from 'react-native';
import { Card, Paragraph, Avatar,Button} from 'react-native-paper';
import imageSoni from '../assets/SONIAPP.png'

const RegisterScreen =({navigation})=>{

    _Regresar=()=>{
        navigation.navigate('LoginScreen');
    }

        return(
            <View style={styles.view}>
                <TouchableOpacity style={styles.flecha} onPress={()=>{_Regresar()}}>
                    <Button icon="arrow-left" color="black">Regresar</Button>
                </TouchableOpacity>
                <View style={styles.soniapp}>
                    <Image source={imageSoni} style={styles.imageSonia}/>
                </View>
            </View>
        );
}
export default RegisterScreen;
const styles = StyleSheet.create({
   view:{
       flex: 1
   },
   flecha:{
       flex:1,
       alignItems: 'flex-start',
   },
    soniapp:{
        flex:4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSonia:{
        height: 200,
        width: 250,
    },
});