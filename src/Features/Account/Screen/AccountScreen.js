import React, {useContext, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthenticationContext} from '../../../services/Auth/Auth-Context';

export const AccountScreen = ({navigation}) => {
  const {handleLogin, isLoading} = useContext(AuthenticationContext);

  const handleClick = () => {
    handleLogin();
  };

  return (
    <View style={local.container}>
      <Button
        title={'Login With google'}
        style={local.button}
        onPress={handleClick}>
        {isLoading}
      </Button>
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
