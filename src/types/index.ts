import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type ThemeMode = 'light' | 'dark' | 'auto';

export type LabelPosition = 'right' | 'left' | 'top' | 'bottom';

export interface BaseLoaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  size?: LoaderSize;
  /** Override the loader visual width. Accepts a number (px) or any CSS length. */
  width?: number | string;
  /** Override the loader visual height. Accepts a number (px) or any CSS length. */
  height?: number | string;
  color?: string;
  speed?: number;
  thickness?: number;
  rounded?: boolean;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  label?: ReactNode;
  /** Where the visible `label` is rendered relative to the loader visual. */
  labelPosition?: LabelPosition;
  /** Override the label's text color (defaults to `inherit`). */
  labelColor?: string;
  /** Override the label's font size. Accepts a number (px) or any CSS length. */
  labelFontSize?: number | string;
  /** Override the label's font weight. Accepts number (100–900) or keyword. */
  labelWeight?: number | string;
  /** Custom CSS applied to the label `<span>` (escape hatch for advanced styling). */
  labelStyle?: CSSProperties;
  /** Spacing in px between the loader visual and the label. Default 8. */
  gap?: number;
  /**
   * Text content for the loader. Used by text-style loaders
   * (e.g. `TextSequence`, `TextWave`). Ignored by graphical loaders.
   */
  text?: string;
  /** Image URL or data URL for image-style loaders (e.g. `image-spin`). */
  image?: string;
  /** Alt text for the image. Defaults to aria-label or "Loading". */
  imageAlt?: string;
  /** Animation style for skeleton-style loaders. Ignored by other loaders. */
  skeletonAnimation?: 'shimmer' | 'pulse' | 'wave' | 'none';
}

export interface ThemeTokens {
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  colorBackground: string;
  colorSurface: string;
  colorText: string;
  colorMuted: string;
  shadowGlow: string;
  radius: string;
}
