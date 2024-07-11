import type { Context } from "@/types/env";
import { Hono } from "hono";

const downloadRoute = new Hono<Context>()
  // Riceve richiesta del file sample
  .get("/", async (c) => {
    const file = Bun.file("./backend/assets/sample.csv");
    const buffer = await file.arrayBuffer();

    return c.body(buffer);
  });

export default downloadRoute;
