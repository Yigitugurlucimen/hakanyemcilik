import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const buildId =
  process.env.GITHUB_SHA?.slice(0, 7) ||
  process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ||
  new Date().toISOString().slice(0, 10);

/** Relative "./" breaks deep links (/panel/login). Use absolute base per host. */
const resolveBase = () => {
  if (process.env.VITE_BASE_PATH) return process.env.VITE_BASE_PATH;
  if (process.env.CF_PAGES === "1") return "/";
  if (process.env.GITHUB_ACTIONS === "true") return "/hakanyemcilik/";
  return "/";
};

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  define: {
    __APP_BUILD_ID__: JSON.stringify(buildId)
  }
});
