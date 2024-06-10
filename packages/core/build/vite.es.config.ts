import { resolve } from "path";
import { defineConfig } from "vite";
import { includes } from "lodash-es";

import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";

import hooksPlugin from "./hooksPlugin";
import { IS_DEV, IS_PROD, IS_TEST } from "./consts";
import { moveEsStyles, getDirectoriesSync } from "./utils";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    terser({
      compress: {
        sequences: IS_PROD,
        arguments: IS_PROD,
        drop_console: IS_PROD && ["log"],
        drop_debugger: IS_PROD,
        passes: IS_PROD ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(IS_DEV),
          "@PROD": JSON.stringify(IS_PROD),
          "@TEST": JSON.stringify(IS_TEST),
        },
      },
      format: {
        semicolons: false,
        shorthand: IS_PROD,
        braces: !IS_PROD,
        beautify: !IS_PROD,
        comments: !IS_PROD,
      },
      mangle: {
        toplevel: IS_PROD,
        eval: IS_PROD,
        keep_classnames: IS_DEV,
        keep_fnames: IS_DEV,
      },
    }),
    hooksPlugin({
      rmFiles: [
        "./dist/es",
        "./dist/theme",
        "./dist/types",
        "./dist/stats.es.html",
      ],
      afterBuild: moveEsStyles,
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    sourcemap: !IS_PROD,
    lib: {
      entry: resolve(__dirname, "../index.ts"),
      name: "AukufUI",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@iconify/vue",
        "@iconify-json/mdi",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          if (
            chunkInfo.type === "asset" &&
            /\.(css)$/i.test(chunkInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) {
            return "vendor";
          }
          if (includes(id, "/packages/hooks")) {
            return "hooks";
          }
          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          ) {
            return "utils";
          }
          for (const compName of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${compName}`)) {
              return compName;
            }
          }
        },
      },
    },
  },
});
