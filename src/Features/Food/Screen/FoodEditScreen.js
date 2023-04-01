import React, {useContext, useState} from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Chart} from '../Component/Chart';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {styles} from '../../../Styles';

export const FoodEditScreen = ({route, navigation}) => {
  const {food} = route.params;
  const {addDistinctFood} = useContext(FoodContext);

  const addToSelectedFoods = () => {
    addDistinctFood(food);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>{food.carbs}</Text>
      {/* Add more fields from the mock data if needed */}

      <Button title="Confirm Change" onPress={addToSelectedFoods} />
    </View>
  );
};
