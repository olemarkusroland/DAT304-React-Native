import { useEffect } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { updateGlucose, updateInsulin } from './realm/CRUD.js'

export const useBackgroundFetch = (realm) => {
    useEffect(() => {
        if (realm) {
            const initBackgroundFetch = async () => {
                await BackgroundFetch.configure(
                    { minimumFetchInterval: 15 },
                    async (taskId) => {
                        console.log("[BackgroundFetch] taskId:", taskId);

                        await updateGlucose(realm);
                        await updateInsulin(realm);

                        BackgroundFetch.finish(taskId);
                    },
                    (taskId) => {
                        console.warn("[BackgroundFetch] taskId TIMEOUT:", taskId);
                        BackgroundFetch.finish(taskId);
                    }
                );

                const status = await BackgroundFetch.status();
                console.log("[BackgroundFetch] status:", status);
            };

            initBackgroundFetch();
        } else {
            console.log("useBackgroundFetch: No realm");
        }
    }, [realm]);

    const scheduleTestTask = async () => {
        await BackgroundFetch.scheduleTask({
            taskId: "test-background-fetch",
            forceAlarmManager: true,
            delay: 20000, // Run the task 20 seconds after scheduling
        });
    };

    scheduleTestTask();
};

