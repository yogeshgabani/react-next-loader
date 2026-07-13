'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Chasing Dots — two dots orbit a common center, pulsing out of phase (SpinKit). */
export const ChasingDots = forwardRef<HTMLDivElement, BaseLoaderProps>(function ChasingDots(props, ref) {
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
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: i === 0 ? 0 : 'auto',
              bottom: i === 1 ? 0 : 'auto',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              animation: `${KEYFRAME.bounceScale} calc(var(--rl-speed) * 2) ease-in-out ${
                i === 1 ? 'calc(var(--rl-speed) * -1)' : '0s'
              } infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
