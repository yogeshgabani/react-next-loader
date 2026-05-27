'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DELAYS = [0, 0.2, 0.4, 0.2, 0];

export const Audio = forwardRef<HTMLDivElement, BaseLoaderProps>(function Audio(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '8%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              width: '12%',
              height: '100%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              borderRadius: '3px',
              animation: `${KEYFRAME.audioBar} var(--rl-speed) ease-in-out ${d}s infinite alternate`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
