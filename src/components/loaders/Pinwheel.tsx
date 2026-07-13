'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Pinwheel — four blades formed from a conic gradient, spinning. */
export const Pinwheel = forwardRef<HTMLDivElement, BaseLoaderProps>(function Pinwheel(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `conic-gradient(
            var(--rl-color) 0deg 60deg, transparent 60deg 90deg,
            var(--rl-color) 90deg 150deg, transparent 150deg 180deg,
            var(--rl-color) 180deg 240deg, transparent 240deg 270deg,
            var(--rl-color) 270deg 330deg, transparent 330deg 360deg
          )`,
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
