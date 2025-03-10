import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  root: "apps/remote-app",
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      // react: require.resolve('react'),
      // 'react-dom': require.resolve('react-dom'),
    },
  },
  plugins: [
    react(),
    federation({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./RemoteComponent": path.resolve(__dirname,"src/RemoteComponent")
      },
      shared: {}
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    sourcemap: true,
    outDir: path.resolve(__dirname, "../../dist/apps/remote-app"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.tsx"),
    },
  },
  // build: {
  //   target: "esnext",
  //   minify: false,
  //   sourcemap: true,
  //   outDir: path.resolve(__dirname, "../../dist/apps/remote-app"),
  //   emptyOutDir: true,
  //   assetsDir: "", // ✅ Prevents nested 'assets/assets/' issue
  //   rollupOptions: {
  //     // ❌ REMOVE `input` (not needed for module federation)
  //   },
  // },
  // build: {
  //   target: "esnext",
  //   minify: false,
  //   sourcemap: true,
  //   outDir: path.resolve(__dirname, "../../dist/apps/remote-app"),
  //   emptyOutDir: true,
  //   assetsDir: "", // ✅ Stops nesting inside `assets/`
  //   rollupOptions: {
  //     input: path.resolve(__dirname, "src/main.tsx"),
  //     output: {
  //       format: "esm", // ✅ Ensure proper module output
  //       entryFileNames: "remoteEntry.js", // ✅ Forces `remoteEntry.js` to be at root
  //       chunkFileNames: "chunks/[name]-[hash].js",
  //       assetFileNames: (assetInfo) => {
  //         return assetInfo.name === "remoteEntry.js" ? "[name].js" : "assets/[name]-[hash][extname]";
  //       },
  //     },
  //   },
  // },
  // build: {
  //   target: "esnext",
  //   minify: false,
  //   sourcemap: true,
  //   outDir: path.resolve(__dirname, "../../dist/apps/remote-app"), // ✅ Ensure it's correct
  //   emptyOutDir: true,
  //   assetsDir: "", // ✅ Prevents unnecessary `assets/` nesting
  //   rollupOptions: {
  //     output: {
  //       format: "esm", // ✅ Ensure correct module format
  //       entryFileNames: "remoteEntry.js", // ✅ Ensures `remoteEntry.js` is at the root
  //       chunkFileNames: "chunks/[name]-[hash].js",
  //       assetFileNames: "assets/[name]-[hash][extname]", // ✅ Ensures correct assets output
  //     },
  //   },
  // },
  server: {
    port: 5174,
    cors: true,
    fs: { allow: ["."] },
    // cors: {
    //   origin: 'http://localhost:5173', // Allow requests from the host app
    //   methods: ['GET', 'OPTIONS'], // Allow required HTTP methods
    // },
  },
  preview: { port: 5175 },
});
