import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [vike(), react({}), tailwindcss()],
  server: {
    cors: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://ficrec-api.vercel.app/v1/',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      }
    },
  },
  build: {
    target: "es2022",
  },
});