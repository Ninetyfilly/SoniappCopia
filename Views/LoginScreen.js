import React, {Component} from 'react';
import {Text, View,StyleSheet,StatusBar,TextInput,TouchableOpacity,Platform, Image, KeyboardAvoidingView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageSoni from '../assets/SONIAPP.png'
import imageVer from '../assets/ojoVer.png'
import imageOcultar from '../assets/ojoOculto.png'

const LoginScreen=({navigation})=>{

    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [shown, setShown] = React.useState(false);
    const [ojo, setOjo] = React.useState(false);

    

    _Login= () =>{
        if(user == ''){
            Alert.alert('Por favor, ingresa tu usuario')
        }else if(password == ''){
            Alert.alert('Por favor, ingresa tu Contraseña')
        }
    }

    const mostrarContraseña = () =>setShown(!shown);
    const mostrarOjo = () =>setOjo(!ojo);
    const funcionesContraseña=() =>{
        mostrarContraseña();
        mostrarOjo();
    };

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined } style={{flex:1}}>
            <StatusBar barStyle='light-content'/>
            <View style={styles.view}>
                <View style={styles.soniapp}>
                    <Image source={imageSoni} style={styles.imageSonia}/>
                </View>
                <View style={styles.form}>
                    <TextInput placeholder={' Ingresa tu correo'} style={styles.textoUsuario} placeholderTextColor={'black'} autoCapitalize='none' onChangeText={setUser}/>
                </View>
                <View style={styles.textoPassword}>
                    <TextInput placeholder={'Ingresa tu Contraseña'} placeholderTextColor={'black'} 
                        style={{marginRight: 20,}} secureTextEntry={shown ? false : true} onChangeText={setPassword}/>
                    <TouchableOpacity onPress={funcionesContraseña}>
                        <Image source={ojo ? imageVer : imageOcultar} style={styles.imageOjito}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.bottonRecuperar} onPress={()=>{navigation.navigate('RegisterScreen')}}>
                    <Text style={{color: '#3446EA',}}> Olvide mi Contraseña </Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.bottonLogin} onPress={()=>{_Login()}}>
                    <Text style={styles.textoBotonLogin}>       Login </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
}
export default LoginScreen;
const styles = StyleSheet.create({
    imageSonia:{
        height: 200,
        width: 250,
    },
    imageOjito:{
        height: 30,
        width: 30,
    },
    view:{
        flex: 1,
        justifyContent: 'center',
    },
    soniapp:{
        flex:4,
        alignItems: 'center',
        justifyContent: 'center',
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
        minWidth: "50%",
        paddingVertical: 5,
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
        backgroundColor: '#ffffff', 
        marginRight: 10,
        borderWidth: 1,
  },
  bottonLogin:{
        flex: 4,
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