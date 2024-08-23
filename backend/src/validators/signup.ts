import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "email" }),
  password: z.string().min(8, { message: "password" }),
});

export type SignupForm = z.infer<typeof signupSchema>;
