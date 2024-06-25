import { Hono } from "hono";
import { generateZipFile } from "../lib/generator";
import { uploadSchema } from "../validators/upload";
import { zValidator } from "@hono/zod-validator";

export const uploadRoute = new Hono()
  .get("/", (c) => {
    return c.json({ message: "GET: /upload" });
  })
  .post(
    "/",
    zValidator("form", uploadSchema, (result, c) => {
      if (!result.success) {
        console.log("Body ERROR:", result.error);
        const errors = result.error.errors.map((e) => e.message);
        return c.json({ success: result.success, message: errors[0] }, 400);
      }
    }),
    async (c) => {
      const body = c.req.valid("form");
      const file = body["file"];

      const buffer = await generateZipFile(file);

      return c.body(buffer);
    }
  );
