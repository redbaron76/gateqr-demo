import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveAs = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  if (filename.includes(".")) {
    a.type = `application/${filename.split(".").pop()}`;
  }
  a.click();
  URL.revokeObjectURL(url);
};

export const tsToDate = (timestamp: string) => {
  const ts = parseInt(timestamp);
  const d = dayjs(ts);

  return d.format("DD/MM HH:mm:ss");
};

export const log = (...args: unknown[]) =>
  import.meta.env.MODE !== "production" && console.log(...args);

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
