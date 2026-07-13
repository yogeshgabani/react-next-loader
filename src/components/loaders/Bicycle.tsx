'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Line-art bicycle whose wheels spin.
export const Bicycle = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function Bicycle(props, ref) {
    const stroke = {
      fill: 'none',
      stroke: 'var(--rl-color)',
      strokeWidth: 3,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    };
    const wheel = (cx: number) => (
      <g
        style={{
          transformOrigin: `${cx}px 62px`,
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      >
        <circle cx={cx} cy={62} r={18} {...stroke} />
        <line x1={cx} y1={44} x2={cx} y2={80} {...stroke} strokeWidth={1.5} />
        <line x1={cx - 18} y1={62} x2={cx + 18} y2={62} {...stroke} strokeWidth={1.5} />
        <line x1={cx - 13} y1={49} x2={cx + 13} y2={75} {...stroke} strokeWidth={1.5} />
        <line x1={cx - 13} y1={75} x2={cx + 13} y2={49} {...stroke} strokeWidth={1.5} />
        <circle cx={cx} cy={62} r={2.5} fill="var(--rl-color)" />
      </g>
    );

    return (
      <LoaderBase ref={ref} {...props}>
        <svg
          viewBox="0 0 120 90"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
        >
          {wheel(30)}
          {wheel(90)}
          {/* Frame */}
          <path d="M30 62 L52 62 L66 34 L84 62 M52 62 L66 34 M52 62 L44 34 L66 34" {...stroke} />
          <path d="M90 62 L74 34 L84 30" {...stroke} />
          {/* Seat + handlebar */}
          <line x1="44" y1="34" x2="38" y2="30" {...stroke} />
          <line x1="84" y1="30" x2="90" y2="30" {...stroke} />
        </svg>
      </LoaderBase>
    );
  },
);
