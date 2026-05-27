'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DELAYS = [0, 0.1, 0.2, 0.1, 0.2, 0.3, 0.2, 0.3, 0.4];

export const Grid = forwardRef<HTMLDivElement, BaseLoaderProps>(function Grid(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '8%',
          width: '100%',
          height: '100%',
        }}
      >
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              background: 'var(--rl-color)',
              borderRadius: '3px',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.gridPulse} var(--rl-speed) ease-in-out ${d}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
