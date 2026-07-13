'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface MatchstickProps extends BaseLoaderProps {
  colors?: [string, string];
}

// Two glowing match-sticks pulsing alternately.
export const Matchstick = forwardRef<HTMLDivElement, MatchstickProps>(
  function Matchstick({ colors = ['#4ade80', '#f87171'], ...rest }, ref) {
    const stick = (color: string, rotate: number, delay: number) => (
      <span
        style={{
          position: 'relative',
          width: '14%',
          height: '46%',
          transform: `rotate(${rotate}deg)`,
          animation: `${KEYFRAME.matchGlow} var(--rl-speed) ease-in-out infinite`,
          animationDelay: `calc(var(--rl-speed) * ${delay})`,
        }}
      >
        {/* Stick body */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '999px',
            background: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
        {/* Glowing tip */}
        <span
          style={{
            position: 'absolute',
            top: '-6%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: '#1f2937',
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </span>
    );

    return (
      <LoaderBase ref={ref} {...rest}>
        <span
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '22%',
          }}
        >
          {stick(colors[0], -18, 0)}
          {stick(colors[1], 18, 0.4)}
        </span>
      </LoaderBase>
    );
  },
);
