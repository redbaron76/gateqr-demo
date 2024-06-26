import { Hono } from "hono";
import { downloadRoute } from "./routes/download";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { uploadRoute } from "./routes/upload";

const app = new Hono();

app.use("*", logger());

app.route("/api/download", downloadRoute);
app.route("/api/upload", uploadRoute);

app.get("/test", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
