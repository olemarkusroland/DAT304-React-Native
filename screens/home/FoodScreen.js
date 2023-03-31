import React from 'react';
import { View, Text, Button, FlatList, } from 'react-native';
import {foodlist, renderFoodItem, food_styles} from '../../components/foodlist';


const RecentFoodScreen = ({navigation}) => {

  return (
    <View style={food_styles.container}>
      <Text style={food_styles.titleText}>Recently Eaten Food</Text>
      <FlatList
        data={foodlist}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RecentFoodScreen;
