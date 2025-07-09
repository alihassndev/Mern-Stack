// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react({
//       jsxImportSource: "@welldone-software/why-did-you-render", // Optional for debugging
//     }),
//   ],
//   define: {
//     // Add these to suppress React Router warnings
//     "process.env.REACT_APP_FUTURE_ROUTER": "false",
//     "process.env.REACT_APP_V7_RELATIVE_SPLAT_PATH": "false",
//     "process.env.REACT_APP_V7_START_TRANSITION": "false",
//   },
// });

// ============================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
  },
});
