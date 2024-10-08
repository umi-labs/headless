/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { glob } from "glob";
import { relative, extname } from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Optionally, add global styles or variables if needed
        additionalData: `@import "./src/global.css";`, // Adjust if necessary
      },
    },
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "ui",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: [
              "src/**/*.d.ts",
              "src/**/__docs__/**",
              "src/**/__test__/**",
            ],
          })
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [dts()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
