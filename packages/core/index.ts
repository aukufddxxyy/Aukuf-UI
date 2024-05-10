import { makeInstaller } from "@au-element/utils";
import components from "./components";
import "@au-element/theme/index.css";

const installer = makeInstaller(components);

export * from "@au-element/components";
export default installer;
