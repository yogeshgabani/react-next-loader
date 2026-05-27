'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextRainbow = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextRainbow(
  { text = 'LOADING', size, speed = 1, glow, className, style, 'aria-label': ariaLabel },
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
        fontWeight: 800,
        fontSize,
        lineHeight: 1,
        ...style,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            animation: `${KEYFRAME.textRainbow} ${duration} linear ${(i / Math.max(chars.length, 1)) * -1.5}s infinite`,
            filter: glow ? 'drop-shadow(0 0 8px currentColor)' : undefined,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
});
