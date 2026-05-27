'use client';

import { forwardRef, useEffect, type CSSProperties, type HTMLAttributes } from 'react';
import { KEYFRAME } from '../../animations/keyframes';
import { cn } from '../../utils/cn';
import { injectKeyframes } from '../../utils/injectKeyframes';

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
  useEffect(() => {
    injectKeyframes();
  }, []);

  const radius =
    circle ? '50%' : rounded === true ? '6px' : rounded === false ? '0' : `${rounded}px`;

  const base = baseColor ?? 'var(--rl-theme-surface, #e5e7eb)';
  const hi = highlightColor ?? 'color-mix(in srgb, var(--rl-theme-surface, #e5e7eb) 70%, #fff)';
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
