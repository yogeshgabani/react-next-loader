'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Symmetric delays so the pulse ripples out from the centre bar.
const DELAYS = [-0.2, -0.1, 0, -0.1, -0.2];

/** Line Scale Pulse — five bars pulsing outward from the centre. */
export const LineScalePulse = forwardRef<HTMLDivElement, BaseLoaderProps>(function LineScalePulse(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '9%',
          width: '100%',
          height: '100%',
        }}
      >
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              width: '11%',
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '999px',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: 'center',
              animation: `${KEYFRAME.scaleY} calc(var(--rl-speed) * 0.9) cubic-bezier(0.85, 0.25, 0.37, 0.85) ${d}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
