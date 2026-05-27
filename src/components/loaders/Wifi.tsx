'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Wifi = forwardRef<HTMLDivElement, BaseLoaderProps>(function Wifi(props, ref) {
  const thickness = props.thickness ?? 5;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M ${20 - i * 6} ${70 + i * 4} Q 50 ${30 - i * 12} ${80 + i * 6} ${70 + i * 4}`}
              fill="none"
              stroke="var(--rl-color)"
              strokeWidth={thickness}
              strokeLinecap="round"
              style={{
                transformOrigin: '50% 70%',
                animation: `${KEYFRAME.wifiArc} var(--rl-speed) cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 0.2}s infinite`,
                filter: 'drop-shadow(var(--rl-glow))',
              }}
            />
          ))}
          <circle cx={50} cy={75} r={5} fill="var(--rl-color)" />
        </svg>
      </span>
    </LoaderBase>
  );
});
