'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Triangle = forwardRef<HTMLDivElement, BaseLoaderProps>(function Triangle(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(var(--rl-glow))',
          animation: `${KEYFRAME.triangleSkew} var(--rl-speed) ease-in-out infinite`,
        }}
      >
        <polygon
          points="50,10 90,85 10,85"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </svg>
    </LoaderBase>
  );
});
