import {useEffect} from 'react';
import BackgroundFetch from 'react-native-background-fetch';

export const useBackgroundFetch = (isAuthenticated, realm) => {
  useEffect(() => {
    const fetchDataInBackground = async () => {
      // Add your background fetch logic here
    };

    // Only register the background fetch when the user is authenticated
    if (isAuthenticated) {
      BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // Fetch interval in minutes
        },
        async () => {
          console.log('[BackgroundFetch] Headless start');
          await fetchDataInBackground();
          BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        },
        (error) => {
          console.log('[BackgroundFetch] error', error);
        },
      );

      // Add your event listener here
    }

    // Return a cleanup function that will unregister the background fetch
    return () => {
      if (isAuthenticated) {
        BackgroundFetch.stop();
      }
    };
  }, [isAuthenticated, realm]);
};
