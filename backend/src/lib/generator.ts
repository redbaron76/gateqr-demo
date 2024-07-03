import { generateImageQRCode, generateVectorQRCode } from "./qrcode";
import { parseCSV, parseTextCSV, rowToBase64 } from "./csvparser";

import type { GenerateCodes } from "../types/queue";
import JSZip from "jszip";
import Queue from "bull";

const addZero = (i: number) => (i < 10 ? `0${i}` : i);

export const writeFileToTempFolder = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const fileName = new Date().getTime();
  const tmpPath = `./backend/temp/${fileName}.csv`;
  await Bun.write(tmpPath, new Uint8Array(arrayBuffer));
  return tmpPath;
};

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

    return zipBuffer;
  } catch (error) {
    console.error("Error generating zip file:", error);
    return null;
  }
};

export const generateCodeZipFileJob = async (
  text: string,
  job: Queue.Job<GenerateCodes>
) => {
  try {
    // const csvObj = await parseCSV(file);
    const csvObj = await parseTextCSV(text);

    const zip = new JSZip();

    const license = Bun.file("./backend/assets/License.txt");

    const licenseText = await license.text();

    zip.file("License.txt", licenseText);

    const svgs = zip.folder("SVGs - printable");
    const pngs = zip.folder("PNGs - web");

    // init progress
    await job.progress(0);

    let i = 1;

    for (const row of csvObj) {
      const code = rowToBase64(row, i);
      const svgCode = await generateVectorQRCode(code, "svg");
      const pngCode = await generateImageQRCode(code, "png");

      // increment progress
      const progress = parseInt(String((i / csvObj.length) * 100));
      await job.progress(progress);

      // job.log(`Generating code ${i} of ${csvObj.length}`);

      // get keys from row
      const values = Object.values(row);

      // map keys to lowercase
      const val = values.map((value) => value.toLowerCase());

      const first = val[0].replace(/ /g, "_");
      const last = val[1].replace(/ /g, "_");

      // add file to svg folder
      if (svgs) svgs.file(`${addZero(i)}_${last}_${first}.svg`, svgCode);
      if (pngs) pngs.file(`${addZero(i)}_${last}_${first}.png`, pngCode);

      // wait 0.05 seconds
      await new Promise((resolve) => setTimeout(resolve, 50));

      i++;
    }

    const zipString = await zip.generateAsync({ type: "base64" });

    await job.progress(100);

    return zipString;
  } catch (error) {
    console.error("Error generating zip file:", error);
    return null;
  }
};
