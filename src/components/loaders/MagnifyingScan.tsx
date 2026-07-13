'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const MagnifyingScan = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function MagnifyingScan(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(var(--rl-glow))',
            animation: `${KEYFRAME.magnifyScan} var(--rl-speed) linear infinite`,
          }}
        >
          {/* Magnifying glass translated along a square perimeter: L→R→B→L→T */}
          <circle
            cx="42"
            cy="42"
            r="22"
            fill="none"
            stroke="var(--rl-color)"
            strokeWidth={6}
          />
          <line
            x1="59"
            y1="59"
            x2="82"
            y2="82"
            stroke="var(--rl-color)"
            strokeWidth={8}
            strokeLinecap="round"
          />
        </svg>
      </LoaderBase>
    );
  },
);
