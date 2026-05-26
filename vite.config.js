import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use repository path on GitHub Pages, root path locally.
  base: process.env.GITHUB_ACTIONS ? "/hakanyemcilik/" : "/",
  plugins: [react()]
});
