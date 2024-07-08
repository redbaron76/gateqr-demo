import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
});

export const session = sqliteTable("session", {
  id: integer("id").primaryKey(),
  expires_at: integer("expires_at").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
}); */

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  email: text("email"),
  password: text("password"),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});
