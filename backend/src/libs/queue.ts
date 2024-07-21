import type { GenerateCodes } from "@/types/queue";
import Queue from "bull";
import { generateCodeZipFileJob } from "@/libs/generator";
import { log } from "@/libs/utils";
import { unlink } from "node:fs/promises";

log(process.env["REDIS_HOST"], "REDIS_HOST");
log(process.env["REDIS_PORT"], "REDIS_PORT");

// const uploadQueue = new Queue<GenerateCodes>("redis://127.0.0.1:6379");
const uploadQueue = new Queue<GenerateCodes>(
  "gate-qr",
  `redis://${process.env["REDIS_HOST"]}:${process.env["REDIS_PORT"]}`
);

uploadQueue.on("waiting", (jobId) => {
  log(jobId, "WAITING");
});

uploadQueue.on("active", (job, _jobPromise) => {
  log(job.id, "ACTIVE");
});

uploadQueue.on("completed", (job) => {
  log(job.id, "COMPLETED");
});

uploadQueue.on("error", (error) => {
  log(error, "ERROR");
});

uploadQueue.on("failed", (job, error) => {
  log(job.id, error, "FAILED");
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
