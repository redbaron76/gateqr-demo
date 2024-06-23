import { parseCSV, rowToBase64 } from "./csvparser";

import JSZip from "jszip";
import { generateVectorQRCode } from "./qrcode";

export const generateZipFile = async (file: File) => {
  const csv = await parseCSV(file);

  const zip = new JSZip();

  let i = 1;

  for (const row of csv) {
    const code = rowToBase64(row);
    const qrcode = await generateVectorQRCode(code, "svg");
    zip.file(`code-${i}.svg`, qrcode);
    i++;
  }

  const buffer = await zip.generateAsync({ type: "arraybuffer" });

  return buffer;
};
