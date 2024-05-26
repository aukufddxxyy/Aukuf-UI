import type { Component, Ref, ComputedRef } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "default" | "small";
export type ButtonShape = "circle" | "round" | "default";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
  tag?: string | Component;
  size?: ButtonSize;
  type?: ButtonType;
  plain?: boolean;
  shape?: ButtonShape;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  autofocus?: boolean;
  loadingIcon?: string;
  useThrottle?: boolean;
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
  disabled: ComputedRef<boolean>;
  size: ComputedRef<string>;
  type: ComputedRef<string>;
}
