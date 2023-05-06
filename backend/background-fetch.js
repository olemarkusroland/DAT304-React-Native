import { useState, useEffect, useContext } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { updateGlucose, updateInsulin } from './realm/CRUD.js';
import { googleFitUpdateSteps } from '../src/services/Exercise/Exercice-Service.js'
import { refreshAccessToken } from '../src/services/Auth/Auth-service.js'
import { AuthenticationContext } from '../src/services/Auth/Auth-Context.js';

export const useBackgroundFetch = (realm, isAuthenticated) => {
    const { accessToken, setaccessToken, refreshToken } = useContext(AuthenticationContext);
    useEffect(() => {
        if (realm && isAuthenticated) {
            const initBackgroundFetch = async () => {
                const timeStart = global.nativePerformanceNow();
                await BackgroundFetch.configure(
                    { minimumFetchInterval: 15 },
                    async (taskId) => {
                        console.log('[BackgroundFetch] taskId:', taskId);
                        var refreshedToken = await refreshAccessToken(refreshToken)
                        setaccessToken(refreshedToken)
                        await updateGlucose(realm);
                        await updateInsulin(realm);
                        var data = await googleFitUpdateSteps(accessToken, realm)
                        const timeEnd = global.nativePerformanceNow();
                        console.log(`Adding data BGF time spent: ${timeEnd - timeStart}ms`);
                        BackgroundFetch.finish(taskId);
                    },
                    (taskId) => {
                        console.warn('[BackgroundFetch] taskId TIMEOUT:', taskId);
                        BackgroundFetch.finish(taskId);
                    }
                );

                const status = await BackgroundFetch.status();
                console.log('[BackgroundFetch] status:', status);
                const timeEnd2 = global.nativePerformanceNow();
                console.log("Background fetch END spent:", Date.now());
                console.log(`Time: ${timeEnd2 - timeStart}ms`);
            };
            
            console.log("Init backgroundFetch started at:", Date.now());

            initBackgroundFetch();
        }
    }, [realm, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            const scheduleTestTask = async () => {
                await BackgroundFetch.scheduleTask({
                    taskId: 'Initial-background-fetch',
                    forceAlarmManager: true,
                    delay: 3000,
                });
            };
            scheduleTestTask();

        }
    }, [isAuthenticated]);
};
