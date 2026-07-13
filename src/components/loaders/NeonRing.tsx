'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Glowing neon ring that spins, with a soft "LOADING" label pulsing in the centre.
export const NeonRing = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function NeonRing(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <span
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Spinning neon arc */}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: 'var(--rl-thickness, 3px) solid transparent',
              borderTopColor: 'var(--rl-color)',
              borderRightColor: 'var(--rl-color)',
              boxShadow: '0 0 10px var(--rl-color), inset 0 0 10px var(--rl-color)',
              animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
            }}
          />
          {/* Centre label */}
          <span
            style={{
              fontSize: 'calc(var(--rl-size) * 0.12)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--rl-color)',
              textShadow: '0 0 8px var(--rl-color)',
              animation: `${KEYFRAME.neonGlow} var(--rl-speed) ease-in-out infinite`,
            }}
          >
            LOADING
          </span>
        </span>
      </LoaderBase>
    );
  },
);
