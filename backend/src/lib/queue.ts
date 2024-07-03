import type { GenerateCodes } from "../types/queue";
import Queue from "bull";
import { generateCodeZipFileJob } from "./generator";
import { unlink } from "node:fs/promises";

// const uploadQueue = new Queue<GenerateCodes>("redis://127.0.0.1:6379");
const uploadQueue = new Queue<GenerateCodes>(process.env["REDIS_HOST"]!);

uploadQueue.on("on waiting", (jobId) => {
  console.log("WAITING", jobId);
});

uploadQueue.on("on active", (job, _jobPromise) => {
  console.log("ACTIVE", job.id);
});

uploadQueue.on("on completed", (job) => {
  console.log("COMPLETED", job.id);
});

uploadQueue.on("on error", (error) => {
  console.log("ERROR", error);
});

uploadQueue.on("on failed", (job, error) => {
  console.log("FAILED", job.id, error);
});

uploadQueue.process("generate-codes", async (job) => {
  // ottieni path dal job
  const path = job.data.path;
  // caricare il file
  const file = Bun.file(path);
  // leggere il file
  const text = await file.text();

  const base64 = await generateCodeZipFileJob(text, job);

  // cancellare il file temporaneo
  await unlink(path);

  return Promise.resolve(base64);
});

export default uploadQueue;
