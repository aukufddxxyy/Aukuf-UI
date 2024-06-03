import { resolve } from "path";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";

import { IS_DEV, IS_PROD, IS_TEST } from "./consts";
import { moveEsStyles, getDirectoriesSync } from "./utils";
import hooksPlugin from "./hooksPlugin";

export default defineConfig({
  plugins: [
    vue(),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveEsStyles,
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
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveEsStyles,
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
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    sourcemap: !IS_PROD,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "AukufUI",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@popperjs/core",
        "async-validator",
        "@iconify/vue",
        "@iconify-json/mdi",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          ) {
            return "utils";
          }
          for (const compName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${compName}`)) {
              return compName;
            }
          }
        },
      },
    },
  },
});
