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
        navigation.navigate(userToken? 'HomeScreen': 'LoginScreen')
    }

    return(
        <View>
            <Text></Text>
        </View>
    );
}

export default AuthLoadingScreen;
