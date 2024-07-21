import App from "./App";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { createMemoryHistory } from "@tanstack/react-router";
import { createRouter } from "./router";

export async function render(path: string) {
  const router = createRouter();

  const memoryHistory = createMemoryHistory({
    initialEntries: [path],
  });

  router.update({
    history: memoryHistory,
  });

  await router.load();

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App router={router} />
    </React.StrictMode>
  );

  return { html };
}
