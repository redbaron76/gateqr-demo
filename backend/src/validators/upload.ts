import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["text/csv"];

export const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, "File is too large")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File type is not accepted"),
});
