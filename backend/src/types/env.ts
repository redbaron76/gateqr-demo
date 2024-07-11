import type { Session, User } from "lucia";

import type { Env } from "hono";

export interface Context extends Env {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}
