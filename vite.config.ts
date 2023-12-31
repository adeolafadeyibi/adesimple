import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: "/src/components",
      },
      {
        find: "@assets",
        replacement: "/src/assets",
      },
      {
        find: "@definedTypes",
        replacement: "/src/types",
      },
      {
        find: "@src",
        replacement: "/src",
      },
    ],
  },
});
