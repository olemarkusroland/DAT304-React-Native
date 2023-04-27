import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { HealthContext } from '../../../services/Health/Health-Context';
import InformationChart from '../../Information/Component/infograph';

export const HomeScreen = ({ navigation }) => {
    const {glucose, insulin} = useContext(HealthContext);
    try {
        if (glucose.length > 0) {
            return (
                <View style={styles.container}>
                  <TouchableOpacity
                        onPress={() => navigation.navigate('Info')}>
                        <InformationChart
                        style={styles.Chart}
                        glucoseData={glucose} 
                        insulinData={insulin}
                        width={300}
                        height={300}
                    />
                  </TouchableOpacity>

                    <Button
                    title='Insulin'
                    onPress={() => console.log('Insulin Logged: ', insulin)}>
                    </Button>
                    <Button
                    title='Glucose'
                    onPress={() => console.log('Glucose Logged: ', glucose)}>
                    </Button>
                    <Text style={styles.GlucoseValue}>{glucose[0].glucose}mg/dl</Text>
                    <Text style={styles.TimeValue}>{glucose[0].timestamp.toLocaleString()}</Text>
                </View>

            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={{color: 'white', fontSize: 32}}>Loading...</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                   
                </View>
            );
        }
    } catch (error) {
        console.log("Home screen: ", error)
    }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  GlucoseValue: {
    fontSize: 52,
    textAlign: 'center',
    color: 'white',
  },
  TimeValue: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',

  },
  Chart: {
    borderRadius: 4,
    paddingRight: 50,
    marginLeft: 50,
    paddingTop: 10,
  }
});
