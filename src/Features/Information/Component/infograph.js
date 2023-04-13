import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';

const InformationChart = ({glucoseData}) => {
  if (!glucoseData) {
    return <Text>No health data available</Text>;
  }
  const [data, setData] = useState({
    labels: ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  });


  const lastTenGlucoseValues = glucoseData.slice(-10).map(data => {
    return {
      glucose: parseInt(data.glucose),
      timestamp: data.timestamp
    };
  });

  const formattedTimestamps = lastTenGlucoseValues.map(data => {
    const date = new Date(data.timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  });

  const updateData = () => {
    // Replace the placeholder data with actual data
    const newData = {
      // ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
      // formattedTimestamps
      labels: formattedTimestamps,
      datasets: [
        {
          data: lastTenGlucoseValues.map(data => data.glucose),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2
        }
      ]
    };

    setData(newData);
  };
  useEffect(() => {
    // Update data every 5 seconds
    const interval = setInterval(() => {
      updateData();
    }, 5000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);
  
  //console.log(lastTenGlucoseValues);
  //console.log(glucoseData[0]);
  //console.log(glucoseData[0].glucose)
  //console.log(glucoseData[0].timestamp);
  console.log("Interval completed");

  return (
    <View style={{flex: 1}}>
       <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={500}
        yAxisSuffix="mg/dL"
        yAxisInterval={2}
        xAxisInterval={5}
        chartConfig={{
          xAxisLabelRotation: 90,
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          },
        }}
        verticalLabelRotation={90}
        fromZero={true}
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
