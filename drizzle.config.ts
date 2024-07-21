import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./backend/src/drizzle/schema.ts",
  out: "./backend/src/drizzle/migrations",
  dbCredentials: {
    url: "./sqlite.db",
  },
});
