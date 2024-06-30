import { generateImageQRCode, generateVectorQRCode } from "./qrcode";
import { parseCSV, rowToBase64 } from "./csvparser";

import JSZip from "jszip";

const addZero = (i: number) => (i < 10 ? `0${i}` : i);

export const generateCodeZipFile = async (file: File) => {
  try {
    const csvObj = await parseCSV(file);

    const zip = new JSZip();

    const license = Bun.file("./backend/assets/License.txt");

    const licenseText = await license.text();

    zip.file("License.txt", licenseText);

    const svgs = zip.folder("SVGs - printable");
    const pngs = zip.folder("PNGs - web");

    let i = 1;

    for (const row of csvObj) {
      const code = rowToBase64(row, i);
      const svgCode = await generateVectorQRCode(code, "svg");
      const pngCode = await generateImageQRCode(code, "png");

      // get keys from row
      const values = Object.values(row);

      // map keys to lowercase
      const val = values.map((value) => value.toLowerCase());

      const first = val[0].replace(/ /g, "_");
      const last = val[1].replace(/ /g, "_");

      // add file to svg folder
      if (svgs) svgs.file(`${addZero(i)}_${last}_${first}.svg`, svgCode);
      if (pngs) pngs.file(`${addZero(i)}_${last}_${first}.png`, pngCode);

      // increment i
      i++;
    }

    const zipBuffer = await zip.generateAsync({ type: "arraybuffer" });

    console.log("zipBuffer", zipBuffer);

    return zipBuffer;
  } catch (error) {
    console.error("Error generating zip file:", error);
    return null;
  }
};
