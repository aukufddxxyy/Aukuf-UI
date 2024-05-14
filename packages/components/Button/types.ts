import type { Component, Ref } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "default" | "small";
export type ButtonShape = "circle" | "round" | "default";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
  tag?: string | Component;
  size?: ButtonSize;
  type?: ButtonType;
  plain?: boolean;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  round?: boolean;
  circle?: boolean;
  block?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  loadingIcon?: string;
  throttleDuration?: number;
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
