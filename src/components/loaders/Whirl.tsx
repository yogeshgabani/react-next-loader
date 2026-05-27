'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface WhirlProps extends BaseLoaderProps {
  colors?: string[];
}

const DEFAULT_COLORS = [
  '#8b5cf6',
  '#3b82f6',
  '#06b6d4',
  '#22c55e',
  '#facc15',
  '#ef4444',
];

export const Whirl = forwardRef<HTMLDivElement, WhirlProps>(function Whirl(
  { colors = DEFAULT_COLORS, ...rest },
  ref,
) {
  return (
    <LoaderBase ref={ref} {...rest}>
      <svg
        viewBox="-50 -50 100 100"
        style={{
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} var(--rl-speed) cubic-bezier(0.65, 0.05, 0.36, 1) infinite`,
        }}
      >
        {colors.map((c, i) => {
          const angle = (i / colors.length) * 360;
          return (
            <path
              key={i}
              d="M 0 -8 Q -22 -22, -28 -42 Q -10 -36, 4 -22 Q 8 -14, 0 -8 Z"
              fill={c}
              opacity={0.9}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </svg>
    </LoaderBase>
  );
});
