import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)) },
      { find: '@cmp', replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/shared/stores', import.meta.url)) },
      { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    ],
  },
});
