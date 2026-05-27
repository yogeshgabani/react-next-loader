'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextDrop = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextDrop(
  { text = 'LOADING', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${2.4 / Math.max(speed, 0.01)}s`;
  const chars = (text || '').split('');

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
        overflow: 'hidden',
        ...style,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            opacity: 0,
            animation: `${KEYFRAME.textDrop} ${duration} cubic-bezier(0.4, 1.8, 0.5, 1) ${i * 0.14}s infinite`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
});
