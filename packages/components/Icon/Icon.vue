<template>
  <i
    class="au-icon"
    v-bind="$attrs"
    :style="customStyle"
    :icon="props.icon"
  ></i>
  <!-- <iconify-icon
    class="au-icon"
    :icon="props.icon"
    :style="customStyle"
    v-bind="$attrs"
  /> -->
</template>

<script setup lang="ts">
import { computed } from "vue";
// import "iconify-icon";
import type { IconProps } from "./types";

defineOptions({
  name: "AuIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

const customStyle = computed(() => {
  return {
    color: props.color ?? void 0,
  };
});
</script>

<style scoped>
@import "./style.css";
</style>
