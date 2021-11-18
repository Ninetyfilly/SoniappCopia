import React, {Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Image,TextInput,ImageBackground,Alert,Button} from 'react-native';
import { Card, Paragraph, Avatar} from 'react-native-paper';
import imageSoni from '../assets/SONIAPP.png'
import {validatePassword} from '../Utils/Helpers';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';


const RegisterScreen =({navigation})=>{

    //hokks
    const [password,setPassword]=React.useState('');
    const [passwordConfirm,setPasswordConfirm]=React.useState('');
    
    const [token,setToken]=React.useState('');
    const [uid,setUid]=React.useState('');

    const [mostrarTop, setMostrarTop] = React.useState(false);
    const [shownTop, setShownTop] = React.useState(false);

    const [mostrarBot, setMostrarBot] = React.useState(false);
    const [shownBot, setShownBot] = React.useState(false);
    
    const [errors, setErros] = React.useState({});

    const image = { uri: "https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png" };
    const mostrarContraseñaTop = () =>setShownTop(!shownTop);
    const mostrarPasswordTop = () =>setMostrarTop(!mostrarTop);

    const funcionesContraseñaTop=() =>{
            mostrarContraseñaTop();
            mostrarPasswordTop();
        };

    const mostrarContraseñaBot = () =>setShownBot(!shownBot);
    const mostrarPasswordBot = () =>setMostrarBot(!mostrarBot);

    const funcionesContraseñaBot=() =>{
            mostrarContraseñaBot();
            mostrarPasswordBot();
        };

    const onSubmit= async() => {
        if(validatePassword(password) == 1){
            Alert.alert("La contraseña no debe de estar vacia")
        }else if(validatePassword(password) == 2){
            Alert.alert("La contraseña debe de contener al menos un caracter especial")
        }else if(validatePassword(passwordConfirm) == 1){
            Alert.alert("La contraseña debe de contener al menos un caracter especial,un numero y una mayuscula")
        }else if(validatePassword(passwordConfirm) == 2){
            Alert.alert("La contraseña debe de contener al menos un caracter especial,un numero y una mayuscula")
        }else{
            await fetch('https://api.soniapp.hackademy.lat/users/loginmovil/',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    uid: uid,
                    password: password,
                }),
            }).then((response) => response.json())
            .then((responseJson) =>{
                if(responseJson.hasOwnProperty('token')){
                    _signIn(responseJson.token);
                }else if(responseJson.hasOwnProperty('error')){
                    Alert.alert('Error', 'usuario o contraseña incorrectos');
                }
            });
        }

    }

    const _getUrl=async ()=>{
    try{
        const token=await AsyncStorage.getItem('tokenR');
        const uid=await AsyncStorage.getItem('uid');
        setUid(uid);
        setToken(token);
    } catch(e){ }
    }
    _getUrl();

    const url = Linking.useURL();

    console.log(url)
    return(
        <View style={styles.view}>
            <View style={styles.soniapp}>
                <ImageBackground source={image} style={styles.imageHackademy} resizeMode="cover">
                <Image source={imageSoni} style={styles.imageSonia}/>
                </ImageBackground>
            </View>
            <TouchableOpacity style={styles.formPasswordTop} onPress={()=>{funcionesContraseñaTop()}}>
                    <Text style={styles.textButtonHide}> {mostrarTop ? "OCULTAR" : "MOSTRAR"} </Text>
                </TouchableOpacity>
            <View style={styles.formContra}> 
                <OutlinedTextField
                label='Ingresa tu contraseña'
                maxLength={21}
                characterRestriction={20}
                secureTextEntry={shownTop ? false : true}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                />
            </View>
            <TouchableOpacity style={styles.formPasswordBot} onPress={()=>{funcionesContraseñaBot()}}>
                    <Text style={styles.textButtonHide}> {mostrarBot ? "OCULTAR" : "MOSTRAR"} </Text>
                </TouchableOpacity>
            <View style={styles.formContraConfirm}>
                <OutlinedTextField
                label='Confirma tu contraseña'
                maxLength={21}
                characterRestriction={20}
                secureTextEntry={shownBot ? false : true}
                onChangeText={setPasswordConfirm}
                onSubmitEditing={onSubmit}
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.password}
                />
            </View>
            <TouchableOpacity style={styles.form2} onPress={()=>{onSubmit()}}>
                <Text style={styles.textoBotonRecuperar}> Registrar Contraseña </Text>
            </TouchableOpacity>
            <Text style={{flex : 2}}></Text>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
   view:{
       flex: 1,
       backgroundColor: "white",
   },
   flecha:{
       flex:0,
       alignItems: 'flex-start',
       justifyContent: 'center',
       transform: [{ scale: 1.5 },{ translateX: 55 }]
   },
    soniapp:{
        flex:5,
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
    formContra:{
       flex: 1,
       marginBottom: 20,
       marginBottom: 50,
        width: 250,
        transform: [{ translateX: 85 }], 
   },
   formContraConfirm:{
        flex: 1,
        marginBottom: 50,
        width: 250,
        transform: [{ translateX: 85 }],  
   },
   form2:{
       flex: 0,
       marginBottom: 20,
       alignItems: 'flex-start',
       justifyContent: 'flex-start',
   },
   formPasswordTop:{
       flex: 0,
       marginRight:73,
   },
   formPasswordBot:{
       flex: 0,
       marginRight:73,
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
    textButtonHide:{
        flex:0,
        color: '#000000',
        fontFamily: ('Poppins', 'sans-serif'),
        alignSelf: "flex-end",
        marginTop: 10,
        justifyContent: 'flex-end',
    },
});