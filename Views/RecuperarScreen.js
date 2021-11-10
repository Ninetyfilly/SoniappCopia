import React, {Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Image,TextInput,ImageBackground,Alert} from 'react-native';
import { Card, Paragraph, Avatar,Button} from 'react-native-paper';
import imageSoni from '../assets/SONIAPP.png'

const RegisterScreen =({navigation})=>{

    const [correo,setCorreo]=React.useState('');
    const image = { uri: "https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png" };

    enviarCorreo =async()=>{
        if(correo == ''){
            Alert.alert('Por favor, ingresa tu correo')
        }else{
        await fetch('https://api.soniapp.hackademy.lat//users/request-reset-email/',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body:  JSON.stringify({
                    email: correo,
                }),
            }).then((response) => response.json())
            .then((res) => {
            if(res.hasOwnProperty('hecho')){
                Alert.alert('El enlace de recuperacion ha sido enviado a su correo');
                navigation.navigate('LoginScreen');
                }
            })
        }
    }

    _Regresar=()=>{
        navigation.navigate('LoginScreen');
    }


        return(
            <View style={styles.view}>
                <TouchableOpacity style={styles.flecha} onPress={()=>{_Regresar()}}>
                    <Button icon="arrow-left" color="black">Regresar</Button>
                </TouchableOpacity>
                <View style={styles.soniapp}>
                    <ImageBackground source={image} style={styles.imageHackademy} resizeMode="cover">
                    <Image source={imageSoni} style={styles.imageSonia}/>
                    </ImageBackground>
                </View>
                <View style={styles.form1}>
                    <TextInput placeholder={'Ingresa tu correo'} style={styles.cuadroTexto} placeholderTextColor={'black'} autoCapitalize='none' onChangeText={setCorreo}/>
                </View>
                <TouchableOpacity style={styles.form2} onPress={()=>{enviarCorreo()}}>
                    <Text style={styles.textoBotonRecuperar}> Recuperar Contraseña </Text>
                </TouchableOpacity>
            </View>
        );
}
export default RegisterScreen;
const styles = StyleSheet.create({
   view:{
       flex: 1
   },
   flecha:{
       flex:0,
       alignItems: 'flex-start',
       justifyContent: 'center',
       transform: [{ scale: 1.5 },{ translateX: 55 }]
   },
    soniapp:{
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    imageSonia:{
        height: 200,
        width: 250,
        marginLeft: 5,
    },
    imageHackademy:{
        flex: 0,
        justifyContent: "center",
        height: 250,
        width: 250,
    },
    form1:{
       flex: 1,
       marginBottom: 20,
       alignItems: 'flex-start',
       justifyContent: 'flex-end',
       marginBottom: 50,
   },
   form2:{
       flex: 2,
       marginBottom: 20,
       alignItems: 'flex-start',
       justifyContent: 'flex-start',
   },
    cuadroTexto:{
        flex:0,
        color: '#000000',
        fontFamily: ('Poppins', 'sans-serif'),
        borderRadius: 10,
        alignSelf: "center",
        minWidth: "50%",
        paddingVertical: 5,
        paddingHorizontal: 6,
        backgroundColor: '#ffffff', 
        marginRight: 10,
        borderWidth: 1,
    },
    textoBotonRecuperar:{
        color: '#ffffff',
        fontFamily: ('Poppins', 'sans-serif'),
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "flex-start",
        minWidth: "55%",
        paddingVertical: 7,
        backgroundColor: '#00b7b8', 
        height: 35,

  },
});