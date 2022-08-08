import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ProductDataProvider } from "./Components/ProductDataContext";
import { UserDataProvider } from "./Components/UserDataContext";

ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <ProductDataProvider>
        <App />
      </ProductDataProvider>
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
