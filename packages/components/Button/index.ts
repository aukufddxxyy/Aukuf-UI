import Button from "./src/Button.vue";
import ButtonGroup from "./src/ButtonGroup.vue";
import { withInstall } from "@aukuf-ui/utils";

export const AuButton = withInstall(Button);
export const AuButtonGroup = withInstall(ButtonGroup);

export * from "./src/types";
