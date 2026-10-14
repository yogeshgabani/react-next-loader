'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Leapfrog — three dots take turns leaping over each other. Each dot sits in a
 * full-width track; rotating the track 180° arcs the dot from the left edge to
 * the right, then it slides back left while the next dot jumps.
 */
export const Leapfrog = forwardRef<HTMLDivElement, BaseLoaderProps>(function Leapfrog(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              animation: `${KEYFRAME.leapfrog} calc(var(--rl-speed) * 2.5) ease infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(-2.5 * i) / 3})`,
            }}
          >
            <span
              style={{
                width: '22%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                boxShadow: 'var(--rl-glow)',
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
