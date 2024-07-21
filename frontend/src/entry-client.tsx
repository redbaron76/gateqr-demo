import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter } from "./router";

const router = createRouter();

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);
