import { makeInstaller } from "@aukuf-ui/utils";
import components from "./components";
import "@aukuf-ui/theme/index.css";

const installer = makeInstaller(components);

export * from "../components";
export default installer;
