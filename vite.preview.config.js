/**
 * Build config for the standalone `preview.html`.
 *
 * Differs from vite.config.js in three ways, all so the output can collapse into
 * one double-clickable file:
 *
 *   assetsInlineLimit  every asset becomes a data: URI instead of a sibling file
 *   cssCodeSplit       one stylesheet, so there is a single <style> to inline
 *   format: "iife"     a classic script — inline ES modules are unreliable from
 *                      file://, which is exactly how this file gets opened
 *
 * Run via `npm run build:preview`, which then assembles the single file with
 * scripts/build-preview.mjs. Output dir is throwaway.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-preview",
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "bundle.js",
        assetFileNames: "bundle[extname]",
      },
    },
  },
});
