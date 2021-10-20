import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Views/HomeScreen'
import LoginScreen from '../Views/LoginScreen'
import ProfileScreen from '../Views/ProfileScreen'
import RegisterScreen from '../Views/RegisterScreen'
import AuthLoadingScreen from '../Views/AuthLoadingScreen'
import CalendarioScreen from '../Views/CalendarioScreen'

const Stack = createStackNavigator();


const MainStack=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthLoadingScreen" screenOptions={{headerShown: false,}}>
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
                <Stack.Screen name='RegisterScreen' component={RegisterScreen}/> 
                <Stack.Screen name='CalendarioScreen' component={CalendarioScreen}/>
                <Stack.Screen name='AuthLoadingScreen' component={AuthLoadingScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainStack;