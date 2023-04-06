import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import InformationChart from '../../Information/Component/infograph';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Info')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
