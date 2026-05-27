'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextGradient = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextGradient(
  {
    text = 'LOADING',
    size,
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
  const duration = `${3 / Math.max(speed, 0.01)}s`;

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
        background:
          'linear-gradient(90deg, #a855f7, #ec4899, #38bdf8, #22c55e, #facc15, #ef4444, #a855f7)',
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        filter: glow ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' : undefined,
        animation: `${KEYFRAME.textGradient} ${duration} linear infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
});
