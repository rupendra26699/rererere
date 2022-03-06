
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// The following file will be the tailwind configuration file
import "./index.css";

import { Provider } from "react-redux";

import newStore from "./redux/store/store";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={newStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
