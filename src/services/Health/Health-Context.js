import React, {useState, createContext, useEffect} from 'react';
import {GoogleAuthService} from './Auth-service';
import {HealthService} from './Health-Service';

export const HealthContext = createContext();

export const HealthContextProvider = ({children}) => {
  const [glucose, setGlucose] = useState([]);
  const [insulin, setInsulin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      setIsLoading(true);
      try {
        const glucoseData = await HealthService.getGlucoseData();
        const insulinData = await HealthService.getInsulinData();
        setGlucose(glucoseData);
        setInsulin(insulinData);
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData()
      .then(e => console.log('Fetched data'))
      .catch(e => console.log(e));
  }, []);

  return (
    <HealthContext.Provider
      value={{
        glucose,
        insulin,
        isLoading,
      }}>
      {children}
    </HealthContext.Provider>
  );
};
