import {useState, useEffect, useContext, useMemo} from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { updateGlucose, updateInsulin } from './realm/CRUD.js';
import { googleFitUpdateSteps } from '../src/services/Exercise/Exercice-Service.js'
import { refreshAccessToken } from '../src/services/Auth/Auth-service.js'
import { AuthenticationContext } from '../src/services/Auth/Auth-Context.js';
export const useBackgroundFetch = (realm) => {
    const { isAuthenticated, accessToken, setAccessToken, refreshToken , needRefresh, setNeedRefresh} = useContext(AuthenticationContext);
    const backgroundFetchCallback = useMemo(() => async (taskId) => {
        console.log('[BackgroundFetch] taskId:', taskId);

            const refreshedToken = await refreshAccessToken(refreshToken)
            setAccessToken(refreshedToken)

        await updateGlucose(realm);
        await updateInsulin(realm);
        var data = await googleFitUpdateSteps(accessToken, realm)
        BackgroundFetch.finish(taskId);
    }, [accessToken, realm]);

    useEffect(() => {
        if (realm && isAuthenticated) {
            const initBackgroundFetch = async () => {
                await BackgroundFetch.configure(
                    { minimumFetchInterval: 15 },
                    backgroundFetchCallback,
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
    }, [realm, isAuthenticated, backgroundFetchCallback]);

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