import React, {useState, createContext} from 'react';
import {GoogleAuthService} from './Auth-service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const accessToken = await GoogleAuthService.login();
      const userData = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      ).then(res => res.json());
      console.log('Google user data', userData);
      setUser(userData);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: true,
        user,
        isLoading,
        error,
        handleLogin,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
