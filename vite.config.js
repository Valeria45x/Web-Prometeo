import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Web-Prometeo/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor estable en su propio chunk: mejor cache entre despliegues.
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
}));
