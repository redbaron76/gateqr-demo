import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import { I18nextProvider } from "react-i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "./i18n";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);
