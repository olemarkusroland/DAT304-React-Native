





import React, { useEffect, useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthenticationContext } from '../Auth/Auth-Context';
import PushNotification from 'react-native-push-notification';
import { deleteExerciseByTimestamp, createExericise, deleteAllExercises } from '../../../backend/realm/CRUD.js'
const API_ENDPOINT = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
const STEP_COUNT_DATA_TYPE = 'com.google.step_count.delta';
//const { accessToken } = useContext(AuthenticationContext);

export async function googleFitFetch(accessToken, realm) {
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const twentyFourHoursAgo = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000); // 24 hours ago in seconds
    var exerciceData = null;
    var start = null;
    var end = null;
    const nows = new Date();
    const dayAgoUTC = new Date(nows.getTime() - 23.95 * 60 * 60 * 1000);
    await deleteExerciseByTimestamp(realm, dayAgoUTC)
      
    fetchStepCount(accessToken, twentyFourHoursAgo * 1000, now * 1000).then(async (data) => {      
       
        
        data.forEach(async (data) => {
            start = new Date(data.startTimeMillis * 1).toISOString();
            end = new Date(data.endTimeMillis * 1).toISOString();
            await createExericise(realm, data.steps, start, end);
        });
       
        
        }).catch((error) => {
            console.error('Error fetching step data:', error);
            return 0;
        });
   
    return 200;
}

export async function fetchStepCount(accessToken, startTime, endTime) {
    try {
            const response = await fetch(
                `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        aggregateBy: [
                            {
                                dataTypeName: 'com.google.step_count.delta',
                            },
                        ],
                        bucketByTime: { durationMillis: 5 * 60 * 1000 }, // 5 minute intervals
                        startTimeMillis: startTime,
                        endTimeMillis: endTime,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        const data = await response.json();
            const buckets = data.bucket || [];
            const stepData = buckets.map(bucket => {
                const startTimeMillis = bucket.startTimeMillis || 0;
                const endTimeMillis = bucket.endTimeMillis || 0;
                const steps = bucket.dataset[0]?.point[0]?.value[0]?.intVal || 0;
                return {
                    startTimeMillis,
                    endTimeMillis,
                    steps,
                };
            });
            return stepData;
        } catch (error) {
            console.error('Error fetching step data:', error);
            throw error;
        }
};




