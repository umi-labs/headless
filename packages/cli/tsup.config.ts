// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'], // Specify your entry file
    format: ['cjs', 'esm'], // CommonJS format for Node.js
    target: 'node16', // Target Node.js version
    outDir: 'dist', // Output directory
    shims: true, // Includes node shims
    clean: true, // Clean the output directory before each build
    dts: true, // Generate .d.ts files for TypeScript
    minify: false, // Optional: Minify the output
    sourcemap: true, // Optional: Generate source maps
    esbuildOptions: (options) => {
        options.banner = {
            js: '#!/usr/bin/env node', // Add shebang for CLI
        };
    },
});
