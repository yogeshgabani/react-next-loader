'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextSlide = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextSlide(
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
        gap: '0.08em',
        letterSpacing: '0.1em',
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
        overflow: 'hidden',
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
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
            animation: `${KEYFRAME.textSlide} ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s infinite`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
});
