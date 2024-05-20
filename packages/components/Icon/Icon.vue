<template>
  <i
    class="au-icon"
    v-bind="$attrs"
  >
    <Icon
      :class="{ 'loading-icon': props.loading }"
      v-bind="innerProps"
    />
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { omit } from "lodash-es";
import { Icon } from "@iconify/vue";
import type { IconProps } from "./types";

defineOptions({
  name: "AuIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

const innerProps = computed(() => {
  return omit(props, ["loading"]);
});
</script>

<style scoped>
.loading-icon {
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
