import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { GoogleSocialButton } from "react-native-social-buttons";

import {AuthenticationContext} from '../../../services/Auth/Auth-Context';

export const AccountScreen = ({navigation}) => {
  const {handleLogin, isLoading} = useContext(AuthenticationContext);

  const handleClick = () => {
    handleLogin();
  };

  return (
    <View style={local.container}>
    {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <View>
          <Image
            style={local.logo}
            source={require('../../Authentication/Component/logo1.png')}
          />
          <Text style={local.text}>Welcome to DMA</Text>
          <GoogleSocialButton
          buttonViewStyle={local.googleButton}
          textStyle={local.googleButtonText}
          logoStyle={local.googleButtonLogo}
          onPress={handleClick}>
          </GoogleSocialButton>
      </View>
    )}
  </View>
  

      

  );
};

const local = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text:{
    textAlign: 'center',
    fontSize: 36,
  },
  logo: {
    width: 400,
    height: 200,
    alignSelf: 'center',
},
  googleButton:{
    width: 200,
    height: 50,
    backgroundColor: 'grey',
    alignSelf: 'center',
    }, 
  googleButtonLogo:{
    width: 30,
    height: 30,
  },
  googleButtonText:{
    color: 'white',
    fontSize: 16,
  },

  button: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
});