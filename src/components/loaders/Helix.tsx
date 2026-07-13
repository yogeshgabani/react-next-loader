'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const COUNT = 8;

/** Helix — a row of dots riding a travelling sine wave, like a spinning strand. */
export const Helix = forwardRef<HTMLDivElement, BaseLoaderProps>(function Helix(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: COUNT }).map((_, i) => (
          <span
            key={i}
            style={{
              width: '9%',
              height: '9%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              animation: `${KEYFRAME.helixWave} calc(var(--rl-speed) * 1.2) ease-in-out ${(i * 0.12).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
