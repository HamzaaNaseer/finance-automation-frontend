import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

//Alert imports
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
