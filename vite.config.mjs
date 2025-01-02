import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: "./src",
  base: './',
  build: {
    target: "es2016",
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "localhost",
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    viteStaticCopy({
      targets: [
        {
          src: './**/*.!(js|ts|tsx|css|module.css|d.ts|html|svg)',
          dest: ''
        }
      ]
    })
  ],
});
