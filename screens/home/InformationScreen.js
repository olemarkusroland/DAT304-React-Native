import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {foodlist, renderFoodItem, food_styles} from '../../components/foodlist';
import InformationChart from '../../components/infograph';


const placebodata = {
  labels: [
  '2022-01-01T00:00:00Z', 
  '2022-01-01T01:00:00Z', 
  '2022-01-01T02:00:00Z', 
  '2022-01-01T03:00:00Z', 
  '2022-01-01T04:00:00Z', 
  '2022-01-01T05:00:00Z'],
  datasets: [
    {
      data: [20, 45, 28, 50, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Whole hour"] // optional
}

const InformationScreen = ({navigation}) => {

      
  return (
    <View style={styles.container}>
      <InformationChart></InformationChart>
      <View style={food_styles.container}>
      <TouchableOpacity style={{borderRadius: 5, borderColor: '#ddd', flex: 1, backgroundColor: '#ddd'}}
        onPress={() => 
        navigation.navigate("TabNavigator", {screen: "Food"})}>
        <Text style={food_styles.titleText}>Recently Eaten Food</Text>
        <FlatList
          data={foodlist}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
        />
      </TouchableOpacity>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    marginTop: 'auto',
  },
});

export default InformationScreen;