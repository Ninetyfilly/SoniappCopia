import React, {Component} from 'react';
import {Text, View, Button,StyleSheet,TextInput,TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageSoni from '../assets/SONIAPP.png'
import imageVer from '../assets/ojoVer.png'
import imageOcultar from '../assets/ojoOculto.png'

const LoginScreen=({navigation})=>{

    const [user, setUser] = React.useState('');
    const [shown, setShown] = React.useState(false);
    const [ojo, setOjo] = React.useState(false);

    _Login=async () =>{
        try{
            await AsyncStorage.setItem('user', user);
            navigation.navigate('HomeScreen');
        } catch(e){ }
        
    }

    const mostrarContraseña = () =>setShown(!shown);
    const mostrarOjo = () =>setOjo(!ojo);
    const funcionesContraseña=() =>{
        mostrarContraseña();
        mostrarOjo();
    };

    return(
        
        <View style={styles.view}>
            <View style={styles.soniapp}>
                <Image source={imageSoni} style={styles.imageSonia}/>
            </View>
            <View style={styles.form}>
                <TextInput placeholder={'Ingresa tu correo'} onChangeText={setUser}/>
            </View>
            <View style={styles.row}>
                <TextInput placeholder={'Ingresa tu Contraseña'} style={{marginRight: 10}} secureTextEntry={shown ? false : true} />
                <TouchableOpacity onPress={funcionesContraseña}>
                    <Image source={ojo ? imageVer : imageOcultar} style={styles.imageOjito}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bottonRecuperar} onPress={()=>{navigation.navigate('RegisterScreen')}}>
                <Text> Olvide mi Contraseña </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.bottonLogin} onPress={()=>{_Login()}}>
                <Text style={styles.textoLogin}>       Login </Text>
            </TouchableOpacity>
        </View>
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
       justifyContent: 'flex-end',
   },
   row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  textoLogin:{
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