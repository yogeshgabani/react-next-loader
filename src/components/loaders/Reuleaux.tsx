'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Reuleaux — three dots at triangle vertices bouncing as the set rotates. */
export const Reuleaux = forwardRef<HTMLDivElement, BaseLoaderProps>(function Reuleaux(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 2) linear infinite`,
        }}
      >
        {[0, 120, 240].map((deg, i) => (
          <span key={i} style={{ position: 'absolute', inset: 0, transform: `rotate(${deg}deg)` }}>
            <span
              style={{
                display: 'block',
                width: '32%',
                height: '32%',
                margin: '0 auto',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                animation: `${KEYFRAME.bounceScale} calc(var(--rl-speed) * 1.2) ease-in-out ${(i * 0.4).toFixed(2)}s infinite`,
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
