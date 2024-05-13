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
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >
    <!-- <au-icon v-if="loading" name="mdi:loading" /> -->
    <template v-if="loading">
      <slot name="loading">
        <au-icon
          class="loading-icon"
          :style="iconStyle"
          :icon="loadingIcon ?? 'mdi:loading'"
        />
      </slot>
    </template>
    <er-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
    />
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";
import AuIcon from "../Icon/Icon.vue";

defineOptions({
  name: "AuButton",
});
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  type: "primary",
  size: "default",
  disabled: false,
  throttleDuration: 300,
});

const slots = defineSlots();
const emits = defineEmits<ButtonEmits>();
const _ref = ref<HTMLButtonElement>();

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

const iconStyle = computed(() => ({
  marginRight: slots.default ? "8px" : void 0,
}));

defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<style scoped>
@import "./style.css";

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
