'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Pie — a wedge sweeps clockwise from 12 o'clock until the pie is full, then is
 * eaten away clockwise. Drawn as a circle whose stroke is as wide as its own
 * diameter, so animating the dash fills a solid wedge.
 */
export const Pie = forwardRef<HTMLDivElement, BaseLoaderProps>(function Pie(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 40 40"
        style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        <circle
          cx="20"
          cy="20"
          r="18.5"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth={props.thickness ?? 2}
        />
        <circle
          cx="20"
          cy="20"
          r="8"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth="16"
          pathLength={100}
          strokeDasharray={100}
          transform="rotate(-90 20 20)"
          style={{ animation: `${KEYFRAME.drawPath} calc(var(--rl-speed) * 2) ease-in-out infinite` }}
        />
      </svg>
    </LoaderBase>
  );
});
