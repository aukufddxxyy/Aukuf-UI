<template>
  <transition name="au-elert-fade">
    <div
      v-show="visible"
      class="au-alert"
      role="alert"
      :class="{
        [`au-alert__${type}`]: type,
        [`au-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <au-icon
        v-if="showIcon"
        class="au-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="au-alert__content">
        <span
          class="au-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <p
          v-if="withDescription"
          class="au-alert__description"
        >
          <slot>{{ description }}</slot>
        </p>
        <div
          v-if="closable"
          class="au-alert__close"
        >
          <au-icon
            icon="mdi:close"
            @click.stop="close"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AuIcon from "../../Icon/src/Icon.vue";
import { IconMap } from "./consts";
import type { AlertProps, AlertEmits, AlertInstance } from "./types";

defineOptions({
  name: "AuAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  closable: true,
  showIcon: true,
  center: false,
  effect: "light",
});

const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);

const close = () => {
  visible.value = false;
  emits("close");
};

const open = () => {
  visible.value = true;
};

const withDescription = computed(() => !!props.description || !!slots.default);
const iconName = computed(
  () => IconMap.get(props.type) ?? "mdi:information-variant-circle",
);

defineExpose<AlertInstance>({
  close,
  open,
});
</script>

<style lang="scss" scoped>
@import "../style/style.css";
</style>
