'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Rotating Plane — a square flipping in 3D around both axes (SpinKit). */
export const RotatingPlane = forwardRef<HTMLDivElement, BaseLoaderProps>(function RotatingPlane(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.rotatePlane} calc(var(--rl-speed) * 1.2) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
