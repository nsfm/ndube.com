import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { SolarSystem } from "./SolarSystem";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SolarSystem />
  </React.StrictMode>
);

reportWebVitals(console.log);
