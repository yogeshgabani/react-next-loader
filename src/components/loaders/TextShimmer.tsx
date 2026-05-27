'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextShimmer = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextShimmer(
  {
    text = 'LOADING',
    size,
    color,
    speed = 1,
    glow,
    className,
    style,
    'aria-label': ariaLabel,
  },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${1.8 / Math.max(speed, 0.01)}s`;
  const baseColor = color ?? 'var(--rl-theme-primary, currentColor)';
  // Background gradient: base color → bright highlight → base color
  const bg = `linear-gradient(100deg,
    color-mix(in srgb, ${baseColor} 35%, transparent) 0%,
    ${baseColor} 45%,
    color-mix(in srgb, ${baseColor} 35%, transparent) 70%
  )`;

  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel ?? text ?? 'Loading'}
      className={cn('rl-text-loader', className)}
      style={{
        display: 'inline-block',
        fontWeight: 800,
        fontSize,
        letterSpacing: '0.15em',
        lineHeight: 1,
        background: bg,
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        textShadow: glow ? `0 0 12px ${baseColor}` : undefined,
        animation: `${KEYFRAME.textShimmer} ${duration} linear infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
});
