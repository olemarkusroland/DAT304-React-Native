import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InformationChart from '../Component/infograph';
import { HealthContext } from '../../../services/Health/Health-Context';

const InformationScreen = ({ navigation }) => {
  const { glucose, insulin } = useContext(HealthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
  };

  try {
    if (glucose.length > 0) {
      return (
        <View style={styles.container}>
          <Button
            title="Select Date"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <InformationChart
            glucoseData={glucose}
            insulinData={insulin}
            width={394}
            height={500}
            selectedDate={selectedDate}
          />
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
});

export default InformationScreen;
