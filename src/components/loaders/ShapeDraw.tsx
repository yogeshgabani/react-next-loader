'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Circle, triangle and square outlines drawn (and erased) on a loop by a moving dot.
export const ShapeDraw = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function ShapeDraw(props, ref) {
    const strokeProps = {
      fill: 'none',
      stroke: 'var(--rl-color)',
      strokeWidth: 7,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      pathLength: 100,
      strokeDasharray: 100,
    };
    const anim = (delay: number) => ({
      animation: `${KEYFRAME.drawPath} var(--rl-speed) ease-in-out infinite`,
      animationDelay: `calc(var(--rl-speed) * ${delay})`,
    });

    return (
      <LoaderBase ref={ref} {...props}>
        <span
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8%',
            filter: 'drop-shadow(var(--rl-glow))',
          }}
        >
          <svg viewBox="0 0 40 40" style={{ width: '28%', overflow: 'visible' }}>
            <circle cx="20" cy="20" r="15" {...strokeProps} style={anim(0)} />
          </svg>
          <svg viewBox="0 0 40 40" style={{ width: '28%', overflow: 'visible' }}>
            <polygon points="20,5 35,33 5,33" {...strokeProps} style={anim(0.15)} />
          </svg>
          <svg viewBox="0 0 40 40" style={{ width: '28%', overflow: 'visible' }}>
            <rect x="6" y="6" width="28" height="28" rx="3" {...strokeProps} style={anim(0.3)} />
          </svg>
        </span>
      </LoaderBase>
    );
  },
);
