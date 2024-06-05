import Collapse from "./src/Collapse.vue";
import CollapseItem from "./src/CollapseItem.vue";
import { withInstall } from "@aukuf-ui/utils";

export const AuCollapse = withInstall(Collapse);
export const AuCollapseItem = withInstall(CollapseItem);

export * from "./src/types";
