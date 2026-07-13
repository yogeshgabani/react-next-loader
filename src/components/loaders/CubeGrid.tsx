'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// SpinKit's staggered delay grid.
const DELAYS = ['0.2s', '0.3s', '0.4s', '0.1s', '0.2s', '0.3s', '0s', '0.1s', '0.2s'];

/** Cube Grid — a 3×3 grid of squares that scale down and back in a wave (SpinKit). */
export const CubeGrid = forwardRef<HTMLDivElement, BaseLoaderProps>(function CubeGrid(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%' }}>
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              width: '33.333%',
              height: '33.333%',
              background: 'var(--rl-color)',
              animation: `${KEYFRAME.cubeGrid} calc(var(--rl-speed) * 1.3) ease-in-out ${d} infinite both`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
