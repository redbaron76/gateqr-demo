import type { ApiRoutes } from "@backend/src/app.ts";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;
