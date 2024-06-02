import { makeInstaller } from "@aukuf-ui/utils";
import components from "./components";
import "@aukuf-ui/theme/index.css";
import printLogo from "./print-logo";

printLogo();
const installer = makeInstaller(components);

export * from "@aukuf-ui/components";
export default installer;
