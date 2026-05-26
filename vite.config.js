import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Custom domain serves from root path.
  base: "/",
  plugins: [react()]
});
