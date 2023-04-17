import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  foodlist,
  renderFoodItem,
  food_styles,
} from '../../Home/Component/foodlist';
import InformationChart from '../Component/infograph';
import {HealthContext} from '../../../services/Health/Health-Context';
import {Chart} from '../../Food/Component/Chart';
import moment from 'moment';

const placebodata = {
  labels: [
    '2022-01-01T00:00:00Z',
    '2022-01-01T01:00:00Z',
    '2022-01-01T02:00:00Z',
    '2022-01-01T03:00:00Z',
    '2022-01-01T04:00:00Z',
    '2022-01-01T05:00:00Z',
  ],
  datasets: [
    {
      data: [20, 45, 28, 50, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Whole hour'], // optional
};

const InformationScreen = ({navigation}) => {
  const {glucose, insulin, isLoading,} = useContext(HealthContext);
  try {
    if (glucose.length > 0) {
        return (
            <View style={styles.container}>
              <InformationChart glucoseData={glucose} insulinData={insulin}></InformationChart>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
} catch (error) {
    
}
  /* if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <InformationChart glucoseData={glucose}></InformationChart>
    </View>
  ); */
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    marginTop: 'auto',
  },
});
export default InformationScreen;
