'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

/** Text Highlight — a marker stroke wipes in behind the text from the left, then out to the right. */
export const TextHighlight = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextHighlight(
  { text = 'Loading', size, inline, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = inline ? 'inherit' : resolveTextSize(size);
  const duration = `${2 / Math.max(speed, 0.01)}s`;

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
        padding: '0 0.15em',
        fontWeight: 700,
        fontSize,
        lineHeight: 1.4,
        color: color ?? (inline ? 'currentColor' : 'var(--rl-theme-primary, currentColor)'),
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        backgroundImage:
          'linear-gradient(color-mix(in srgb, currentColor 30%, transparent), color-mix(in srgb, currentColor 30%, transparent))',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '0% 45%',
        backgroundPosition: '0% 90%',
        animation: `${KEYFRAME.textHighlight} ${duration} ease-in-out infinite`,
        ...style,
      }}
    >
      <span aria-hidden="true">{text}</span>
    </span>
  );
});
