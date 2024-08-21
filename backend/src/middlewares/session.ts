import { createMiddleware } from "hono/factory";
import { lucia } from "@/lib/lucia";

export const session = () => {
  return createMiddleware(async (c, next) => {
    const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");

    console.log("SESSION ID", sessionId);

    if (!sessionId) {
      c.set("user", null);
      c.set("session", null);
      return await next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      c.header(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize(),
        {
          append: true,
        }
      );
    }
    if (!session) {
      c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
        append: true,
      });
    }
    c.set("session", session);
    c.set("user", user);
    await next();
  });
};
