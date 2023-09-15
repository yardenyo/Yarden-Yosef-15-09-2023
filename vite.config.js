import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      img: path.resolve(__dirname, "./public/img"),
    },
  },
  build: {
    sourcemap: false,
    minify: true,
    assetsDir: "chunks",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";@import "@/assets/scss/main.scss"; @import "@/assets/scss/abstracts/colors.scss"; @import "@/assets/scss/variables.scss";`,
      },
    },
  },
});
