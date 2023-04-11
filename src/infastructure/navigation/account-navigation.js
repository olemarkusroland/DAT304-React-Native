import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../../Features/Account/Screen/LoginScreen';
import {AccountScreen} from '../../Features/Account/Screen/AccountScreen';
import {RegisterScreen} from '../../Features/Account/Screen/RegisterScreen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
      name="Diabetes Managment App"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
      name="Register"
      component={RegisterScreen}
    />
  </Stack.Navigator>
);
