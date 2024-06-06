import type { IconProps as IconifyIconProps } from "@iconify/vue";

// id, style, onLoad, icon, mode, color, flip
export interface IconProps extends IconifyIconProps {
  loading?: boolean;
}
