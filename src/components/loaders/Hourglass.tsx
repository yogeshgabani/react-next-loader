'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Hourglass = forwardRef<HTMLDivElement, BaseLoaderProps>(function Hourglass(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(var(--rl-glow))',
          animation: `${KEYFRAME.hourglass} var(--rl-speed) cubic-bezier(0.65, 0, 0.35, 1) infinite`,
        }}
      >
        {/* Top + bottom caps */}
        <rect x="12" y="6" width="76" height="6" rx="2" fill="var(--rl-color)" />
        <rect x="12" y="88" width="76" height="6" rx="2" fill="var(--rl-color)" />
        {/* Outer shell */}
        <path
          d="M18 12 L82 12 L52 50 L82 88 L18 88 L48 50 Z"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* Sand */}
        <path
          d="M30 16 L70 16 L52 44 L48 44 Z"
          fill="var(--rl-color)"
          opacity={0.5}
        >
          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite" />
        </path>
        <path
          d="M30 84 L70 84 L52 60 L48 60 Z"
          fill="var(--rl-color)"
          opacity={0.5}
        >
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Falling stream */}
        <rect x="49" y="44" width="2" height="14" fill="var(--rl-color)" opacity={0.7} />
      </svg>
    </LoaderBase>
  );
});
