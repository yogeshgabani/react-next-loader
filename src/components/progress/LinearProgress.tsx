'use client';

import { forwardRef, useEffect, type HTMLAttributes } from 'react';
import { KEYFRAME } from '../../animations/keyframes';
import { cn } from '../../utils/cn';
import { injectKeyframes } from '../../utils/injectKeyframes';

export interface LinearProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  color?: string;
  trackColor?: string;
  thickness?: number;
  rounded?: boolean;
  gradient?: boolean | [string, string];
  speed?: number;
  label?: string;
}

export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  function LinearProgress(
    {
      value,
      max = 100,
      indeterminate,
      color,
      trackColor,
      thickness = 6,
      rounded = true,
      gradient = false,
      speed = 1,
      label = 'Progress',
      className,
      style,
      ...rest
    },
    ref,
  ) {
    useEffect(() => {
      injectKeyframes();
    }, []);

    const isIndeterminate = indeterminate || value == null;
    const pct = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value! / max) * 100));
    const fill = color ?? 'var(--rl-theme-primary, #7c3aed)';
    const track = trackColor ?? 'var(--rl-theme-surface, rgba(0,0,0,0.08))';
    const radius = rounded ? `${thickness}px` : 0;

    let fillBg: string = fill;
    if (gradient === true) {
      fillBg = `linear-gradient(90deg, var(--rl-theme-primary, #7c3aed), var(--rl-theme-accent, #06b6d4))`;
    } else if (Array.isArray(gradient)) {
      fillBg = `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`;
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-busy={isIndeterminate ? 'true' : undefined}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-label={label}
        className={cn('rl-progress-linear', className)}
        style={{
          position: 'relative',
          width: '100%',
          height: thickness,
          background: track,
          borderRadius: radius,
          overflow: 'hidden',
          ...style,
        }}
        {...rest}
      >
        {isIndeterminate ? (
          <span
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              background: fillBg,
              borderRadius: radius,
              animation: `${KEYFRAME.progressIndeterminate} ${2 / Math.max(speed, 0.01)}s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
            }}
          />
        ) : (
          <span
            style={{
              display: 'block',
              width: `${pct}%`,
              height: '100%',
              background: fillBg,
              borderRadius: radius,
              transition: 'width 240ms ease-out',
            }}
          />
        )}
      </div>
    );
  },
);
