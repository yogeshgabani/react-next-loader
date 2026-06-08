'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { KEYFRAME } from '../../animations/keyframes';
import { cn } from '../../utils/cn';
import { injectKeyframes } from '../../utils/injectKeyframes';
import { resolveSize } from '../../utils/size';
import type { LoaderSize } from '../../types';

// Auto-inject keyframes on module load — defense in depth.
injectKeyframes();

export interface CircularProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  value?: number;
  max?: number;
  size?: LoaderSize;
  thickness?: number;
  color?: string;
  trackColor?: string;
  indeterminate?: boolean;
  speed?: number;
  showValue?: boolean;
  formatValue?: (pct: number) => ReactNode;
  label?: string;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress(
    {
      value,
      max = 100,
      size = 'lg',
      thickness = 4,
      color,
      trackColor,
      indeterminate,
      speed = 1,
      showValue = false,
      formatValue,
      label = 'Progress',
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const px = resolveSize(size);
    const isIndeterminate = indeterminate || value == null;
    const pct = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value! / max) * 100));

    const radius = (px - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - pct / 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-busy={isIndeterminate ? 'true' : undefined}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-label={label}
        className={cn('rl-progress-circular', className)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: px,
          height: px,
          color: color ?? 'var(--rl-theme-primary, currentColor)',
          ...style,
        }}
        {...rest}
      >
        <svg
          width={px}
          height={px}
          viewBox={`0 0 ${px} ${px}`}
          style={{
            transform: 'rotate(-90deg)',
            animation: isIndeterminate
              ? `${KEYFRAME.spin} ${1.4 / Math.max(speed, 0.01)}s linear infinite`
              : undefined,
          }}
        >
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke={trackColor ?? 'color-mix(in srgb, currentColor 14%, transparent)'}
            strokeWidth={thickness}
          />
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isIndeterminate ? circumference * 0.75 : offset}
            style={{ transition: 'stroke-dashoffset 240ms ease-out' }}
          />
        </svg>
        {showValue && !isIndeterminate && (
          <span
            style={{
              position: 'absolute',
              fontSize: Math.max(10, px * 0.22),
              fontWeight: 600,
              color: 'var(--rl-theme-text, currentColor)',
            }}
          >
            {formatValue ? formatValue(pct) : `${Math.round(pct)}%`}
          </span>
        )}
      </div>
    );
  },
);
