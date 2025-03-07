import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

// const GOOGLE_ID = "140642245714-gq4u26009jl16rn8b8n9pm4330gs6jae.apps.googleusercontent.com";
// 
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <React.StrictMode>
      <Toaster /> 
        <App />
      </React.StrictMode>
    </Provider>
  );
}
