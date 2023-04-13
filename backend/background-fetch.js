import { useState, useEffect } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { updateGlucose, updateInsulin } from './realm/CRUD.js';

export const useIsLoading = () => {
    const [isLoading, setIsLoading] = useState(true);
    return [isLoading, setIsLoading];
};

export const useBackgroundFetch = (realm, isAuthenticated) => {
    const [isLoading, setIsLoading] = useIsLoading();

    useEffect(() => {
        if (realm && isAuthenticated) {
            const initBackgroundFetch = async () => {
                await BackgroundFetch.configure(
                    { minimumFetchInterval: 15 },
                    async (taskId) => {
                        console.log('[BackgroundFetch] taskId:', taskId);

                        setIsLoading(true);

                        await updateGlucose(realm);
                        await updateInsulin(realm);

                        setIsLoading(false);

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
                    taskId: 'test-background-fetch',
                    forceAlarmManager: true,
                    delay: 4000,
                });
            };

            scheduleTestTask();
        }
    }, [isAuthenticated]);
};
