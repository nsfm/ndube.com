import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { SolarSystem } from "./SolarSystem";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("No root element");
} else {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <SolarSystem />
    </React.StrictMode>
  );
}

reportWebVitals(console.log);
