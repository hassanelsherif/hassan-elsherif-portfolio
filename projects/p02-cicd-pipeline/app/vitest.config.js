import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  css: {
    postcss: {}, // empty — prevents Vite crawling up to root postcss.config.js
  },
  test: {
    environment: "node",
    globals: true,
    root: path.resolve(__dirname),
  },
});
