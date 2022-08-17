import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  //stores data about appliances for calculator
  const [savedData, setSavedData] = useState(null);
  //stores user location
  const [location, setLocation] = useState(null);
  //to trigger useEffect and send user email
  const { user, isAuthenticated } = useAuth0();

  // adds new User to DB
  useEffect(() => {
    fetch("/addUser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [isAuthenticated]);

  // get saved items if logged-in
  useEffect(() => {
    fetch(`/getUser/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("items", JSON.stringify(data.data.savedItems));
        setSavedData(data.data.savedItems);
        setLocation(data.data.location);
      });
  }, [isAuthenticated]);

  return (
    <UserDataContext.Provider
      value={{
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
