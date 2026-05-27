'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextWave = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextWave(
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
  const duration = `${1.2 / Math.max(speed, 0.01)}s`;
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
        lineHeight: 1.4,
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
            transform: 'translateY(0)',
            animation: `${KEYFRAME.textWave} ${duration} ease-in-out ${i * 0.08}s infinite`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
});
