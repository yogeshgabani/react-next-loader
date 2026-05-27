'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextRipple = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextRipple(
  { text = 'LOADING', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${1.4 / Math.max(speed, 0.01)}s`;
  const chars = (text || '').split('');
  const center = (chars.length - 1) / 2;

  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel ?? text ?? 'Loading'}
      className={cn('rl-text-loader', className)}
      style={{
        display: 'inline-flex',
        gap: '0.1em',
        letterSpacing: '0.05em',
        fontWeight: 700,
        fontSize,
        lineHeight: 1.6,
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      {chars.map((char, i) => {
        // Delay grows with distance from center → ripple radiates outward.
        const delay = Math.abs(i - center) * 0.09;
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              animation: `${KEYFRAME.textBounceHigh} ${duration} cubic-bezier(0.28, 0.84, 0.42, 1) ${delay}s infinite`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        );
      })}
    </span>
  );
});
