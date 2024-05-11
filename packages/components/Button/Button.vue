<template>
  <component
    ref="_ref"
    class="au-button"
    :is="tag"
    :type="tag === 'button' ? nativeType : void 0"
    :class="{
      [`au-button--${type}`]: type,
      [`au-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-loading': loading,
      'is-disabled': disabled,
    }"
    :disabled="disabled || loading"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";
defineOptions({
  name: "AuButton",
});
withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  type: "primary",
  size: "default",
  disabled: false,
});

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();
</script>

<style lang="scss" scoped></style>
