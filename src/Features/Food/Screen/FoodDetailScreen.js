import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Chart} from '../Component/Chart';
import {FoodContextContext} from '../../../services/Foods/Food-Context';

export const FoodDetailScreen = ({route, navigation}) => {
  const [PatientExpanded, setPatientExpanded] = useState(false);
  const [HeartRateExpanded, setHeartRateExpanded] = useState(false);
  const [BreathRateExpanded, setBreathRateExpanded] = useState(false);
  const [CommentExpanded, setCommentExpanded] = useState(false);
  const [OxygenSaturationLevelExpanded, setOxygenSaturationLevelExpanded] =
    useState(false);
  const {food} = route.params;

  return (
    <View>
      <ScrollView>
        <List.Accordion
          title="HeartRate"
          expanded={HeartRateExpanded}
          onPress={() => setHeartRateExpanded(!HeartRateExpanded)}>
          <List.Item
            title={
              'Current Heart Rate is: ' +
              food.Vitals.HR[food.Vitals.HR.length - 1] +
              ' BPM'
            }
          />
          <Divider />
          <Chart data={food.Vitals.HR} />
        </List.Accordion>
        <List.Accordion
          title="BreathRate"
          expanded={BreathRateExpanded}
          onPress={() => setBreathRateExpanded(!BreathRateExpanded)}>
          <List.Item
            title={
              'Current Breath Rate is : ' +
              food.Vitals.BR[food.Vitals.BR.length - 1] +
              ' BRPM'
            }
          />
          <Divider />
          <Chart data={food.Vitals.BR} />
        </List.Accordion>
        <List.Accordion
          title="OxygenSaturationLevel"
          expanded={OxygenSaturationLevelExpanded}
          onPress={() =>
            setOxygenSaturationLevelExpanded(!OxygenSaturationLevelExpanded)
          }>
          <List.Item
            title={
              'Current Oxygen Saturation Level is : ' +
              food.Vitals.O2S[food.Vitals.O2S.length - 1] +
              '%'
            }
          />
          <Divider />
          <Chart data={food.Vitals.O2S} />
        </List.Accordion>
      </ScrollView>
    </View>
  );
};
