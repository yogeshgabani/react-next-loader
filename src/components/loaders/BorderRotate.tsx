'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Border Rotate Loader — a faint full ring with a single solid colored arc that
 * sweeps around it, built from a conic gradient masked into a donut.
 */
export const BorderRotate = forwardRef<HTMLDivElement, BaseLoaderProps>(function BorderRotate(
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
          background: `conic-gradient(
            from 0deg,
            var(--rl-color) 0deg 110deg,
            color-mix(in srgb, var(--rl-color) 18%, transparent) 110deg 360deg
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
