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


export const HomeScreen = ({ navigation }) => {
    const { glucose, insulin } = useContext(HealthContext);
    try {
        if (glucose.length > 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.GlucoseValue}>{glucose[0].glucose}mg/dl</Text>
                    <Text style={styles.TimeValue}>{glucose[0].timestamp.toLocaleString()}</Text>
                  
                </View>

            );
        }
        else {
            return (
                <View style={styles.container}>
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
  },
  TimeValue: {
    fontSize: 24,
    color: 'grey',
  },
});
