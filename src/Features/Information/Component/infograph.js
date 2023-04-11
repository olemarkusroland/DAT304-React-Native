import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';

const InformationChart = ({glucoseData, insulinData}) => {
  if (!glucoseData) {
    return <Text>No health data available</Text>;
  }


  const formatXLabeltest = (value, hours) => {
    if (!value) {
      return '';
    }
    try {
      const test = moment.utc(value, 'YYYY-MM-DDTHH:mm:ss.sssZ', false);

      //console.log(`${test.format('HH:mm')}`);
      return `${test.format('HH:mm')}`;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const glucoseMappedData = {
    labels: glucoseData
      .filter(
        (data, index) =>
          index === 0 ||
          index === glucoseData.length - 1 ||
          index % Math.floor(glucoseData.length / 4) === 0,
      )

      .map(data => formatXLabeltest(data.timestamp, 4)),
    datasets: [
      {
        data: glucoseData.map(data => data.glucose),
      },
    ],
  };

  const insulinMappedData = insulinData
    ? {
        labels: insulinData
          .filter(
            (data, index) =>
              index === 0 ||
              index === glucoseData.length - 1 ||
              index % Math.floor(glucoseData.length / 4) === 0,
          )

          .map(data => formatXLabeltest(data.timestamp, 4)),
        datasets: [
          {
            data: insulinData.map(data => data.insulin),
          },
        ],
      }
    : [];

  return (
    <View style={{padding: 10}}>
      <LineChart
        data={glucoseMappedData}
        withDots={false}
        width={Dimensions.get('window').width}
        height={300}
        yAxisSuffix="mg/dl"
        yAxisInterval={4}
        yLabelsOffset={-4}
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            marginVertical: 20,
            marginLeft: 30,
            marginRight: 30,
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
      {insulinData.length > 0 && (
        <LineChart
          data={insulinMappedData}
          width={Dimensions.get('window').width}
          height={300}
          yAxisSuffix="g"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            decimalPlaces: 2,
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
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
    </View>
  );
};
export default InformationChart;
