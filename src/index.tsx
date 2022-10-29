import React from "react";
import ReactDOM from "react-dom/client";

import SolarSystem from "./SolarSystem";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SolarSystem />
  </React.StrictMode>,
);

reportWebVitals(console.log);

