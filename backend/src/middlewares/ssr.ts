import { createMiddleware } from "hono/factory";
import { render } from "../../../frontend/dist/server/entry-server";

export const ssr = () => {
  return createMiddleware(async (c, next) => {
    const accept = c.req.header("accept");
    if (accept && accept.includes("text/html")) {
      const templateHtml = await Bun.file(
        "./frontend/dist/client/index.html"
      ).text();
      const rendered = await render(c.req.path);
      const html = templateHtml.replace("<!--app-html-->", rendered.html);
      return c.html(html);
    }
    return await next();
  });
};
