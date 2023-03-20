import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { fileURLToPath, URL } from 'node:url'
import pkg from "./package.json";
// import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "blocknote-vue",
      fileName: "blocknote-vue",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: Object.keys({
        ...pkg.dependencies,
        ...pkg.peerDependencies,
        ...pkg.devDependencies,
      }),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "vue"
        },
        interop: "compat", // https://rollupjs.org/migration/#changed-defaults
      },
    },
  },
});
