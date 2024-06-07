import { makeInstaller } from "@aukuf-ui/utils";
import printLogo from "@aukuf-ui/utils/print-logo";
import components from "./components";

import "@aukuf-ui/theme/index.css";

printLogo();

const installer = makeInstaller(components);

export * from "@aukuf-ui/components";
export default installer;
