'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextGlitch = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextGlitch(
  { text = 'GLITCH', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${0.8 / Math.max(speed, 0.01)}s`;
  const baseColor = color ?? 'var(--rl-theme-primary, currentColor)';

  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel ?? text ?? 'Loading'}
      className={cn('rl-text-loader', className)}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontWeight: 800,
        fontSize,
        letterSpacing: '0.1em',
        lineHeight: 1,
        color: baseColor,
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      {text}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: '#f43f5e',
          mixBlendMode: 'screen',
          animation: `${KEYFRAME.textGlitch1} ${duration} steps(1, end) infinite`,
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: '#22d3ee',
          mixBlendMode: 'screen',
          animation: `${KEYFRAME.textGlitch2} ${duration} steps(1, end) infinite`,
        }}
      >
        {text}
      </span>
    </span>
  );
});
