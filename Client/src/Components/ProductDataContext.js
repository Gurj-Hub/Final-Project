import { createContext, useEffect, useState } from "react";

export const ProducDataContext = createContext(null);

export const ProducDataProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);
  const [costPerKWH, setCostPerKWH] = useState(null);
  const [incentives, setIncentives] = useState(null);
  const [panelData, setPanelData] = useState(null);
  const [monthlyConsumption, setMonthlyConsumption] = useState(null);

  //get all incentives
  useEffect(() => {
    fetch("/incentives")
      .then((res) => res.json())
      .then((data) => {
        setIncentives(data.data);
      });
  }, []);

  //get all household products
  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.data);
      });
  }, []);

  //get data on solar panels
  useEffect(() => {
    fetch("/solarPanelData")
      .then((res) => res.json())
      .then((data) => {
        setPanelData(data.data);
      });
  }, []);

  //get cost per KWH per region
  useEffect(() => {
    fetch("/costPerKWH")
      .then((res) => res.json())
      .then((data) => {
        setCostPerKWH(data.data);
      });
  }, []);

  //get monthly residential consumption for all regions
  useEffect(() => {
    fetch("//monthlyConsumption")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyConsumption(data.data);
      });
  }, []);

  return (
    <ItemsDataContext.Provider
      value={{
        allProducts,
        setAllProducts,
        costPerKWH,
        setCostPerKWH,
        incentives,
        setIncentives,
        panelData,
        setPanelData,
        monthlyConsumption,
        setMonthlyConsumption,
      }}
    >
      {children}
    </ItemsDataContext.Provider>
  );
};
