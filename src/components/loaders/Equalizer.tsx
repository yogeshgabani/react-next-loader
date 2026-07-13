'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Staggered delays and durations give the uneven, music-equalizer feel.
const BARS = [
  { delay: 0, dur: 0.9 },
  { delay: 0.2, dur: 0.7 },
  { delay: 0.1, dur: 1.1 },
  { delay: 0.35, dur: 0.8 },
  { delay: 0.05, dur: 1.0 },
];

/** Equalizer — bars bouncing at different rates like a music visualiser. */
export const Equalizer = forwardRef<HTMLDivElement, BaseLoaderProps>(function Equalizer(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '8%',
          width: '100%',
          height: '100%',
        }}
      >
        {BARS.map((b, i) => (
          <span
            key={i}
            style={{
              width: '12%',
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '2px',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: 'bottom',
              animation: `${KEYFRAME.audioBar} calc(var(--rl-speed) * ${b.dur}) ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
