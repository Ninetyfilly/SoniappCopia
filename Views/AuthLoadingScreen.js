import React,{useCallback, useEffect} from 'react';
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
        if(userToken != null){
            _refreshToken(userToken);
        }
        navigation.navigate(userToken? 'HomeScreen': 'LoginScreen')
    }

    _verifyToken=(userToken)=>{
        fetch('http://192.168.1.5:4000/api/token-verify',{
                method: 'POST',
                headers:{
                    Accept:'application/json',
                        'Content-Type':'application/json'
                },
                Body: JSON.stringify({
                    token: userToken,
                }),
            }).then((response) => response.json())
            .then((responseJson) =>{
                if(!responseJson.hasOwnProperty('token')){
                    AsyncStorage.removeItem('userToken')
                }
            });
    }

    _refreshToken=(userToken)=>{
        fetch('http://192.168.1.5:4000/api/token-verify',{
                method: 'POST',
                headers:{
                    Accept:'application/json',
                        'Content-Type':'application/json'
                },
                Body: JSON.stringify({
                    token: userToken,
                }),
            }).then((response) => response.json())
            .then((responseJson) =>{
                if(responseJson.hasOwnProperty('token')){
                    _replaceTokenStorage(responseJson.token);
                    Alert.alert((responseJson.token));
                }else{
                    AsyncStorage.removeItem(userToken);
                }
            });
    }
        
    _replaceTokenStorage=async (userToken)=>{
        await AsyncStorage.removeItem(userToken);
        await AsyncStorage.setItem('userToken',userToken);
    }

    return(
        <View>
            <Text></Text>
        </View>
    );
}

export default AuthLoadingScreen;
