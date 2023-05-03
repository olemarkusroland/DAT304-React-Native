import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {FoodScreen} from '../../Features/Food/Screen/FoodScreen';
import {FoodDetailScreen} from '../../Features/Food/Screen/FoodDetailScreen';
import {FoodEditScreen} from '../../Features/Food/Screen/FoodEditScreen';
import {FoodContextProvider} from '../../services/Foods/Food-Context';
import {FoodCreateScreen} from '../../Features/Food/Screen/create-food';

const FoodStack = createStackNavigator();

export const FoodsNavigator = () => {
  return (
    <FoodContextProvider>
      <FoodStack.Navigator>
        <FoodStack.Screen
          options={{
            header: () => null,

            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="Food"
          component={FoodScreen}
        />
        <FoodStack.Screen
          name="FoodDetail"
          component={FoodDetailScreen}
          options={{
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <FoodStack.Screen
          name="FoodEdit"
          component={FoodEditScreen}
          options={{
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <FoodStack.Screen
          name="FoodCreate"
          component={FoodCreateScreen}
          options={{
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
      </FoodStack.Navigator>
    </FoodContextProvider>
  );
};
