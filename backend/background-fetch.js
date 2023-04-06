import { useEffect } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { updateGlucose, updateInsulin } from './realm/CRUD.js'

export const useBackgroundFetch = () => {
    useEffect(() => {
        const initBackgroundFetch = async () => {
            await BackgroundFetch.configure(
                { minimumFetchInterval: 15 },
                async (taskId) => {
                    console.log('[BackgroundFetch] taskId:', taskId);

                    await updateGlucose();
                    await updateInsulin();

                    BackgroundFetch.finish(taskId);
                },
                (taskId) => {
                    console.warn('[BackgroundFetch] taskId TIMEOUT:', taskId);
                    BackgroundFetch.finish(taskId);
                },
            );

            const status = await BackgroundFetch.status();
            console.log('[BackgroundFetch] status:', status);
        };

        initBackgroundFetch();
    }, []);

    const scheduleTestTask = async () => {
        await BackgroundFetch.scheduleTask({
            taskId: 'test-background-fetch',
            forceAlarmManager: true,
            delay: 20000, // Run the task 10 seconds after scheduling
        });
    };

    scheduleTestTask();

};
