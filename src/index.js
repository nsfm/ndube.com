import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SolarSystem from "./SolarSystem";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <SolarSystem />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
