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
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
};

export default hooksPlugin;
