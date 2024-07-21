import { getErrorMessage, log } from "@/libs/utils";

import type { Context } from "@/types/env";
import { Hono } from "hono";
import { db } from "@/drizzle/db";
import { generateId } from "lucia";
import { hash } from "@node-rs/argon2";
import { lucia } from "@/libs/lucia";
import { signupSchema } from "@/validators/signup";
import { users } from "@/drizzle/schema";
import { zValidator } from "@hono/zod-validator";

const signupRoute = new Hono<Context>()
  .get("/", async (c) => {
    const session = c.get("session");
    if (session) return c.redirect("/");
  })
  .post(
    "/",
    zValidator("json", signupSchema, (result, c) => {
      if (!result.success) {
        log(result.error, "Body ERROR");
        const errors = result.error.errors.map((e) => e.message);
        return c.json({ success: result.success, message: errors[0] }, 400);
      }
    }),
    async (c) => {
      const body = c.req.valid("json");
      const { email, password } = body;

      log(email, password, "SERVER");

      try {
        const password_hash = await hash(password, {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1,
        });

        const userId = generateId(15);

        const newUser = await db
          .insert(users)
          .values({
            id: userId,
            email,
            password_hash,
          })
          .returning();

        log(newUser, "NEW USER");

        const session = await lucia.createSession(userId, {});
        c.header(
          "Set-Cookie",
          lucia.createSessionCookie(session.id).serialize(),
          {
            append: true,
          }
        );

        log(session, "SESSION CREATED");

        return c.json({ success: true, redirect: "/" });
      } catch (error) {
        const message = getErrorMessage(error);
        return c.json({ success: false, message }, 500);
      }
    }
  );

export default signupRoute;
