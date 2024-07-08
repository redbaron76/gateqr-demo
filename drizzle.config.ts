import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./backend/src/db/schema.ts",
  out: "./backend/drizzle",
  dbCredentials: {
    url: "./backend/src/db/sqlite.db",
  },
});
