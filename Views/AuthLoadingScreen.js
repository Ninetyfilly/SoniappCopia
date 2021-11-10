import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen=({navigation})=>{

    const [token, setToken] = React.useState('');
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
            _signIn();
        });
        return unsubscribe;
    },[navigation]);


    _signIn=async ()=>{
        const userToken =await AsyncStorage.getItem('userToken')
        _verifyToken(userToken);
        navigation.navigate(userToken? 'HomeScreen': 'LoginScreen')
    }

    _verifyToken=(userToken)=>{
        fetch('https://api.soniapp.hackademy.lat/users/tokenrefresh/',{
                method: 'POST',
                headers:{
                    Accept:'application/json',
                        'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    token: userToken,
                }),
            }).then((response) => response.json())
            .then((responseJson) =>{
                if(!responseJson.hasOwnProperty('message')){
                    AsyncStorage.removeItem('userToken')
                }
            });
    }

    return(
        <View>
            <Text></Text>
        </View>
    );
}

export default AuthLoadingScreen;
