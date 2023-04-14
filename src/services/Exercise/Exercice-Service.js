//// JavaScript source code
//import React, { useEffect, useState, useContext } from 'react';
//import { Text, View } from 'react-native';
//import { AuthenticationContext } from '../Auth/Auth-Context';
//import PushNotification from 'react-native-push-notification';
//import GoogleFit, { Scopes } from 'react-native-google-fit';

//export const GooglefitFetch = () => {
//    const { accessToken } = useContext(AuthenticationContext);
//    const [calories, setCalories] = useState(0);
//    var [dailySteps, setdailySteps] = useState(0);
//    useEffect(() => {
        
//        const now = Math.floor(Date.now() / 1000); // current time in seconds
//        const sevenDaysAgo = Math.floor((Date.now() - 2 * 24 * 60 * 60 * 1000) / 1000); // 7 days ago in seconds
//        fetchStepCount(accessToken, sevenDaysAgo * 1000, now * 1000).then((stepCount) => {
//            console.log(`Fetched step count: ${ stepCount } `);
//            setdailySteps(stepCount);
//        })
//            .catch((error) => {
//                console.error('Error fetching step count:', error);
//            });

//    }, []);

   

//    async function fetchStepCount(accessToken, startTime, endTime) {
//        try {
//            const response = await fetch(
//                `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
//{
//    method: 'POST',
//        headers: {
//        'Content-Type': 'application/json',
//            Authorization: `Bearer ${accessToken}`,
//                    },
//    body: JSON.stringify({
//        aggregateBy: [
//            {
//                dataTypeName: 'com.google.step_count.delta',

//            },
//            //{
//            //    dataTypeName: 'com.google.activity.segment',
//            //},

//        ],
//        bucketByTime: { durationMillis: endTime - startTime },
//        bucketBySession: {
//            minDurationMillis: 300000,
//        },
//        startTimeMillis: startTime,
//        endTimeMillis: endTime,
//    }),
//                }
//            );
//if (!response.ok) {
//    throw new Error(`HTTP error! status: ${response.status}`);
//}
//const data = await response.json();
//const stepCount = data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal;
////for (let i = 0; i < 4; i++) {
////    console.log(data.bucket[0]?.dataset[0]?.point[i]?.value[0]?.intVal)
////}

//return stepCount || 0;
//        } catch (error) {
//    console.error('Error fetching step count:', error);
//    throw error;
//}
//    }
//return (
//    <View>
//        <Text>Total steps the last 24 hours: {dailySteps}</Text>
//    </View>
//);
//};
