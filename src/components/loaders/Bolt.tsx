'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Bolt = forwardRef<HTMLDivElement, BaseLoaderProps>(function Bolt(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 12px var(--rl-color))',
          animation: `${KEYFRAME.boltFlash} var(--rl-speed) ease-in-out infinite`,
        }}
      >
        <path
          d="M55 5 L20 55 L45 55 L35 95 L80 40 L52 40 L60 5 Z"
          fill="var(--rl-color)"
          stroke="var(--rl-color)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </svg>
    </LoaderBase>
  );
});
