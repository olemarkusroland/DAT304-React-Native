import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, Dimensions, Button} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';


const InformationChart = ({glucoseData, insulinData, width, height, selectedDate}) => {
  if (!glucoseData || !insulinData) {
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
  const [showDatePicker, setShowDatePicker] = useState(false);


  const groupedGlucoseData = glucoseData.reduce((acc, curr) => {
    const date = moment(curr.timestamp).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      glucose: parseInt(curr.glucose),
      timestamp: curr.timestamp,
    });
    return acc;
  }, {});
  
  const groupedInsulinData = insulinData.reduce((acc, curr) => {
    const date = moment(curr.timestamp).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      insulin: parseInt(curr.insulin),
      timestamp: curr.timestamp,
    });
    return acc;
  }, {});

  // Get the data from the grouped data from a date using datetimepicker
  const selectedDateGlucoseData = groupedGlucoseData[moment(selectedDate).format('YYYY-MM-DD')] || [];
  const selectedDateInsulinData = groupedInsulinData[moment(selectedDate).format('YYYY-MM-DD')] || [];

  const groupedDateData =  selectedDateGlucoseData.concat(selectedDateInsulinData);
  const sortedGroupedValues = groupedDateData.sort((a, b) => {
    const timeA = moment(a.timestamp);
    const timeB = moment(b.timestamp);
    return timeA.diff(timeB, 'milliseconds');
  });

  //console.log('sorted grouped values: ', sortedGroupedValues);

  // Split the values into two arrays, one for the values and one for the timestamps.

  const sortedGroupedUpdatedData = sortedGroupedValues.map((item) => ({
    timestamp: moment(item.timestamp).format('HH:mm'),
    glucose: item.glucose ?? null,
    insulin: item.insulin ?? null,
  }));

  // Find an insulin value, check the closest timestamp for glucose value (before and after)
  // Interpolate the two glucose values and set the insulin value equal to the interpolated
  // value. This is to find an estimated value when the user inserted insulin.
  function setInsulinValues(sortedGroupedUpdatedData) {
    for (let i = 0; i < sortedGroupedUpdatedData.length; i++) {
      const currentData = sortedGroupedUpdatedData[i];
      const currentInsulin = currentData.insulin;
  
      if (currentInsulin !== null) {
        let closestGlucoseBefore = null;
        let closestGlucoseAfter = null;
        let closestGlucoseBeforeTimestamp = null;
        let closestGlucoseAfterTimestamp = null;
  
        for (let j = 0; j < sortedGroupedUpdatedData.length; j++) {
          if (i !== j && sortedGroupedUpdatedData[j].glucose !== null) {
            const glucoseTimestamp = moment(sortedGroupedUpdatedData[j].timestamp, 'HH:mm');
            const currentTimestamp = moment(currentData.timestamp, 'HH:mm');
  
            if (glucoseTimestamp.isBefore(currentTimestamp)) {
              if (closestGlucoseBefore === null || currentTimestamp.diff(glucoseTimestamp) < currentTimestamp.diff(moment(closestGlucoseBeforeTimestamp, 'HH:mm'))) {
                closestGlucoseBefore = sortedGroupedUpdatedData[j].glucose;
                closestGlucoseBeforeTimestamp = sortedGroupedUpdatedData[j].timestamp;
              }
            } else if (glucoseTimestamp.isAfter(currentTimestamp)) {
              if (closestGlucoseAfter === null || glucoseTimestamp.diff(currentTimestamp) < moment(closestGlucoseAfterTimestamp, 'HH:mm').diff(currentTimestamp)) {
                closestGlucoseAfter = sortedGroupedUpdatedData[j].glucose;
                closestGlucoseAfterTimestamp = sortedGroupedUpdatedData[j].timestamp;
              }
            }
          }
        }
  
        if (closestGlucoseBefore !== null && closestGlucoseAfter !== null) {
          const interpolatedGlucose = closestGlucoseBefore + ((closestGlucoseAfter - closestGlucoseBefore) / moment(closestGlucoseAfterTimestamp, 'HH:mm').diff(moment(closestGlucoseBeforeTimestamp, 'HH:mm'))) * moment(currentData.timestamp, 'HH:mm').diff(moment(closestGlucoseBeforeTimestamp, 'HH:mm'));
          currentData.insulin = interpolatedGlucose;
        }
      }
    }
  
    return sortedGroupedUpdatedData;
  }
  
  
  setInsulinValues(sortedGroupedUpdatedData);

  const glucoseValues = sortedGroupedUpdatedData.map((item) => item.glucose ?? null);
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
          data: glucoseValues,
          color: (opacity = 1) => `rgba(119, 207, 153, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: insulinValues,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 0.1,
        }
      ],
      legend: ["Glucose", "Insulin"]
    };
    setData(newData);
    };

  // Update data when the date changes
  useEffect(() => {
    updateData();
  }, [selectedDate]);


  
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
    <View style={{}}>
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
        style={{
          borderRadius: 4,
          paddingRight: 45,
          marginLeft: 45,
        }}
      />
    </View>
  );
};
export default InformationChart;
