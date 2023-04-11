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
  const lastGlucoseValue =
    glucose.length > 0 ? glucose[glucose.length - 1].glucose : null;
  const lastTimeValue =
    glucose.length > 0
      ? glucose[glucose.length - 1].timestamp.toLocaleString()
      : null;

  return (
    <View style={styles.container}>
      <Text style={styles.GlucoseValue}>{lastGlucoseValue}mg/dl</Text>
      <Text style={styles.TimeValue}>{lastTimeValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  GlucoseValue: {
    fontSize: 52,
  },
  TimeValue: {
    fontSize: 24,
    color: 'grey',
  },
});
