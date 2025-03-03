import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import axios from "axios";
import type { IncomingMessage, ServerResponse } from "node:http";

function getRedirect(url: string) {
  if (url === '/') {
    return 'https://www.google.com'
  }
  if (url === '/test') {
    return 'https://www.youtube.com'
  }
  return ''
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "root-rewrite",
      configureServer(server) {
        server.middlewares.use(
          async (req: IncomingMessage, res: ServerResponse, next) => {
            const url = req.url || "";

            if (url !== "") {
              try {
                const response = await axios.get(getRedirect(url));
                res.setHeader("Content-Type", "text/html");
                res.end(response.data);
              } catch (error) {
                next(error);
              }
            } else {
              next();
            }
          }
        );
      },
    },
  ],
});
