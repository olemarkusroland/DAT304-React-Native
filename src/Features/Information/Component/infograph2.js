import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';


const BasalChart = ({insulinData, width, height, selectedDate, style}) => {
  if (!insulinData) {
    return <Text>No health data available</Text>;
  }
  const [data, setData] = useState({
    labels: ['13:00',],
    datasets: [
      {
        data: [0,],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
      
    ],
    legend: ["Loading.."] 
  });

  
  const groupedInsulinData = insulinData.reduce((acc, curr) => {
    const date = moment(curr.timestamp).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      insulin: curr.insulin,
      timestamp: curr.timestamp,
    });
    return acc;
  }, {});

  // Get the data from the grouped data from a date using datetimepicker
  const selectedDateInsulinData = groupedInsulinData[moment(selectedDate).format('YYYY-MM-DD')] || [];
  const sortedGroupedValues = selectedDateInsulinData.sort((a, b) => {
    const timeA = moment(a.timestamp);
    const timeB = moment(b.timestamp);
    return timeA.diff(timeB, 'milliseconds');
  });

  //console.log('sorted grouped values: ', sortedGroupedValues);

  // Split the values into two arrays, one for the values and one for the timestamps.

  const sortedGroupedUpdatedData = sortedGroupedValues.map((item) => ({
    timestamp: moment(item.timestamp).format('HH:mm'),
    insulin: item.insulin ?? null,
  }));

  // Find an insulin value, check the closest timestamp for glucose value (before and after)
  // Interpolate the two glucose values and set the insulin value equal to the interpolated
  // value. This is to find an estimated value when the user inserted insulin.
  const insulinValues = sortedGroupedUpdatedData.map((item) => item.insulin ?? null);
  const timestamps = sortedGroupedUpdatedData.map((item) => item.timestamp);  


  //console.log(sortedGroupedUpdatedData);

  const formatXLabel = (timestamps) => {

    const time = moment(timestamps, 'HH:mm');
    if (time.minute() === 0){
      //console.log('returned time: ', time.format('MMM Do YY, HH:mm'))
      return time.format('HH:mm');
    } else {
      return '';
    }
  };

  const updateData = () => {
    // Replace the placeholder data with actual data
    
    const newData = {
      labels: timestamps,
      datasets: [
        {
          data: insulinValues,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 0.1,
        }
      ],
      legend: ["Basal Insulin"]
    };
    setData(newData);
    };

  // Update data when the date changes
  useEffect(() => {
    updateData();
    
  }, [selectedDate]);
  console.log(selectedDateInsulinData);
  
  const chartConfig = {
    xAxisLabelRotation: 90,
    backgroundColor: '#DCDCDD',
    backgroundGradientFrom: '#28666E',
    backgroundGradientTo: '#4BB1BE',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "3",
      strokeWidth: "0.5",
      stroke: "#fff"
    }
    
  };
  
  
  return (
    <View>
       <LineChart
        data={data}
        width={width}
        height={height}
        yAxisSuffix="u"
        yAxisInterval={2}
        xAxisInterval={1}
        formatXLabel={formatXLabel}
        chartConfig={chartConfig}
        verticalLabelRotation={90}
        fromZero={true}
        style={style}
      />
    </View>
  );
};
export default BasalChart;
