import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Wrap your FoodInfo component with React.memo
export const FoodInfo = React.memo(function FoodInfo({food}) {
  // Your existing FoodInfo component implementation

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>{food.carbs}</Text>
      <Text style={styles.name}>{food.grams} g</Text>

      {/* Add more fields from the mock data if needed */}
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
    color: 'white',
  },
});
