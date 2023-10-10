import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import AuthProvider from "./context/auth/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import StateContext from "./context/state";
import JobContext from "./context/stateJob";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthProvider>
        <StateContext>
          <JobContext>
            <App />
          </JobContext>
        </StateContext>
      </AuthProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
