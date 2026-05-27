'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextNeon = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextNeon(
  { text = 'LOADING', size, color, speed = 1, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${2.4 / Math.max(speed, 0.01)}s`;
  const baseColor = color ?? '#22d3ee';

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
        letterSpacing: '0.18em',
        lineHeight: 1.2,
        color: baseColor,
        ['--rl-color' as string]: baseColor,
        animation: `${KEYFRAME.textNeon} ${duration} infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
});
