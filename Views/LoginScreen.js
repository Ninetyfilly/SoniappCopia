import React, {Component} from 'react';
import {Text, View,StyleSheet,StatusBar,TextInput,TouchableOpacity,Platform, Image, KeyboardAvoidingView,Alert, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageSoni from '../assets/SONIAPP.png'
import {Button} from 'react-native-paper';

const LoginScreen=({navigation})=>{

    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [shown, setShown] = React.useState(false);
    const [ojo, setOjo] = React.useState(false);

    const image = { uri: "https://startupeable.com/directorio/wp-content/uploads/listing-uploads/logo/2021/05/512-1.png" };



    _signIn =async(token) =>{
        try {
            await AsyncStorage.setItem('userToken',token);
            await AsyncStorage.setItem('user', user);
            await AsyncStorage.setItem('password',password);
            navigation.navigate('HomeScreen')            
        } catch (error) {
            Alert.alert("ERROOOOOOOOOOR en logiiin")
        }

    }

    _Login= async () =>{
        if(user == ''){
            Alert.alert('Por favor, ingresa tu usuario')
        }else if(password == ''){
            Alert.alert('Por favor, ingresa tu Contraseña')
        }else{
            await fetch('https://api.soniapp.hackademy.lat/users/loginmovil/',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: user,
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

    const mostrarContraseña = () =>setShown(!shown);
    const mostrarOjo = () =>setOjo(!ojo);
    const funcionesContraseña=() =>{
        mostrarContraseña();
        mostrarOjo();
    };

    _Recuperar=()=>{
        navigation.navigate('RecuperarScreen')
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined } style={{flex:1}}>
            <StatusBar barStyle='light-content'/>
            <View style={styles.view}>
                <View style={styles.soniapp}>
                    <ImageBackground source={image} style={styles.imageHackademy} resizeMode="cover">
                    <Image source={imageSoni} style={styles.imageSonia}/>
                    </ImageBackground>
                </View>
                <View style={styles.form}>
                    <TextInput placeholder={'Ingresa tu correo'} style={styles.textoUsuario} placeholderTextColor={'black'} autoCapitalize='none' onChangeText={setUser}/>
                </View>
                <View style={styles.textoPassword}>
                    <TextInput placeholder={'Ingresa tu Contraseña'} placeholderTextColor={'black'} 
                        style={{marginRight: 20,}} secureTextEntry={shown ? false : true} onChangeText={setPassword} autoCapitalize='none' />
                    <TouchableOpacity onPress={funcionesContraseña}>
                        <Button icon={ojo ? "eye" : "eye-off"} color="black" style={styles.ojoStyle}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.bottonRecuperar} onPress={()=>{_Recuperar()}}>
                    <Text style={{color: '#3446EA',}}> Olvide mi Contraseña </Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.bottonLogin} onPress={()=>{_Login()}}>
                    <Text style={styles.textoBotonLogin}>       Login </Text>
                </TouchableOpacity>
                <Text style={{flex : 3}}></Text>
            </View>
        </KeyboardAvoidingView>
        );
}
export default LoginScreen;
const styles = StyleSheet.create({
    imageSonia:{
        height: 200,
        width: 250,
        marginLeft: 5,
    },
    imageHackademy:{
        flex: 1,
        justifyContent: "center",
        height: 250,
        width: 250,
    },
    ojoStyle:{
        flex:1, 
        transform: [{ scale: 1.5 },{ translateX: 20 },{ translateY: -4 }],
    },
    view:{
        flex: 1,
        justifyContent: 'center',
    },
    soniapp:{
        flex:3,
        alignItems: 'center',
    },
   form:{
       flex: 2,
       marginBottom: 20,
       alignItems: 'center',
       justifyContent: 'space-around',
   },
   row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  textoBotonLogin:{
        color: '#ffffff',
        fontFamily: ('Poppins', 'sans-serif'),
        borderRadius: 10,
        alignSelf: "center",
        minWidth: "20%",
        paddingVertical: 5,
        backgroundColor: '#00b7b8', 
        height: 40,
        width: 50,
  },
  textoUsuario:{
        color: '#000000',
        fontFamily: ('Poppins', 'sans-serif'),
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: "center",
        minWidth: "55%",
        paddingVertical: 5,
        paddingHorizontal: 6,
        backgroundColor: '#ffffff', 
        marginRight: 10,
        borderWidth: 1,
  },
  textoPassword:{
        flex: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        color: '#000000',
        fontFamily: ('Poppins', 'sans-serif'),
        borderRadius: 10,
        alignSelf: "center",
        minWidth: "50%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: '#ffffff', 
        marginRight: 10,
        borderWidth: 1,
  },
  bottonLogin:{
        flex: 0,
        marginTop: 40,
        alignItems: 'center',
   },
   bottonRecuperar:{
       flex: 0,
       marginTop: 20,
       color: '#ffffff',
       fontFamily: ('Poppins', 'sans-serif'),
       alignItems: 'flex-end',
   },
});