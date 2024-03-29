import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  // zod.html and valibot.html
  build: {
    rollupOptions: {
      input: {
        zod: "zod.html",
        valibot: "valibot.html",
      },
    },
  },
});
