import { Hono } from "hono";
import type { JobStatus } from "bull";
import uploadQueue from "../lib/queue";
import { uploadSchema } from "../validators/upload";
import { writeFileToTempFolder } from "../lib/generator";
import { zValidator } from "@hono/zod-validator";

export const uploadRoute = new Hono()
  // RICEVE csv dalla Dropzone
  .post(
    "/",
    zValidator("form", uploadSchema, (result, c) => {
      if (!result.success) {
        console.log("Body ERROR:", result.error);
        const errors = result.error.errors.map((e) => e.message);
        return c.json({ success: result.success, message: errors[0] }, 400);
      }
    }),
    async (c) => {
      const body = c.req.valid("form");
      const file = body["file"];

      // Scrive il file temporaneo
      const tmpPath = await writeFileToTempFolder(file);

      // Aggiunge il job alla coda
      const job = await uploadQueue.add("generate-codes", { path: tmpPath });
      const state = await job.getState();

      console.log("Job added", job.id);
      console.log("Job state", state);

      // Ritorna il job id
      return c.json({ state, jobId: job.id });
    }
  )
  .get("/job/:id", async (c) => {
    const { id } = c.req.param();

    // Ottiene il job dalla coda
    const job = await uploadQueue.getJob(id);

    if (!job) {
      return c.json({ success: false, message: "Job not found" }, 404);
    }

    const state = (await job.getState()) as JobStatus;
    // console.log("Job state", state);
    const progress = (await job.progress()) as number;
    // console.log("Job progress", progress);

    let base64Data = "";

    if (state === "completed") {
      base64Data = (await job.finished()) as string;
      // console.log("Job base64Data", base64Data?.length);
    }

    return c.json({ state, progress, base64Data });
  });
