import React, {useState, createContext, useEffect, useCallback, useMemo, useRef} from 'react';
import moment from 'moment';

import { HealthService } from './Health-Service';
import { realmOpen } from '../../../backend/realm/utils';
import * as realm from "realm";

export const HealthContext = createContext();

export const HealthContextProvider = ({ children }) => {
    const [glucose, setGlucose] = useState([]);
    const [insulin, setInsulin] = useState([]);
    const [latestGlucose, setLatestGlucose] = useState([]);
    const [realmInstance, setRealmInstance] = useState(null);

    const isRealmOpened = useRef(false);


    //CHANGE TO useFocusEffect IN THE USEFFECT https://reactnavigation.org/docs/use-focus-effect
    // maybe?
    useEffect(() => {
        const initializeRealm = async () => {
            if (isRealmOpened.current) {
                return;
            }

            console.log("Opening Realm...");
            const instance = await realmOpen();
            setRealmInstance(instance);
            isRealmOpened.current = true;
        }

        initializeRealm();
    }, []);

    const fetchData = useCallback(async () => {
        if (!realmInstance) {
            return;
        }

        const glucoseData = await HealthService.getGlucoses(realmInstance);
        const insulinData = await HealthService.getInsulins(realmInstance);

        if (glucoseData && glucoseData.length > 0) {
            setGlucose(glucoseData);
            setLatestGlucose(glucoseData[0]);
        }

        if (insulinData && insulinData.length > 0) {
            setInsulin(insulinData);
        }
    }, [realmInstance]);

    useEffect(() => {
        let timerId = null;

        if (!realmInstance) {
            return;
        }

        const glucoseListener = (glucoses, changes) => {
            if (changes.insertions.length > 0) {
                if (timerId !== null) {
                    clearTimeout(timerId);
                }
                timerId = setTimeout(() => fetchData(), 500);
            }
        };

        const insulinListener = (insulins, changes) => {
            if (changes.insertions.length > 0) {
                if (timerId !== null) {
                    clearTimeout(timerId);
                }
                timerId = setTimeout(() => fetchData(), 500);
            }
        };

        const glucoseObjects = realmInstance.objects('GlucoseInfo');
        glucoseObjects.addListener(glucoseListener);

        const insulinObjects = realmInstance.objects('InsulinInfo');
        insulinObjects.addListener(insulinListener);

        return () => {
            glucoseObjects.removeListener(glucoseListener);
            insulinObjects.removeListener(insulinListener);
            if (timerId !== null) {
                clearTimeout(timerId);
            }
        };
    }, [realmInstance, fetchData]);

    return (
        <HealthContext.Provider
            value={{
                glucose,
                latestGlucose,
                insulin,
            }}>
            {children}
        </HealthContext.Provider>
    );
};