<template>
  <iconify-icon
    class="au-icon"
    :icon="props.icon"
    :style="customStyle"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import "iconify-icon";
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
.loading-icon {
  /* 无限循环旋转动画 */
  animation: loading 1s infinite linear;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
