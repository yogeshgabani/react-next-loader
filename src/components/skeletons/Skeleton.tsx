'use client';

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { KEYFRAME } from '../../animations/keyframes';
import { cn } from '../../utils/cn';
import { injectKeyframes } from '../../utils/injectKeyframes';

// Belt-and-braces: ensure keyframes exist before any Skeleton renders.
// The injectKeyframes module also auto-injects at load time; this catch
// covers edge cases where bundlers tree-shake the top-level side effect.
injectKeyframes();

export type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  rounded?: boolean | number;
  animation?: SkeletonAnimation;
  speed?: number;
  baseColor?: string;
  highlightColor?: string;
}

function toCssSize(v: number | string | undefined): string | undefined {
  if (v == null) return undefined;
  return typeof v === 'number' ? `${v}px` : v;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    width,
    height,
    circle = false,
    rounded = true,
    animation = 'shimmer',
    speed = 1,
    baseColor,
    highlightColor,
    className,
    style,
    ...rest
  },
  ref,
) {
  const radius =
    circle ? '50%' : rounded === true ? '6px' : rounded === false ? '0' : `${rounded}px`;

  // Defaults use currentColor mixed with transparent so the skeleton is
  // visible in BOTH light and dark themes without depending on the surface
  // token (which can be too close to the page background).
  //   - In light mode currentColor is dark → produces a soft grey overlay.
  //   - In dark mode currentColor is light → produces a subtle light overlay.
  const base = baseColor ?? 'color-mix(in srgb, currentColor 14%, transparent)';
  const hi = highlightColor ?? 'color-mix(in srgb, currentColor 28%, transparent)';
  const duration = `${1.4 / Math.max(speed, 0.01)}s`;

  let bg: string = base;
  let anim: string | undefined;

  if (animation === 'shimmer') {
    bg = `linear-gradient(90deg, ${base} 0%, ${hi} 50%, ${base} 100%)`;
    anim = `${KEYFRAME.shimmer} ${duration} linear infinite`;
  } else if (animation === 'pulse') {
    anim = `${KEYFRAME.fadeInOut} ${duration} ease-in-out infinite`;
  } else if (animation === 'wave') {
    bg = `linear-gradient(90deg, ${base} 0%, ${hi} 50%, ${base} 100%)`;
    anim = `${KEYFRAME.shimmer} ${duration} ease-in-out infinite`;
  }

  const css: CSSProperties = {
    display: 'block',
    width: toCssSize(width) ?? '100%',
    height: toCssSize(height) ?? '1em',
    background: bg,
    backgroundSize: animation === 'shimmer' || animation === 'wave' ? '200% 100%' : undefined,
    borderRadius: radius,
    animation: anim,
    ...style,
  };

  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading content"
      className={cn('rl-skeleton', className)}
      style={css}
      {...rest}
    />
  );
});
