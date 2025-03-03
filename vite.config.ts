import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import axios from "axios";
import type { IncomingMessage, ServerResponse } from "http";

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

            if (url === "/" || url === "/test") {
              try {
                const response = await axios.get("https://www.google.com");
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
