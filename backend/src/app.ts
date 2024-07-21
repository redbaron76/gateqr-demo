import { downloadRoute, signupRoute, uploadRoute } from "./routes";

import type { Context } from "@/types/env";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { session } from "@/middlewares/session";
import { ssr } from "./middlewares/ssr";

// import { createBunWebSocket } from "hono/bun";
// const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono<Context>();

app.use("*", logger());
app.use(csrf());

app.use(session());

app.use(ssr());

const apiRoutes = app
  .basePath("/api")
  .route("/download", downloadRoute)
  .route("/signup", signupRoute)
  .route("/upload", uploadRoute);

/* app.get(
  "/ws",
  upgradeWebSocket((_c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  })
); */

// app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ root: "./frontend/dist/client" }));
// app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));
app.get("*", serveStatic({ path: "./frontend/dist/client/index.html" }));

export default app;

export type ApiRoutes = typeof apiRoutes;
