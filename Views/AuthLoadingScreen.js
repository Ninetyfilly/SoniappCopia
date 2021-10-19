import React,{useCallback, useEffect} from 'react';
import {View,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen=({navigation})=>{

    const [user, setUser] = React.useState('');

    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
            _isLoggedIn();
        });
        return unsubscribe;
    },[navigation]);

    const _isLoggedIn= async()=>{
        const users = await AsyncStorage.getItem('user');
        console.log(users);
        navigation.navigate( users ? 'HomeScreen' :'LoginScreen');
        console.log("no jala");
    }

    return(
        <View>
            <Text></Text>
        </View>
    );
}

export default AuthLoadingScreen;
