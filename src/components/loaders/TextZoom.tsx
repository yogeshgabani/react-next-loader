'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextZoom = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextZoom(
  { text = 'LOADING', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${1.6 / Math.max(speed, 0.01)}s`;

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
        letterSpacing: '0.12em',
        lineHeight: 1.5,
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        transformOrigin: 'center',
        animation: `${KEYFRAME.textZoom} ${duration} ease-in-out infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
});
