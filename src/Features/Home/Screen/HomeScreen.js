import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import InformationChart from '../Component/infograph';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Info')}>
        <InformationChart />
      </TouchableOpacity>
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
