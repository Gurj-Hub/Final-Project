import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ProductDataProvider } from "./Components/ProductDataContext";

ReactDOM.render(
  <React.StrictMode>
    <ProductDataProvider>
      <App />
    </ProductDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
