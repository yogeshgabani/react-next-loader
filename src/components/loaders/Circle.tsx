'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Circle = forwardRef<HTMLDivElement, BaseLoaderProps>(function Circle(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 50 50"
        style={{
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          filter: 'drop-shadow(var(--rl-glow))',
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth={thickness}
          strokeDasharray="90 150"
          strokeLinecap="round"
          opacity={0.85}
        />
      </svg>
    </LoaderBase>
  );
});
