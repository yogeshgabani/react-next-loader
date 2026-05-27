'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Infinity_ = forwardRef<HTMLDivElement, BaseLoaderProps>(function Infinity_(
  props,
  ref,
) {
  const thickness = props.thickness ?? 6;
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 100 50"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(var(--rl-glow))',
        }}
      >
        <path
          d="M25 25 C25 5, 50 5, 50 25 C50 45, 75 45, 75 25 C75 5, 50 5, 50 25 C50 45, 25 45, 25 25 Z"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray="200"
          style={{ animation: `${KEYFRAME.infinity} var(--rl-speed) linear infinite` }}
        />
      </svg>
    </LoaderBase>
  );
});

// Export with friendly name for external usage. `Infinity` is a global in JS.
export { Infinity_ as Infinity };
