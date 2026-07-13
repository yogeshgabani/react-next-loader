'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface CurveArcsProps extends BaseLoaderProps {
  colors?: [string, string, string];
}

// Three rounded, multi-colour arcs nested and spinning together.
export const CurveArcs = forwardRef<HTMLDivElement, CurveArcsProps>(
  function CurveArcs(
    { colors = ['#3b82f6', '#ec4899', '#14b8a6'], ...rest },
    ref,
  ) {
    return (
      <LoaderBase ref={ref} {...rest}>
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(var(--rl-glow))',
            animation: `${KEYFRAME.spin} var(--rl-speed) cubic-bezier(0.65, 0, 0.35, 1) infinite`,
          }}
        >
          {/* Blue outer arc */}
          <path
            d="M15 50 a35 35 0 0 1 70 0"
            fill="none"
            stroke={colors[0]}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* Pink mid arc */}
          <path
            d="M28 68 a24 24 0 0 0 44 0"
            fill="none"
            stroke={colors[1]}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* Teal inner arc */}
          <path
            d="M35 38 a16 16 0 0 1 30 8"
            fill="none"
            stroke={colors[2]}
            strokeWidth={7}
            strokeLinecap="round"
          />
        </svg>
      </LoaderBase>
    );
  },
);
