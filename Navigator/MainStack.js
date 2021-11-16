import React, {useState,useEffect}from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../Views/HomeScreen'
import LoginScreen from '../Views/LoginScreen'
import ProfileScreen from '../Views/ProfileScreen'
import RecuperarScreen from '../Views/RecuperarScreen'
import AuthLoadingScreen from '../Views/AuthLoadingScreen'
import CalendarioScreen from '../Views/CalendarioScreen'
import NotificacionScreen from '../Views/NotificacionScreen'
import RegistrarContraScreen from '../Views/RegistrarContraScreen'
import VerificateScreen from '../Views/VerificateScreen'

const MainStacks = createStackNavigator();
const LoginStacks = createStackNavigator();
const MenuStacks = createMaterialBottomTabNavigator();

const LoginStackScreen = ({navigation}) =>{
    return(
        <LoginStacks.Navigator screenOptions={{headerShown: false,}} >
            <LoginStacks.Screen name='Login' component={LoginScreen}/>
            <LoginStacks.Screen name='RecuperarScreen' component={RecuperarScreen}/>
            <LoginStacks.Screen name='registrarcontra' component={RegistrarContraScreen}/>
            <LoginStacks.Screen name='VerificateScreen' component={VerificateScreen}/>
        </LoginStacks.Navigator>
    );
}




const MenuStackScreen = ({navigation}) =>{
    //para aplicar la hamburguesa checar react navigator drawer
    return(
        <MenuStacks.Navigator screenOptions={{headerShown: false,}} initialRouteName="Home" activeColor="#ffffff">
            <MenuStacks.Screen name='Home' component={HomeScreen} 
                options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                tabBarColor:"blue",
                }}/>
            <MenuStacks.Screen name='Profile' component={ProfileScreen}
                options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                tabBarColor:"#BC31EA",
                }}/>
            <MenuStacks.Screen name='Calendario' component={CalendarioScreen}options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={26} />
                ),
            tabBarColor:"black",
            }}/>
            <MenuStacks.Screen name='Notificaciones' component={NotificacionScreen}options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
            tabBarColor:"#BC31EA",
            }}/>
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