import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@aukuf-ui/utils";

export const AuCollapse = withInstall(Collapse);
export const AuCollapseItem = withInstall(CollapseItem);

export * from "./types";
