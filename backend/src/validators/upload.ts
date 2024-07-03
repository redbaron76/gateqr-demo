import { parseCSV } from "../lib/csvparser";
import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ["text/csv"];

export const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, "File must be less than 1MB in size")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be of type *.csv")
    .refine(async (file) => {
      const csvObj = await parseCSV(file);
      const row = csvObj[0];
      const values = Object.values(row);
      return values.length <= 4;
    }, "Use a *.csv file with max 4 columns"),
});
