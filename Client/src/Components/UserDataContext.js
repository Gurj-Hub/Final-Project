import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [storedItems, setStoredItems] = useState(null);
  //checking if somebody is logged in with localStorage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        storedItems,
        setStoredItems,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
