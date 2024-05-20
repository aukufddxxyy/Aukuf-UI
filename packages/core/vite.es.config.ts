import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const COMP_NAMES = ["Alter", "Button", "Icon"] as const;

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "AukufUI",
      fileName: "aukuf-ui",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@popperjs/core",
        "@iconify/vue",
        "@iconify-json/mdi",
        "async-validator",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils")) {
            return "utils";
          }
          for (const compName of COMP_NAMES) {
            if (id.includes(`/packages/components/${compName}`)) {
              return compName;
            }
          }
        },
      },
    },
  },
});
