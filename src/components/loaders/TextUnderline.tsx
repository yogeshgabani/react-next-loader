'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

/** Text Underline — static text with a highlight sliding along an underline track. */
export const TextUnderline = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextUnderline(
  { text = 'Loading', size, inline, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = inline ? 'inherit' : resolveTextSize(size);
  const duration = `${1.4 / Math.max(speed, 0.01)}s`;

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
        flexDirection: 'column',
        gap: '0.2em',
        fontWeight: 700,
        fontSize,
        lineHeight: 1.3,
        color: color ?? (inline ? 'currentColor' : 'var(--rl-theme-primary, currentColor)'),
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        style={{
          position: 'relative',
          height: '0.12em',
          minHeight: 2,
          borderRadius: '0.12em',
          overflow: 'hidden',
          background: 'color-mix(in srgb, currentColor 18%, transparent)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '40%',
            borderRadius: 'inherit',
            background: 'currentColor',
            boxShadow: glow ? '0 0 8px currentColor' : undefined,
            animation: `${KEYFRAME.lineBar} ${duration} ease-in-out infinite`,
          }}
        />
      </span>
    </span>
  );
});
