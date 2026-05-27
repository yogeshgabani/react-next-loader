'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextStretch = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextStretch(
  { text = 'LOADING', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${2 / Math.max(speed, 0.01)}s`;

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
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        animation: `${KEYFRAME.textStretch} ${duration} cubic-bezier(0.65, 0, 0.35, 1) infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
});
