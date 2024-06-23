import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { uploadRoute } from "./routes/upload";

const app = new Hono();

app.use("*", logger());

app.route("/api/upload", uploadRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
