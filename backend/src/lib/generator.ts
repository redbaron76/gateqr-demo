import { parseCSV, rowToBase64 } from "./csvparser";

import JSZip from "jszip";
import { generateVectorQRCode } from "./qrcode";

const addZero = (i: number) => (i < 10 ? `0${i}` : i);

export const generateCodeZipFile = async (file: File) => {
  const csv = await parseCSV(file);

  const zip = new JSZip();

  let i = 1;

  for (const row of csv) {
    const code = rowToBase64(row, i);
    const qrcode = await generateVectorQRCode(code, "svg");

    // get keys from row
    const values = Object.values(row);

    // map keys to lowercase
    const val = values.map((value) => value.toLowerCase());

    const first = val[0].replace(/ /g, "_");
    const last = val[1].replace(/ /g, "_");

    // add file to zip
    zip.file(`${addZero(i)}_${last}_${first}.svg`, qrcode);

    // increment i
    i++;
  }

  const buffer = await zip.generateAsync({ type: "arraybuffer" });

  return buffer;
};
