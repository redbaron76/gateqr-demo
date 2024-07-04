import app from "@/app";

const server = Bun.serve({
  hostname: "0.0.0.0",
  // websocket,
  port: 3000,
  fetch: app.fetch,
});

console.log(`Server '${server.hostname}' started on port ${server.port}`);
