import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, LogBox } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

LogBox.ignoreLogs(['Remote debugger']);

type Event = {
    taskId: string;
    timestamp: string;
}

export const BackgroundTest = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: Event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const onFetchEvent = async (taskId: string) => {
        console.log('[BackgroundFetch] taskId:', taskId);
        const timestamp = new Date().toLocaleTimeString();
        addEvent({ taskId, timestamp });
        BackgroundFetch.finish(taskId);
    };

    useEffect(() => {
        const initBackgroundFetch = async () => {
            await BackgroundFetch.configure(
                { minimumFetchInterval: 15 }, // Set the minimum fetch interval
                onFetchEvent,
                (taskId: string) => {
                    console.warn('[BackgroundFetch] taskId TIMEOUT:', taskId);
                    BackgroundFetch.finish(taskId);
                },
            );

            const status = await BackgroundFetch.status();
            console.log('[BackgroundFetch] status:', status);
        };

        initBackgroundFetch();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Background Fetch Events</Text>
            <View style={styles.eventList}>
                {events.map((event, index) => (
                    <Text key={index}>
                        [Event {index + 1}] {event.taskId}: {event.timestamp}
                    </Text>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    eventList: {
        paddingHorizontal: 20,
    },
});
