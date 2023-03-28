import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const FoodInfo = ({food}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>{food.description}</Text>
      {/* Add more fields from the mock data if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
    color: '#666666',
  },
});
