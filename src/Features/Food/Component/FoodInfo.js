import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const FoodInfo = React.memo(function FoodInfo({food}) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>Carbs: {food.carbohydrates}</Text>
      <Text style={styles.grams}>{food.grams} </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});
