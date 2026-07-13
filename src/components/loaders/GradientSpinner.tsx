'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Gradient Spinner — a rotating conic-gradient arc that fades from transparent
 * to the loader color, masked into a donut ring with a rounded look.
 */
export const GradientSpinner = forwardRef<HTMLDivElement, BaseLoaderProps>(function GradientSpinner(
  props,
  ref,
) {
  // Default ring width scales with the loader size; explicit `thickness` (px) wins.
  const ring = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 8)';
  const donutMask = `radial-gradient(farthest-side, transparent calc(100% - ${ring}), #000 calc(100% - ${ring}))`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background:
            'conic-gradient(from 90deg, transparent 0%, color-mix(in srgb, var(--rl-color) 25%, transparent) 30%, var(--rl-color) 100%)',
          WebkitMask: donutMask,
          mask: donutMask,
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
