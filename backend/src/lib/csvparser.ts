import parse from "csv-simple-parser";

export const parseCSV = async (file: File) => {
  const csv = await file.text();
  return parse(csv, { header: true }) as Record<string, string>[];
};

export const rowToBase64 = (
  row: Record<string, string>,
  id?: number
): string => {
  // add id to row (if exists)
  if (id) row["_id"] = id.toString();

  // add provider to row
  row["_provider"] = "gateqr";

  return Buffer.from(JSON.stringify(row)).toString("base64");
};

export const decodeBase64 = (base64: string): Record<string, string> => {
  return JSON.parse(Buffer.from(base64, "base64").toString());
};
