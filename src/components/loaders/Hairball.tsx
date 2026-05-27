'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface HairballProps extends BaseLoaderProps {
  colors?: string[];
}

const DEFAULT_COLORS = [
  '#ef4444',
  '#f97316',
  '#facc15',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
];

export const Hairball = forwardRef<HTMLDivElement, HairballProps>(function Hairball(
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
          filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.15))',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      >
        {colors.map((c, i) => {
          const angle = (i / colors.length) * 360;
          return (
            <path
              key={i}
              d="M 0 0 C -8 -28, -22 -38, -28 -42 C -12 -48, 6 -46, 14 -38 C 20 -30, 16 -16, 8 -10 C 4 -6, 0 -2, 0 0 Z"
              fill={c}
              opacity={0.92}
              transform={`rotate(${angle})`}
            />
          );
        })}
        <circle r={6} fill="#ffffff" />
      </svg>
    </LoaderBase>
  );
});
