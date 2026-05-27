'use client';

import { forwardRef, useEffect, type CSSProperties } from 'react';
import type { BaseLoaderProps } from '../../types';
import { KEYFRAME } from '../../animations/keyframes';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

export const TextSequence = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextSequence(
  {
    text = 'LOADING',
    size,
    color,
    speed = 1,
    glow,
    className,
    style,
    'aria-label': ariaLabel,
    label,
    labelPosition,
    labelColor,
    labelFontSize,
    labelWeight,
    labelStyle,
    gap,
    width,
    height,
    thickness,
    rounded,
    ...rest
  },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const fontSize = resolveTextSize(size);
  const duration = `${1.4 / Math.max(speed, 0.01)}s`;
  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    gap: '0.35em',
    letterSpacing: '0.2em',
    fontWeight: 700,
    fontSize,
    lineHeight: 1,
    color: color ?? 'var(--rl-theme-primary, currentColor)',
    textShadow: glow ? '0 0 12px currentColor' : undefined,
    ...style,
  };

  const chars = (text || '').split('');

  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel ?? text ?? 'Loading'}
      className={cn('rl-text-loader', className)}
      style={baseStyle}
      {...rest}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            opacity: 0,
            animation: `${KEYFRAME.textSequence} ${duration} ease-in-out ${i * 0.12}s infinite`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
});
