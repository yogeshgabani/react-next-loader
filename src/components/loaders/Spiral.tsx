'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Spiral — a comet-like conic tail sweeping around a ring. */
export const Spiral = forwardRef<HTMLDivElement, BaseLoaderProps>(function Spiral(props, ref) {
  const ring = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 6)';
  const donutMask = `radial-gradient(farthest-side, transparent calc(100% - ${ring}), #000 calc(100% - ${ring}))`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 0deg 90deg, var(--rl-color) 360deg)',
          WebkitMask: donutMask,
          mask: donutMask,
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
