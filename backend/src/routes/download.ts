import { Hono } from "hono";

export const downloadRoute = new Hono()
  // Riceve richiesta del file sample
  .get("/", async (c) => {
    const file = Bun.file("./backend/assets/sample.csv");
    const buffer = await file.arrayBuffer();

    return c.body(buffer);
  });
