// import downloadRoute from "@/routes/download";
// import signupRoute from "@/routes/signup";
// import uploadRoute from "@/routes/upload";

import { downloadRoute, signupRoute, uploadRoute } from "@/routes";

import { type Context } from "@/types/env";
import { Hono } from "hono";

import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

// import { createBunWebSocket } from "hono/bun";
// const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono<Context>();

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/download", downloadRoute)
  .route("/signup", signupRoute)
  .route("/upload", uploadRoute);

// app.get("/test", (c) => {
//   return c.json({ message: "Hello, World!" });
// });

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

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;

export type ApiRoutes = typeof apiRoutes;
