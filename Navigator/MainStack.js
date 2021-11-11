import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Views/HomeScreen'
import LoginScreen from '../Views/LoginScreen'
import ProfileScreen from '../Views/ProfileScreen'
import RecuperarScreen from '../Views/RecuperarScreen'
import AuthLoadingScreen from '../Views/AuthLoadingScreen'
import CalendarioScreen from '../Views/CalendarioScreen'
import NotificacionScreen from '../Views/NotificacionScreen'

const MainStacks = createStackNavigator();
const LoginStacks = createStackNavigator();
const MenuStacks = createStackNavigator();

const LoginStackScreen = ({navigation}) =>{
    return(
        <LoginStacks.Navigator screenOptions={{headerShown: false,}}>
            <LoginStacks.Screen name='Login' component={LoginScreen}/>
            <LoginStacks.Screen name='RecuperarScreen' component={RecuperarScreen}/>
        </LoginStacks.Navigator>
    );
}

const MenuStackScreen = ({navigation}) =>{
    return(
        <MenuStacks.Navigator screenOptions={{headerShown: false,}}>
            <MenuStacks.Screen name='Home' component={HomeScreen}/>
            <MenuStacks.Screen name='ProfileScreen' component={ProfileScreen}/>
            <MenuStacks.Screen name='CalendarioScreen' component={CalendarioScreen}/>
            <MenuStacks.Screen name='NotificacionScreen' component={NotificacionScreen}/>
        </MenuStacks.Navigator>
    );
}

const MainStack=()=>{
    return(
        <NavigationContainer>
            <MainStacks.Navigator initialRouteName="AuthLoadingScreen" screenOptions={{headerShown: false,}}>
                <MainStacks.Screen name='LoginScreen' component={LoginStackScreen}/>
                <MainStacks.Screen name='AuthLoadingScreen' component={AuthLoadingScreen}/>
                <MainStacks.Screen name='HomeScreen' component={MenuStackScreen}/>
            </MainStacks.Navigator>
        </NavigationContainer>
    );
}
export default MainStack;