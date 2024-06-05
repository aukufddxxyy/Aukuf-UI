<template>
  <div
    class="au-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="au-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-active': isActive,
        'is-disabled': disabled,
      }"
      @click="handleClick"
    >
      <span class="au-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <au-icon
        icon="mdi:chevron-right"
        class="header-angle"
      ></au-icon>
    </div>
    <transition
      name="slide"
      v-on="transitionEvents"
    >
      <div
        class="au-collapse-item__wrapper"
        v-show="isActive"
      >
        <div
          class="au-collapse-item__content"
          :id="`item-content-${name}`"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { includes } from "lodash-es";
import type { CollapseItemProps } from "./types";
import { COLLAPSE_CTX_KEY } from "./constants";
import AuIcon from "../../Icon/src/Icon.vue";
import transitionEvents from "./transitionEvents";

defineOptions({
  name: "AuCollapseItem",
});

const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY, void 0);
const isActive = computed(() => includes(ctx?.activeNames.value, props.name));

const handleClick = () => {
  if (props.disabled) return;
  ctx?.handleItemClick(props.name);
};
</script>

<style lang="css" scoped>
@import "../style/style.css";
</style>
