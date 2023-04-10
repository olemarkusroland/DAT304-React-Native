import React, {useState, createContext, useEffect} from 'react';
import {GoogleAuthService} from './Auth-service';
import {HealthService} from './Health-Service';
import Realm from 'realm';
import {deleteRealmFile, realmOpen} from '../../../backend/realm/utils';

export const HealthContext = createContext();

export const HealthContextProvider = ({children}) => {
  const [glucose, setGlucose] = useState([]);
  const [insulin, setInsulin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastGlucoseValue, setLastGlucoseValue] = useState(null);
  const [lastTimeValue, setLastTimeValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const r = await realmOpen();

      // Set up a listener for changes in the glucose and insulin collections
      const glucoseListener = (newGlucose, changes) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);

        const glucoseEntriesLast7Days = newGlucose.filter(
          entry => new Date(entry.timestamp) >= oneWeekAgo,
        );
        setGlucose(glucoseEntriesLast7Days);
      };

      const insulinListener = (newInsulin, changes) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);

        const insulinEntriesLast7Days = newInsulin.filter(
          entry => new Date(entry.timestamp) >= oneWeekAgo,
        );
        setInsulin(insulinEntriesLast7Days);
      };

      r.objects('GlucoseInfo').addListener(glucoseListener);
      r.objects('InsulinInfo').addListener(insulinListener);

      setIsLoading(true);

      try {
        const glucoseData = await HealthService.getGlucoseData2(r);
        const insulinData = await HealthService.getInsulindata2(r);
        setGlucose(glucoseData);
        setInsulin(insulinData);
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setIsLoading(false);
      }

      // Clean up the listeners when the component unmounts
      return () => {
        r.objects('GlucoseInfo').removeListener(glucoseListener);
        r.objects('InsulinInfo').removeListener(insulinListener);
        r.close();
      };
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (glucose.length > 0) {
      setLastGlucoseValue(glucose[glucose.length - 1].glucose);
      setLastTimeValue(glucose[glucose.length - 1].timestamp.toLocaleString());
    } else {
      setLastGlucoseValue(null);
      setLastTimeValue(null);
    }
  }, [glucose]);
  return (
    <HealthContext.Provider
      value={{
        glucose,
        insulin,
        isLoading,
        lastGlucoseValue,
        lastTimeValue,
      }}>
      {children}
    </HealthContext.Provider>
  );
};
