import { createContext, useEffect, useState } from "react";

export const ProductDataContext = createContext(null);

export const ProductDataProvider = ({ children }) => {
  // sets state of header depending on session storage
  const headerState = sessionStorage.getItem("header");
  //stores all of the energy consuming products inside db
  const [allProducts, setAllProducts] = useState(null);
  //stores the cost per kWh per region in Canada
  const [costPerKWH, setCostPerKWH] = useState(null);
  //stores the incentives based on the region in Canada
  const [incentives, setIncentives] = useState(null);
  //stores info. about cost and panel production rate
  const [panelData, setPanelData] = useState(null);
  //stores the avg residential consumption based on region
  const [monthlyConsumption, setMonthlyConsumption] = useState(null);
  //store route to set proper header based on state
  const [header, setHeader] = useState(
    headerState === "Homepage" ? "Homepage" : "WHY"
  );
  //stores calculator kW/h/month for breakdown page
  const [monthlyKWH, setMonthlyKWH] = useState(0);

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
    fetch("/monthlyConsumption")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyConsumption(data.data);
      });
  }, []);

  return (
    <ProductDataContext.Provider
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
        header,
        setHeader,
        monthlyKWH,
        setMonthlyKWH,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};
