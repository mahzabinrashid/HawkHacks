import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, RequiredAuthProvider } from "@propelauth/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authUrl={process.env.REACT_APP_AUTH_URL}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
