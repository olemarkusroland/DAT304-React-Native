import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InformationChart from '../Component/infograph';
import BasalChart from '../Component/infograph2';

import {HealthContext} from '../../../services/Health/Health-Context';

const InformationScreen = ({navigation}) => {


  const [chartHeight, setChartHeight] = useState(400);
  const {glucose, insulin} = useContext(HealthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState(
    selectedDate.toDateString(),
  );

  const toggleChartHeight = () => {
    setChartHeight(chartHeight === 400 ? 600 : 400);
  };

  const onChange = (event, date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    setFormattedDate(date.toDateString());
  };


  try {
    if (glucose.length > 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.DateText}>{formattedDate}</Text>
          <TouchableOpacity onPress={toggleChartHeight}>
            <InformationChart
              glucoseData={glucose}
              insulinData={insulin}
              width={394}
              height={chartHeight}
              selectedDate={selectedDate}
              style={chartStyles.chart}
            />
          </TouchableOpacity>
          <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  } catch (error) {
    console.error(error);
    return (
      <View style={styles.container}>
        <Text>Oops, something went wrong!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 'auto',
  },
  DateText: {
    fontSize: 26,
    textAlign: 'center',
    color: 'white',
  },
});

const chartStyles = StyleSheet.create({
  chart: {
    borderRadius: 4,
    paddingRight: 45,
    marginLeft: 45,
  },
});
const chartStyles2 = StyleSheet.create({
  chart: {
    borderRadius: 4,
    paddingRight: 45,
    marginLeft: 45,
    paddingTop: 10,
  },
});

export default InformationScreen;
