'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Dot Stream — dots that stream across and fade at the edges. */
export const DotStream = forwardRef<HTMLDivElement, BaseLoaderProps>(function DotStream(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '40%',
              left: '40%',
              width: '20%',
              height: '20%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              animation: `${KEYFRAME.propagate} calc(var(--rl-speed) * 1.3) linear ${(i * 0.22).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
