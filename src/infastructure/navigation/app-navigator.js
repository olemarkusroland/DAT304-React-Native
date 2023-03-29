import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FoodsNavigator} from './Food-nav';
import {FoodContextProvider} from '../../services/Foods/Food-Context';
import {SettingsNavigator} from './settings-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Foods from '../../../assets/Foods.png';
import settings from '../../../assets/settings.png';

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
};

export const createScreenOptions = ({route}) => {
  const iconName = TABICON[route.name];
  return {
    tabBarIcon: ({size, color}) => {
      return <Icons iconName={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
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
  <PaperProvider theme={theme}>
    <FoodContextProvider>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Foods" component={FoodsNavigator} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </FoodContextProvider>
  </PaperProvider>
);
