'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DELAYS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];

export const LineWave = forwardRef<HTMLDivElement, BaseLoaderProps>(function LineWave(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '5%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              width: '10%',
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '6px',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.lineWaveBar} var(--rl-speed) cubic-bezier(0.36, 0.07, 0.19, 0.97) ${d}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
