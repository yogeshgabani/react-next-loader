'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { sparkleShape } from '../../utils/sparkle';
import { cn } from '../../utils/cn';

/**
 * Text Sparkle — a spinning AI sparkle next to text with a shimmer sweeping
 * through it ("✦ Thinking…"). With `inline` it takes the button's font size
 * and text colour.
 */
export const TextSparkle = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextSparkle(
  { text = 'Thinking', size, inline, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = inline ? 'inherit' : resolveTextSize(size);
  const s = Math.max(speed, 0.01);

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
        alignItems: 'center',
        gap: '0.4em',
        fontWeight: 600,
        fontSize,
        lineHeight: 1.3,
        color: color ?? (inline ? 'currentColor' : 'var(--rl-theme-primary, currentColor)'),
        filter: glow ? 'drop-shadow(0 0 6px currentColor)' : undefined,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '1em',
          height: '1em',
          flexShrink: 0,
          ...sparkleShape('linear-gradient(135deg, currentColor, color-mix(in srgb, currentColor 45%, #ffffff))'),
          animation: `${KEYFRAME.sparkleSpin} ${1.6 / s}s cubic-bezier(0.65, 0, 0.35, 1) infinite`,
        }}
      />
      {/* Transparent text *fill* (not colour), so currentColor still drives the gradient. */}
      <span
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(90deg, currentColor 0%, currentColor 40%, color-mix(in srgb, currentColor 35%, transparent) 50%, currentColor 60%, currentColor 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${KEYFRAME.textShimmer} ${2 / s}s linear infinite`,
        }}
      >
        {text}
      </span>
    </span>
  );
});
