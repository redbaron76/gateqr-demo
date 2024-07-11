import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./backend/src/db/schema.ts",
  out: "./backend/src/db/drizzle",
  dbCredentials: {
    url: "./sqlite.db",
  },
});
