'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextBlink = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextBlink(
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
  const duration = `${1.2 / Math.max(speed, 0.01)}s`;

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
        alignItems: 'baseline',
        fontWeight: 600,
        fontSize,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        lineHeight: 1,
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      <span>{text}</span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '0.55em',
          height: '1em',
          marginLeft: '0.15em',
          background: 'currentColor',
          animation: `${KEYFRAME.textCursor} ${duration} steps(1, end) infinite`,
        }}
      />
    </span>
  );
});
