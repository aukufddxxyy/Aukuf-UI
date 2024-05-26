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
      'is-round': shape === 'round',
      'is-circle': shape === 'circle',
      'is-loading': loading,
      'is-disabled': disabled,
    }"
    :disabled="disabled || loading"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <au-icon
          :loading="true"
          :icon="loadingIcon ?? 'mdi:loading'"
        />
      </slot>
    </template>
    <au-icon
      v-if="icon && !loading"
      :icon="icon"
    />
    <span v-if="slots.default">
      <slot></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { throttle } from "lodash-es";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
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
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0);
const _ref = ref<HTMLButtonElement>();

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

const size = computed(() => ctx?.size ?? props?.size ?? "default");
const type = computed(() => ctx?.type ?? props?.type ?? "primary");
const disabled = computed(() => ctx?.disabled ?? props?.disabled ?? false);

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
});
</script>

<style scoped>
@import "./style.css";
</style>
