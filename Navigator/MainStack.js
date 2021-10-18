import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Views/HomeScreen'
import LoginScreen from '../Views/LoginScreen'
import ProfileScreen from '../Views/ProfileScreen'
import RegisterScreen from '../Views/RegisterScreen'
import AuthLoadingScreen from '../Views/AuthLoadingScreen'

const Stack = createStackNavigator();


const MainStack=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthLoadingScreen" screenOptions={{headerShown: false,}}>
                <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerBackVisible: false}}/>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerBackVisible: false}}/>
                <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
                <Stack.Screen name='RegisterScreen' component={RegisterScreen}/> 
                <Stack.Screen name='AuthLoadingScreen' component={AuthLoadingScreen}  options={{headerBackVisible: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainStack;