'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const BARS = 7;

/** Waveform — a row of bars pulsing in a travelling sine wave. */
export const Waveform = forwardRef<HTMLDivElement, BaseLoaderProps>(function Waveform(props, ref) {
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
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            style={{
              width: '9%',
              height: '100%',
              borderRadius: '999px',
              background: 'var(--rl-color)',
              transformOrigin: 'center',
              animation: `${KEYFRAME.audioBar} calc(var(--rl-speed) * 1) ease-in-out ${(i * 0.1).toFixed(1)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
