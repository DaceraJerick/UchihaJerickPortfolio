import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  // Set BASE_PATH (e.g. "/UchihaJerickPortfolio/") when hosting under a sub-path, like GitHub Pages.
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    tanstackRouter(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
