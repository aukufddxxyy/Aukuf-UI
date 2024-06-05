import { readdir, readdirSync, readFile } from "fs";
import { defer, delay, filter, map } from "lodash-es";
import shell from "shelljs";

import { TRY_MOVE_STYLES_DELAY } from "./consts";

export function moveEsStyles() {
  readdir("./dist/es/theme", (error) => {
    if (!error) return defer(() => shell.mv("./dist/es/theme", "./dist"));
    readdir("./dist/theme", (error) => {
      if (!error) return;
      return delay(moveEsStyles, TRY_MOVE_STYLES_DELAY);
    });
  });
}

export function moveUmdStyles() {
  readFile("./dist/umd/index.css.gz", (error) => {
    if (error) return delay(moveUmdStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
}

export const getDirectoriesSync = (basePath: string) => {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name,
  );
};
