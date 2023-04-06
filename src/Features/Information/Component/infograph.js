import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';

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
const InformationChart = ({glucoseData, insulinData}) => {
  if (!glucoseData || !insulinData) {
    return <Text>No health data available</Text>;
  }
  console.log('glucoseData:', glucoseData);
  console.log('glucoseData type:', typeof glucoseData);
  console.log('insulinData:', insulinData);
  console.log('glucoseData type:', typeof insulinData);
  const formatXLabel = value => {
    if (!value) {
      return '';
    }

    try {
      const momentObj = moment.utc(value, 'YYYY-MM-DDTHH:mm:ss.sssZ');
      return momentObj.local().format('LT');
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  insulinData.map(data => {
    const glucoseValue = data.insulin;
    const timestamp = data.timestamp;
    console.log(`Glucose value: ${glucoseValue}, Timestamp: ${timestamp}`);
  });
  glucoseData.map(data => {
    const glucoseValue = data.glucose;
    const timestamp = data.timestamp;
    console.log(`Glucose value: ${glucoseValue}, Timestamp: ${timestamp}`);
  });

  const glucoseMappedData = glucoseData.map(data => ({
    glucoseValue: data.glucose,
    timestamp: data.timestamp,
  }));

  const insulinMappedData = insulinData.map(data => ({
    insulinValue: data.insulin,
    timestamp: data.timestamp,
  }));

  return (
    <View style={{}}>
      <LineChart
        data={{
          datasets: [
            {
              data: glucoseMappedData.map(data => data.glucoseValue),
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: insulinMappedData.map(data => data.insulinValue),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisSuffix="g"
        yAxisInterval={1} // optional, defaults to 1
        formatXLabel={formatXLabel}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 15,
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
export default InformationChart;
