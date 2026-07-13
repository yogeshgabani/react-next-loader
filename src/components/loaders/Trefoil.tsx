'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Trefoil — three dots forming a rotating triangle. */
export const Trefoil = forwardRef<HTMLDivElement, BaseLoaderProps>(function Trefoil(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 1.4) linear infinite`,
        }}
      >
        {[0, 120, 240].map((deg, i) => (
          <span key={i} style={{ position: 'absolute', inset: 0, transform: `rotate(${deg}deg)` }}>
            <span
              style={{
                display: 'block',
                width: '30%',
                height: '30%',
                margin: '0 auto',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                animation: `${KEYFRAME.pulse} calc(var(--rl-speed) * 1.4) ease-in-out ${(i * 0.15).toFixed(2)}s infinite`,
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
