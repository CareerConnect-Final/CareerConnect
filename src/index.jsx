import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AuthProvider from "./context/auth/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import StateContext  from "./context/state";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      {/* <AuthContextProvider> */}
       <AuthProvider>
       <StateContext> <App /></StateContext>
       </AuthProvider>
       
      {/* </AuthContextProvider> */}
      {/* <AuthProvider>
        <App />
      </AuthProvider> */}
    </DarkModeContextProvider>
  </React.StrictMode>
);
