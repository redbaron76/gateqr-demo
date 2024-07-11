import { downloadRoute, signupRoute, uploadRoute } from "./routes";

import type { Context } from "@/types/env";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
// import downloadRoute from "./routes/download";
// import { createBunWebSocket } from "hono/bun";
import { logger } from "hono/logger";
import { lucia } from "@/lib/lucia";
import { serveStatic } from "hono/bun";
// import signupRoute from "./routes/signup";
// import uploadRoute from "./routes/upload";
import { verifyRequestOrigin } from "lucia";

// const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono<Context>();

app.use("*", logger());
app.use(csrf());

app.use("*", async (c, next) => {
  if (c.req.method === "GET") {
    return next();
  }
  const originHeader = c.req.header("Origin") ?? null;
  const hostHeader = c.req.header("Host") ?? null;
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return c.body(null, 403);
  }
  return next();
});

app.use("*", async (c, next) => {
  const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");

  console.log("SESSION ID", sessionId);

  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }
  c.set("session", session);
  c.set("user", user);
  return next();
});

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

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;

export type ApiRoutes = typeof apiRoutes;
