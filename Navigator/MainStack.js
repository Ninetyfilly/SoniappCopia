import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../Views/Home/HomeScreen';
import LoginScreen from '../Views/Login/LoginScreen';
import ProfileScreen from '../Views/Profile/ProfileScreen';
import RecuperarScreen from '../Views/Recover-password/RecuperarScreen';
import AuthLoadingScreen from '../Views/Login/AuthLoadingScreen';
import LogOutScreen from '../Views/Home/LogOutScreen';

import CalendarioScreen from '../Views/Calendar/CalendarioScreen';
import NotificacionScreen from '../Views/Notification/NotificacionScreen';
import RegistrarContraScreen from '../Views/Recover-password/RegistrarContraScreen';
import VerificateScreen from '../Views/Recover-password/VerificateScreen';
import RequestMentoringScreen from '../Views/RequestMentoring/RequestMentoringScreen';
import EditRequestMentoringScreen from '../Views/RequestMentoring/EditRequestMentoringScreen';
import EventListScreen from '../Views/EventList/EventListScreen';


const MainStacks = createStackNavigator();
const LoginStacks = createStackNavigator();
const MenuStacks = createMaterialBottomTabNavigator();
const HamburguerStack = createDrawerNavigator();

const MainStack = () => {
  const LoginStackScreens = ({ navigation }) => {
  return (
    <LoginStacks.Navigator screenOptions={{ headerShown: false }}>
      <LoginStacks.Screen name='Login' component={LoginScreen} />
      <LoginStacks.Screen name='RecuperarScreen' component={RecuperarScreen} />
      <LoginStacks.Screen
        name='registrarcontra'
        component={RegistrarContraScreen}
      />
      <LoginStacks.Screen
        name='VerificateScreen'
        component={VerificateScreen}
      />
    </LoginStacks.Navigator>
  );
};

  const HamburguerStackScreens = ({ navigation }) => {
  return (
    <HamburguerStack.Navigator initialRouteName='Home'>
      <HamburguerStack.Screen name='Home' component={HomeScreen} />
      <HamburguerStack.Screen
        name='Solicitar Mentoria'
        component={RequestMentoringScreen}
      />
      <HamburguerStack.Screen
        name='Editar Mentoria Solicitada'
        component={EditRequestMentoringScreen}
      />
      <HamburguerStack.Screen name='Ver Listado de Eventos' component={EventListScreen} />
    </HamburguerStack.Navigator>
  );
};

  const MenuStackScreens = ({ navigation }) => {
  //para aplicar la hamburguesa checar react navigator drawer
  return (
    <MenuStacks.Navigator initialRouteName='Home' activeColor='#ffffff'>
      <MenuStacks.Screen
        name='Inicio'
        component={HamburguerStackScreens}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
          tabBarColor: '#c4d043',
        }}
      />

      <MenuStacks.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
          tabBarColor: '#585490',
        }}
      />
      <MenuStacks.Screen
        name='Calendario'
        component={CalendarioScreen}
        options={{
          tabBarLabel: 'Calendario',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='calendar' color={color} size={26} />
          ),
          tabBarColor: '#c4d043',
        }}
      />
      <MenuStacks.Screen
        name='Notificaciones'
        component={NotificacionScreen}
        options={{
          tabBarLabel: 'Notificaicones',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bell' color={color} size={26} />
          ),
          tabBarColor: '#585490',
        }}
      />
    </MenuStacks.Navigator>
  );
};
  const getToken = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      return;
    }
    const phoneToken = (await Notifications.getExpoPushTokenAsync()).data;
    if(phoneToken !== undefined){
      AsyncStorage.setItem('phoneToken',phoneToken);
      console.log(phoneToken);
    }
    return phoneToken;
  };

  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const notification = response.notification.request.content.data.notification;
      // url?Linking.openURL(url):console.log("sin url");
      console.log(notification)
      if(notification)AsyncStorage.setItem('notification',notification);
    });
    return () => subscription.remove();
  }, []);

  React.useEffect(() => {
    getToken();
  }, []);

  const config = {
    screens:{
      Notificaciones:"notification",
      Home: "home",
      Profile: "profile",
      LoginScreen: "login",
    }
  }

  const prefix = Linking.createURL('soniapp://soniapp')

  return (
    <NavigationContainer
      linking={{
        prefixes:[prefix],
        config
      }}
    >
      <MainStacks.Navigator
        initialRouteName='AuthLoadingScreen'
        screenOptions={{ headerShown: false }}
      >
        <MainStacks.Screen name='LoginScreen' component={LoginStackScreens} />
        <MainStacks.Screen
          name='AuthLoadingScreen'
          component={AuthLoadingScreen}
        />
        <MainStacks.Screen
          name='LogOutScreen'
          component={LogOutScreen}
        />
        <MainStacks.Screen name='HomeScreen' component={MenuStackScreens} />
      </MainStacks.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
