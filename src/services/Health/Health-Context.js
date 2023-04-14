import React, { useState, createContext, useEffect } from 'react';
import { HealthService } from './Health-Service';
import { realmOpen } from '../../../backend/realm/utils';

export const HealthContext = createContext();

export const HealthContextProvider = ({ children }) => {
    const [glucose, setGlucose] = useState([]);
    const [insulin, setInsulin] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const realm = await realmOpen();

            const glucoseListener = (newGlucose, changes) => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                const glucoseEntriesLast7Days = newGlucose.filter(
                    entry => new Date(entry.timestamp) >= oneWeekAgo,
                );
                setGlucose(glucoseEntriesLast7Days);
            };

            const insulinListener = (newInsulin, changes) => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                const insulinEntriesLast7Days = newInsulin.filter(
                    entry => new Date(entry.timestamp) >= oneWeekAgo,
                );
                setInsulin(insulinEntriesLast7Days);
            };

            realm.objects('GlucoseInfo').addListener(glucoseListener);
            realm.objects('InsulinInfo').addListener(insulinListener);

            try {
                const glucoseData = await HealthService.getGlucoses(realm);
                const insulinData = await HealthService.getInsulins(realm);
                setGlucose(glucoseData);
                setInsulin(insulinData);
            } catch (error) {
                console.error('Error fetching health data:', error);
            }

            return () => {
                realm.objects('GlucoseInfo').removeListener(glucoseListener);
                realm.objects('InsulinInfo').removeListener(insulinListener);
                realm.close();
            };
        };

        fetchData();
    }, []);

    return (
        <HealthContext.Provider
            value={{
                glucose,
                insulin,
            }}>
            {children}
        </HealthContext.Provider>
    );
};
