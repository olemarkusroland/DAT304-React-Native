import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FoodsNavigator} from './Food-nav';
import {SettingsNavigator} from './settings-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import connectivity from '../connectivity';

import {HomeNavigator} from './home-navigation';
import {InformationNavigator} from './information-nav';

export const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export const Icons = ({iconName, size, color}) => (
  <Ionicons name={iconName} size={size} color={color} />
);
export const TABICON = {
  Foods: 'md-basket-outline', // Update this line
  Settings: 'md-settings-outline', // Update this line
  Home: 'md-home-outline', // Update this line
  Info: 'md-information-circle-outline', // Update this line
};

export const createScreenOptions = ({route}) => {
  const iconName = TABICON[route.name];
  return {
    tabBarIcon: ({size, color}) => {
      return <Icons iconName={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'grey',
    tabBarStyle: [
      {
        display: 'flex',
        bottom: 0,
      },
      null,
    ],
  };
};

export const AppNavigator = () => (
    <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
            name="Home"
            component={connectivity(HomeNavigator)}
            options={{ title: 'Home' }}
        />
        <Tab.Screen name="Foods" component={connectivity(FoodsNavigator)} />
        <Tab.Screen name="Info" component={connectivity(InformationNavigator)} />
        <Tab.Screen name="Settings" component={connectivity(SettingsNavigator)} />
    </Tab.Navigator>
);


