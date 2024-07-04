import type { GenerateCodes } from "@/types/queue";
import Queue from "bull";
import { generateCodeZipFileJob } from "@/lib/generator";
import { unlink } from "node:fs/promises";

console.log("REDIS_HOST", process.env["REDIS_HOST"]);
console.log("REDIS_PORT", process.env["REDIS_PORT"]);

// const uploadQueue = new Queue<GenerateCodes>("redis://127.0.0.1:6379");
const uploadQueue = new Queue<GenerateCodes>(
  "gate-qr",
  `redis://${process.env["REDIS_HOST"]}:${process.env["REDIS_PORT"]}`
);

uploadQueue.on("waiting", (jobId) => {
  console.log("WAITING", jobId);
});

uploadQueue.on("active", (job, _jobPromise) => {
  console.log("ACTIVE", job.id);
});

uploadQueue.on("completed", (job) => {
  console.log("COMPLETED", job.id);
});

uploadQueue.on("error", (error) => {
  console.log("ERROR", error);
});

uploadQueue.on("failed", (job, error) => {
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
