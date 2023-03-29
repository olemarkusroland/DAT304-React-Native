import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, FlatList, } from 'react-native'

export const foodlist = [
    { id: '1', name: 'Banana', calories: '275', timestamp: '10:00 AM' },
    { id: '2', name: 'Apple', calories: '315', timestamp: '11:30 AM' },
    { id: '3', name: 'Orange', calories: '125',timestamp: '1:00 PM' },
    { id: '4', name: 'Grapes', calories: '215', timestamp: '2:30 PM' },
  ];
  

export const renderFoodItem = ({ item }) => {
  
    return (
      <View style={food_styles.foodItem}>
        <Text style={food_styles.foodName}>{item.name}</Text>
        <Text style={food_styles.calories}>{item.calories} kcal</Text>
        <Text style={food_styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  export const food_styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 'auto',
      padding: 0,
      marginBottom: 175,
    },
    foodItem: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      margin: 'auto',
    },
    titleText: {
      fontSize: 26,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    foodName: {
      flex: 1,
      marginLeft: 10,
      fontSize: 18,
      textAlign: 'left',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    calories: {
      flex: 1,
      marginLeft: 'auto',
      fontSize: 18,
      alignItems: 'center',
      textAlign: 'center',
    },
    timestamp: {
      flex: 1,
      marginLeft: 'auto',
      color: '#666',
      alignItems: 'center',
      textAlign: 'center',
    },
  });