import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import InformationChart from '../Component/infograph';
import {HealthContext} from '../../../services/Health/Health-Context';

const InformationScreen = ({navigation}) => {
  const {glucose, insulin} = useContext(HealthContext);
  try {
    if (glucose.length > 0) {
        return (
            <View style={styles.container}>
              <InformationChart glucoseData={glucose} insulinData={insulin}></InformationChart>
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
    
}
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    marginTop: 'auto',
  },
});
export default InformationScreen;