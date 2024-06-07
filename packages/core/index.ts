import { makeInstaller } from "@aukuf-ui/utils";
import components from "./components";
import printLogo from "./print-logo";

import "@aukuf-ui/theme/index.css";

printLogo();

const installer = makeInstaller(components);

export * from "@aukuf-ui/components";
export default installer;
