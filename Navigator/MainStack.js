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
import RegistrarContraScreen from '../Views/RegistrarContraScreen'

const MainStacks = createStackNavigator();
const LoginStacks = createStackNavigator();
const MenuStacks = createMaterialBottomTabNavigator();

const LoginStackScreen = ({navigation}) =>{
    return(
        <LoginStacks.Navigator screenOptions={{headerShown: false,}} >
            <LoginStacks.Screen name='Login' component={LoginScreen}/>
            <LoginStacks.Screen name='RecuperarScreen' component={RecuperarScreen}/>
        </LoginStacks.Navigator>
    );
}

const MenuStackScreen = ({navigation}) =>{
    return(
        <MenuStacks.Navigator screenOptions={{headerShown: false,}} initialRouteName="Home" activeColor="#e91e63">
            <MenuStacks.Screen name='Home' component={HomeScreen} 
                options={{
                tabBarLabel: 'Home',tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}/>
            <MenuStacks.Screen name='Profile' component={ProfileScreen}
                options={{
                tabBarLabel: 'Profile',tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}/>
            <MenuStacks.Screen name='Calendario' component={CalendarioScreen}options={{
            tabBarLabel: 'Calendar',tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={26} />
                ),
            }}/>
            <MenuStacks.Screen name='Notificaciones' component={NotificacionScreen}options={{
            tabBarLabel: 'Notification',tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
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
                <MainStacks.Screen name='RegistrarContraScreen' component={RegistrarContraScreen}/>
            </MainStacks.Navigator>
        </NavigationContainer>
    );
}
export default MainStack;