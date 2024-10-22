// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "node20",
  outDir: "dist",
  shims: true,
  external: ["fs-extra"],
  clean: true,
  dts: true,
  minify: false,
  sourcemap: true,
  esbuildOptions: (options) => {
    options.banner = {
      js: "#!/usr/bin/env node",
    };
  },
});
