import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

const ProfileScreen = ({ navigation }) => {
    const Url_Home = "soniapp://soniapp/login";
    const Url_Profile = "soniapp://soniapp/profile";
    const Url_Notificaciones = "soniapp://soniapp/notification";
  return (
    <View style={styles.view}>
      <Text>Esta es la pantalla de perfil</Text>
      <Button
        title={'Home'}
        onPress={() => {
          Linking.openURL(Url_Home);
        }}
      ></Button>
      <Button
        title={'Cerrar sesion'}
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
      ></Button>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
