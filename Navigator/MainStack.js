import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from '../Views/HomeScreen'
import LoginScreen from '../Views/LoginScreen'
import ProfileScreen from '../Views/ProfileScreen'
import RegisterScreen from '../Views/RegisterScreen'

const Stack = createNativeStackNavigator();


const MainStack=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerBackVisible: false}}/>
                <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
                <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainStack;