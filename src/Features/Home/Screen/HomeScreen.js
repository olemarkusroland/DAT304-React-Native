import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InformationChart from '../../Information/Component/infograph';
import {HealthContext} from '../../../services/Health/Health-Context';

export const HomeScreen = ({navigation}) => {
  const {glucose, insulin, isLoading} = useContext(HealthContext);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Info')}>
        <InformationChart glucoseData={glucose} insulinData={insulin} />
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
