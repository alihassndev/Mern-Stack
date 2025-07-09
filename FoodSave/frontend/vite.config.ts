import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    EnvironmentPlugin(["VITE_API_URL", "VITE_NODE_ENV"]), // Correct plugin usage
  ],
});
