import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages project sites the app is served from /<repo>/.
// Set base to the repo name in production; use '/' in dev.
// Override with the VITE_BASE env var if the repo name differs.
export default defineConfig(({ command }) => ({
  base: command === "build" ? process.env.VITE_BASE || "/verge_wellness/" : "/",
  plugins: [react()],
}));
