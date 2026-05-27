'use client';

import { forwardRef, useEffect } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextTyping = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextTyping(
  { text = 'Loading', size, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${3.6 / Math.max(speed, 0.01)}s`;
  const cursorDuration = `${0.7 / Math.max(speed, 0.01)}s`;
  const charCount = Math.max((text || '').length, 1);

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
        lineHeight: 1.4,
        color: color ?? 'var(--rl-theme-primary, currentColor)',
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          verticalAlign: 'bottom',
          animation: `${KEYFRAME.textType} ${duration} steps(${charCount}, end) infinite`,
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '0.5em',
          height: '1em',
          marginLeft: '0.05em',
          background: 'currentColor',
          verticalAlign: 'baseline',
          animation: `${KEYFRAME.textCursor} ${cursorDuration} steps(1, end) infinite`,
        }}
      />
    </span>
  );
});
