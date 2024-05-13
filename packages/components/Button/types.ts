import type { Component, Ref } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "default" | "small";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  block?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  loadingIcon?: string;
  throttleDuration?: number;
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}