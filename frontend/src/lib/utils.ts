import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  const d = new Date(ts);
  let month: string | number = d.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${d.getMinutes()}`;
};
