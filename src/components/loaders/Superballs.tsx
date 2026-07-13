'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Superballs — three balls swelling in sequence. */
export const Superballs = forwardRef<HTMLDivElement, BaseLoaderProps>(function Superballs(props, ref) {
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
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '26%',
              height: '26%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              animation: `${KEYFRAME.sync} calc(var(--rl-speed) * 1) ease-in-out ${(i * 0.15).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
