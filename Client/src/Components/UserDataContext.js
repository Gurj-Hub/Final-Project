import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  //stores data about appliances for calculator
  const [savedData, setSavedData] = useState(null);
  //stores user location
  const [location, setLocation] = useState(null);

  //checking if somebody is logged in with localStorage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      setLoggedIn(true);
    }
  }, []);

  //get saved items if logged in ---- needs an endpoint
  // useEffect(() => {
  //   fetch("/monthlyConsumption")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSavedData(data.data);
  //     });
  // }, []);

  return (
    <UserDataContext.Provider
      value={{
        loggedIn,
        savedData,
        setSavedData,
        location,
        setLocation,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
