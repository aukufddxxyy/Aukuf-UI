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
      each(rmFiles, (file) => {
        shell.rm("-rf", file);
        console.log("rm", file);
      });
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      console.log("buildEnd start");
      !err && isFunction(afterBuild) && afterBuild();
      console.log("buildEnd end");
    },
  };
};

export default hooksPlugin;
