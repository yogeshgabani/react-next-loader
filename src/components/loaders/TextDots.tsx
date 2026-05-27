'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextDots = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextDots(
  {
    text = 'Loading',
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
  const duration = `${1.4 / Math.max(speed, 0.01)}s`;

  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel ?? `${text}…`}
      className={cn('rl-text-loader', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontWeight: 600,
        fontSize,
        lineHeight: 1,
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      <span>{text}</span>
      <span style={{ display: 'inline-flex', marginLeft: '0.1em', minWidth: '1.5em' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              opacity: 0,
              animation: `${KEYFRAME.textDot} ${duration} steps(1, end) ${i * (1.4 / 3)}s infinite`,
            }}
          >
            .
          </span>
        ))}
      </span>
    </span>
  );
});
