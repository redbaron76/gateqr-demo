import * as schema from "@/db/schema";

import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("sqlite.db");

export const db = drizzle(sqlite, { schema });
