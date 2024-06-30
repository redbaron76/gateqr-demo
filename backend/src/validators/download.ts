import { z } from "zod";

const GuestSchema = z
  .object({
    _id: z.string(),
    _provider: z.string(),
    _checkTime: z.string(),
  })
  .catchall(z.string());

export const downloadSchema = z.object({
  // validate guests list
  guests: z.array(GuestSchema),
});
