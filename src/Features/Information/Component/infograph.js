import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Button} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';


const InformationChart = ({glucoseData}) => {
  if (!glucoseData) {
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Groups the data into dates
  const groupedData = glucoseData.reduce((acc, curr) => {
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

  const selectedDateData = groupedData[moment(selectedDate).format('YYYY-MM-DD')] || [];

  const sortedGlucoseValues = selectedDateData.sort((a, b) => {
    const timeA = moment(a.timestamp);
    const timeB = moment(b.timestamp);
    return timeA.diff(timeB, 'milliseconds');
  });

  const sortedUpdatedLabels = sortedGlucoseValues.map((item) => moment(item.timestamp).format('HH:mm'));
  const sortedUpdatedData = sortedGlucoseValues.map((item) => (item.glucose));
  
  //console.log('raw data: ', glucoseData);
  //console.log('sorted data: ', sortedGlucoseValues);
  //console.log('sorted labels: ',sortedUpdatedLabels);
  //console.log('sorted values: ',sortedUpdatedData);



  // GET THIS TO UPDATE WHENEVER SORTEDUPDATEDLABELS CHANGE !!!!!!!!!!!

  // check in the return (formatxlabel)

  
  const formatXLabel = (sortedUpdatedLabels) => {

    const time = moment(sortedUpdatedLabels, 'HH:mm');
    //console.log('time: ',time);
    //console.log('sorted time:', sortedUpdatedLabels);
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
      // ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
            //sortedUpdatedLabels, updatedLabels
      labels: sortedUpdatedLabels,
      datasets: [
        {
                //sortedUpdatedData, updatedData
          data: sortedUpdatedData,
        },
      ]
    };
    setData(newData);
    };

  // Update data when the date changes
  useEffect(() => {
    updateData();
  }, [selectedDate]);
  
  return (
    <View style={{flex: 1}}>
       <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={500}
        yAxisSuffix=""
        yAxisInterval={2}
        xAxisInterval={1}
        formatXLabel={formatXLabel}
        chartConfig={{
          xAxisLabelRotation: 90,
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: '#ffa726'
          },
        }}
        verticalLabelRotation={90}
        fromZero={true}
        bezier
        style={{
          marginVertical: 15,
          marginLeft: -15,
          marginRight: 15,
          borderRadius: 16,
        }}
      />
       <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              setSelectedDate(date);
            }}
          />
        )}

    </View>
  );
};
export default InformationChart;
