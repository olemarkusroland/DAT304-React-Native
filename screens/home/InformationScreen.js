import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Dimensions,} from 'react-native';
import {
  LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart
} from "react-native-chart-kit";
import moment from 'moment';
/*
  const fetchData = useCallback(async () => {
  const data = await fetch('https://yourapi.com');

  setData(data);
  }, []) 
*/
const placebodata = {
  labels: [
  '2022-01-01T00:00:00Z', 
  '2022-01-01T01:00:00Z', 
  '2022-01-01T02:00:00Z', 
  '2022-01-01T03:00:00Z', 
  '2022-01-01T04:00:00Z', 
  '2022-01-01T05:00:00Z'],
  datasets: [
    {
      data: [20, 45, 28, 50, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Whole hour"] // optional
}

const InformationScreen = ({navigation}) => {

  const formatXLabel = (value) => {
    // Convert UTC time to local time using moment.js
    return moment.utc(value).local().format('LT');
  }

  const [data, setData] = useState(placebodata);
      
  

  return (
    <View style={styles.container}>
      <Text>Information Screen</Text>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix="g"
        yAxisInterval={1} // optional, defaults to 1
        formatXLabel={formatXLabel}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      <Button
      title="Go back"
      onPress={() => 
        navigation.navigate("TabNavigator", {screen: "Home"})}>
      </Button>

      <Button
      title="Console debug 1"
      onPress={() => 
        console.log(placebodata.datasets[0].data)}>
      </Button>
      <Button
      title="Console debug 2"
      onPress={() => 
        console.log()}>
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InformationScreen;