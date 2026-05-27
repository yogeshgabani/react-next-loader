'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const TailSpin = forwardRef<HTMLDivElement, BaseLoaderProps>(function TailSpin(props, ref) {
  const thickness = props.thickness ?? 4;
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 50 50"
        style={{
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.tailSpin} var(--rl-speed) linear infinite`,
          filter: 'drop-shadow(var(--rl-glow))',
        }}
      >
        <defs>
          <linearGradient id="rl-tail-spin-grad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="var(--rl-color)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--rl-color)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#rl-tail-spin-grad)"
          strokeWidth={thickness}
          strokeDasharray="90 150"
          strokeLinecap="round"
        />
      </svg>
    </LoaderBase>
  );
});
