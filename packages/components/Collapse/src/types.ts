import type { Ref } from "vue";

export type CollapseItemName = string | number;

export type CollapseItemProps = {
  name: CollapseItemName;
  title?: string;
  disabled?: boolean;
};

export type CollapseProps = {
  modelValue: CollapseItemName[];
  accordion?: boolean;
  //   value?: CollapseItemName | CollapseItemName[];
  //   border?: boolean;
};

export interface CollapseEmits {
  (evt: "update:modelValue", value: CollapseItemName[]): void;
  (evt: "change", value: CollapseItemName[]): void;
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;
  handleItemClick: (name: CollapseItemName) => void;
}
