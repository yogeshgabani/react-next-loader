'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Line Scale — five vertical bars scaling in a travelling wave (loaders.css). */
export const LineScale = forwardRef<HTMLDivElement, BaseLoaderProps>(function LineScale(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '9%',
          width: '100%',
          height: '100%',
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: '11%',
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '999px',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: 'center',
              animation: `${KEYFRAME.scaleY} calc(var(--rl-speed) * 1) ease-in-out ${(i * 0.1).toFixed(1)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
