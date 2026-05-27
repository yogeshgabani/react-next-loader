'use client';

import { forwardRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import type { BaseLoaderProps } from '../types';
import { resolveSize } from '../utils/size';
import { cn } from '../utils/cn';
import { injectKeyframes } from '../utils/injectKeyframes';

export interface LoaderBaseProps extends BaseLoaderProps {
  children: ReactNode;
  baseClassName?: string;
  innerStyle?: CSSProperties;
}

const SR_ONLY: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function toCssLen(v: number | string | undefined, fallback: string): string {
  if (v == null) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

export const LoaderBase = forwardRef<HTMLDivElement, LoaderBaseProps>(function LoaderBase(
  {
    children,
    size = 'md',
    width,
    height,
    color,
    speed = 1,
    thickness,
    rounded,
    glow,
    className,
    style,
    baseClassName,
    innerStyle,
    label,
    labelPosition = 'right',
    labelColor,
    labelFontSize,
    labelWeight,
    labelStyle,
    gap,
    'aria-label': ariaLabel = 'Loading',
    ...rest
  },
  ref,
) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const px = resolveSize(size);
  const visualW = toCssLen(width, `${px}px`);
  const visualH = toCssLen(height, `${px}px`);

  const cssVars: CSSProperties = {
    ['--rl-size' as string]: `${px}px`,
    ['--rl-color' as string]: color ?? 'var(--rl-theme-primary, currentColor)',
    ['--rl-speed' as string]: `${1 / Math.max(speed, 0.01)}s`,
    ['--rl-thickness' as string]: thickness != null ? `${thickness}px` : undefined,
    ['--rl-glow' as string]: glow ? '0 0 12px var(--rl-color)' : 'none',
  };

  const hasLabel = label != null && label !== '';
  const isColumn = labelPosition === 'top' || labelPosition === 'bottom';
  const labelFirst = labelPosition === 'left' || labelPosition === 'top';

  const labelEl = hasLabel ? (
    <span
      className="rl-label"
      style={{
        fontSize: toCssLen(labelFontSize, '14px'),
        lineHeight: 1.3,
        color: labelColor ?? 'inherit',
        fontWeight: labelWeight,
        ...labelStyle,
      }}
    >
      {label}
    </span>
  ) : null;

  const visual = (
    <span
      className="rl-visual"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: visualW,
        height: visualH,
        color: color ?? 'currentColor',
        flexShrink: 0,
        ...cssVars,
      }}
    >
      {children}
    </span>
  );

  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
      data-rl-rounded={rounded ? '' : undefined}
      data-rl-glow={glow ? '' : undefined}
      data-rl-label-pos={hasLabel ? labelPosition : undefined}
      className={cn('rl-root', baseClassName, className)}
      style={{
        display: 'inline-flex',
        flexDirection: isColumn ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        gap: hasLabel ? (gap ?? 8) : 0,
        ...style,
        ...innerStyle,
      }}
      {...rest}
    >
      {labelFirst && labelEl}
      {visual}
      {!labelFirst && labelEl}
      <span style={SR_ONLY}>{ariaLabel}</span>
    </div>
  );
});
