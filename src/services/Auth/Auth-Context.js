import React, {useState, createContext} from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  /* let auth;
  auth.onAuthStateChanged(usr => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });
*/
  /*const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then(u => {
        setUser(u);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e);
      });
  };*/
  /*
  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      })
      .catch(error => alert(error.message));
  };*/

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
