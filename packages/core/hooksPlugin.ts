import { each, isFunction } from "lodash-es";
import type { PluginOption } from "vite";
import shell from "shelljs";

interface HooksPlugin {
  (options: {
    rmFiles?: string[];
    beforeBuild?: Function;
    afterBuild?: Function;
  }): PluginOption;
}

const hooksPlugin: HooksPlugin = ({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}) => {
  return {
    name: "custom-hooks-plugin",
    buildStart() {
      shell.rm("-rf", rmFiles);
      setTimeout(() => {
        isFunction(beforeBuild) && beforeBuild();
      }, 100);
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
};

export default hooksPlugin;
