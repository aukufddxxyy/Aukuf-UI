<template>
  <div class="au-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from "./types";
import { provide, ref, watch, watchEffect } from "vue";
import { debugWarn } from "@aukuf-ui/utils";
import { COLLAPSE_CTX_KEY } from "./constants";

const COMP_NAME = "AuCollapse" as const;

defineOptions({
  name: COMP_NAME,
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue || []);

const handleItemClick = (item: CollapseItemName) => {
  let _activeNames = [...activeNames.value];

  if (props.accordion) {
    _activeNames = _activeNames.includes(item) ? [] : [item];
  } else {
    const index = _activeNames.indexOf(item);
    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      _activeNames.push(item);
    }
  }
  updateActiveNames(_activeNames);
};

const updateActiveNames = (newNames: CollapseItemName[]) => {
  activeNames.value = newNames;
  emits("update:modelValue", newNames);
  emits("change", newNames);
};

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(
      COMP_NAME,
      "The accordion mode should have one active name at most.",
    );
  }
});

watch(
  () => props.modelValue,
  (newNames) => {
    updateActiveNames(newNames);
  },
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<style lang="css" scoped>
@import "./style.css";
</style>
