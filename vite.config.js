import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const buildId =
  process.env.GITHUB_SHA?.slice(0, 7) ||
  process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ||
  new Date().toISOString().slice(0, 10);

// Relative assets work on both hakanyemcilik.com (root) and github.io/hakanyemcilik/.
export default defineConfig({
  base: "./",
  plugins: [react()],
  define: {
    __APP_BUILD_ID__: JSON.stringify(buildId)
  }
});
