import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  root: "apps/host-app",
  resolve: {
    alias: {
      // react: require.resolve('react'),
      // 'react-dom': require.resolve('react-dom'),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  plugins: [
    react(),
    federation({
      name: "hostApp",
      remotes: {
        remoteApp: "http://localhost:5175/assets/remoteEntry.js",
      },
      shared: {}
      // remotes: {
      //   remoteApp: "remoteApp@http://localhost:5174/remoteEntry.js",
      // },      
    }),
  ],
  build: {
    target: "esnext",
    outDir: "../../../dist/apps/host-app",
    emptyOutDir: true,
    rollupOptions: {
      input: "apps/host-app/index.html",
    },
  },
  server: {
    port: 5173,
  },
});
