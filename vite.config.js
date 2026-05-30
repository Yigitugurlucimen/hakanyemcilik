import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative assets work on both hakanyemcilik.com (root) and github.io/hakanyemcilik/.
export default defineConfig({
  base: "./",
  plugins: [react()]
});
