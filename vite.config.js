import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBase =
  process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : null;

// Local + custom domain: "/". GitHub Pages project URL: "/hakanyemcilik/".
// Override anytime with VITE_BASE_PATH (e.g. "/" when only custom domain is used).
const base = process.env.VITE_BASE_PATH ?? githubPagesBase ?? "/";

export default defineConfig({
  base,
  plugins: [react()]
});
