'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Double Bounce — two overlapping circles pulse out of phase (SpinKit). */
export const DoubleBounce = forwardRef<HTMLDivElement, BaseLoaderProps>(function DoubleBounce(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'var(--rl-color)',
              opacity: 0.6,
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
