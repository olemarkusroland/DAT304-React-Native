import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import InformationScreen from '../../Features/Information/Screen/InformationScreen';
import RecentFoodScreen from '../../Features/Home/Screen/FoodScreen';
import {HealthContextProvider} from '../../services/Health/Health-Context';
const InformationStack = createStackNavigator();

export const InformationNavigator = ({route, navigation}) => {
  return (
    <HealthContextProvider>
      <InformationStack.Navigator>
        <InformationStack.Screen
          options={{
            header: () => null,
            headerStyle: {
              backgroundColor: '#F7E9D7',
            },
          }}
          name="Information"
          component={InformationScreen}
        />
        <InformationStack.Screen
          options={{
            header: () => null,
            headerStyle: {
              backgroundColor: '#F7E9D7',
            },
          }}
          name="RecentFood"
          component={RecentFoodScreen}
        />
      </InformationStack.Navigator>
    </HealthContextProvider>
  );
};
