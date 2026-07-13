'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

/** Text Fill — a colour fill rises through the letters like liquid. */
export const TextFill = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextFill(
  { text = 'LOADING', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${1.8 / Math.max(speed, 0.01)}s`;
  const c = color ?? 'var(--rl-theme-primary, currentColor)';

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
        letterSpacing: '0.05em',
        fontWeight: 800,
        fontSize,
        lineHeight: 1.4,
        background: `linear-gradient(to top, ${c} 50%, color-mix(in srgb, ${c} 22%, transparent) 50%)`,
        backgroundSize: '100% 220%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        textShadow: glow ? '0 0 12px color-mix(in srgb, currentColor 40%, transparent)' : undefined,
        animation: `${KEYFRAME.textFill} ${duration} ease-in-out infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
});
