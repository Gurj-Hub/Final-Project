import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ProductDataProvider } from "./Components/ProductDataContext";
import { UserDataProvider } from "./Components/UserDataContext";
import { Auth0Provider } from "@auth0/auth0-react";

console.log(process.env.REACT_APP_DOMAIN);
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <UserDataProvider>
        <ProductDataProvider>
          <App />
        </ProductDataProvider>
      </UserDataProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
