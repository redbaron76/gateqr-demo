import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { users } from "@/drizzle/schema";
import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      async (email) => {
        // const result = await db
        //   .select()
        //   .from(users)
        //   .where(eq(users.email, email));

        const res = await db.query.users.findFirst({
          columns: { email: true },
          where: eq(users.email, email),
        });

        // check if the email is already in the database
        // return result.length === 0;
        return !res;
      },
      {
        message: "emailAlreadyExists",
      }
    ),
  password: z.string().min(8),
});

export type Signup = z.infer<typeof signupSchema>;
