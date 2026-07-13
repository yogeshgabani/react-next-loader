'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface RainCloudProps extends BaseLoaderProps {
  cloudColor?: string;
}

const DROPS = [
  { x: 32, delay: 0 },
  { x: 46, delay: 0.25 },
  { x: 58, delay: 0.5 },
  { x: 70, delay: 0.15 },
  { x: 84, delay: 0.4 },
];

// A cloud with rain drops streaking down beneath it.
export const RainCloud = forwardRef<HTMLDivElement, RainCloudProps>(
  function RainCloud({ cloudColor = '#1e293b', ...rest }, ref) {
    return (
      <LoaderBase ref={ref} {...rest}>
        <svg
          viewBox="0 0 120 120"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
        >
          {/* Cloud */}
          <g fill={cloudColor}>
            <circle cx="45" cy="45" r="20" />
            <circle cx="72" cy="40" r="26" />
            <circle cx="90" cy="52" r="18" />
            <rect x="40" y="45" width="55" height="22" rx="11" />
          </g>
          {/* Rain */}
          {DROPS.map((d, i) => (
            <line
              key={i}
              x1={d.x}
              y1={72}
              x2={d.x}
              y2={84}
              stroke="var(--rl-color)"
              strokeWidth={4}
              strokeLinecap="round"
              style={{
                transformOrigin: `${d.x}px 78px`,
                animation: `${KEYFRAME.fallLine} var(--rl-speed) linear infinite`,
                animationDelay: `calc(var(--rl-speed) * ${d.delay})`,
              }}
            />
          ))}
        </svg>
      </LoaderBase>
    );
  },
);
