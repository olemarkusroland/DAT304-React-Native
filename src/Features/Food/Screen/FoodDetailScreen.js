import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Chart} from '../Component/Chart';
import {FoodContextContext} from '../../../services/Foods/Food-Context';
import {styles} from '../../../Styles';

export const FoodDetailScreen = ({route, navigation}) => {
  const {food} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>{food.carbs}</Text>
      {/* Add more fields from the mock data if needed */}
    </View>
  );
};
