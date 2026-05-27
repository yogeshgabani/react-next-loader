'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DELAYS = [0, 0.15, 0.3, 0.7, 0.55, 0.4, 0.85, 1, 1.15];

export const Blocks = forwardRef<HTMLDivElement, BaseLoaderProps>(function Blocks(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10%',
          width: '100%',
          height: '100%',
        }}
      >
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              borderRadius: '15%',
              animation: `${KEYFRAME.blocks} var(--rl-speed) ease-in-out ${d}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
