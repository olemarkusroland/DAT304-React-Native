import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import React from 'react';

export const Chart = ({glucoseData, insulinData}) => {
  const labels = glucoseData.map(data => data.timestamp);

  const glucoseDataset = {
    data: glucoseData.map(data => data.glucose),
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    strokeWidth: 2,
  };

  const insulinDataset = {
    data: insulinData.map(data => data.insulin),
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 2,
  };

  const formatXLabel = value => {
    return moment.utc(value).local().format('LT');
  };

  return (
    <View style={{}}>
      <LineChart
        data={{
          labels: labels,
          datasets: [glucoseDataset, insulinDataset],
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
