import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/handlers/ingest.ts",
    "src/handlers/process.ts",
    "src/handlers/store.ts",
    "src/handlers/notify.ts",
  ],
  format: ["esm"],
  target: "node22",
  outDir: "dist",
  clean: true,
  splitting: false,
  sourcemap: true,
});
