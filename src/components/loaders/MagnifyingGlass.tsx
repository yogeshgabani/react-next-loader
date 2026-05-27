'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const MagnifyingGlass = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function MagnifyingGlass(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(var(--rl-glow))',
            animation: `${KEYFRAME.magnifyMove} var(--rl-speed) ease-in-out infinite`,
          }}
        >
          <circle
            cx="40"
            cy="40"
            r="22"
            fill="none"
            stroke="var(--rl-color)"
            strokeWidth={6}
          />
          <line
            x1="58"
            y1="58"
            x2="86"
            y2="86"
            stroke="var(--rl-color)"
            strokeWidth={8}
            strokeLinecap="round"
          />
        </svg>
      </LoaderBase>
    );
  },
);
