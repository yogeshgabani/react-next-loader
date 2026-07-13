'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Conic Gradient Loader — a segmented conic-gradient donut (alternating colored
 * and transparent wedges) that rotates continuously.
 */
export const ConicGradient = forwardRef<HTMLDivElement, BaseLoaderProps>(function ConicGradient(
  props,
  ref,
) {
  // Default ring width scales with the loader size; explicit `thickness` (px) wins.
  const ring = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 6)';
  const donutMask = `radial-gradient(farthest-side, transparent calc(100% - ${ring}), #000 calc(100% - ${ring}))`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `repeating-conic-gradient(
            var(--rl-color) 0deg 30deg,
            color-mix(in srgb, var(--rl-color) 35%, transparent) 30deg 45deg,
            transparent 45deg 60deg
          )`,
          WebkitMask: donutMask,
          mask: donutMask,
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
