import { resolve } from "path";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";

import hooksPlugin from "./hooksPlugin";
import { moveUmdStyles } from "./utils";
import { IS_DEV, IS_PROD, IS_TEST } from "./consts";

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooksPlugin({
      // rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveUmdStyles,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(IS_DEV),
          "@PROD": JSON.stringify(IS_PROD),
          "@TEST": JSON.stringify(IS_TEST),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "AukufUI",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});
