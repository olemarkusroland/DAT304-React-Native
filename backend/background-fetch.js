import { useState, useEffect, useContext } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { updateGlucose, updateInsulin } from './realm/CRUD.js';
import { googleFitFetch } from '../src/services/Exercise/Exercice-Service.js'

import { AuthenticationContext } from '../src/services/Auth/Auth-Context.js';

export const useBackgroundFetch = (realm, isAuthenticated) => {
    const { accessToken } = useContext(AuthenticationContext);
    useEffect(() => {
        if (realm && isAuthenticated) {
            const initBackgroundFetch = async () => {
                await BackgroundFetch.configure(
                    { minimumFetchInterval: 15 },
                    async (taskId) => {
                        console.log('[BackgroundFetch] taskId:', taskId);
                        await updateGlucose(realm);
                        await updateInsulin(realm);
                        var data = await googleFitFetch(accessToken, realm)
                        BackgroundFetch.finish(taskId);
                    },
                    (taskId) => {
                        console.warn('[BackgroundFetch] taskId TIMEOUT:', taskId);
                        BackgroundFetch.finish(taskId);
                    }
                );

                const status = await BackgroundFetch.status();
                console.log('[BackgroundFetch] status:', status);
            };

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
