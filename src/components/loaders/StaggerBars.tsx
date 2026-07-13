'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const BARS = [
  { width: '55%', color: '#9ca3af', delay: 0 },
  { width: '70%', color: '#e5e7eb', delay: 0.12 },
  { width: '45%', color: '#e5e7eb', delay: 0.24 },
  { width: '62%', color: '#9ca3af', delay: 0.36 },
];

// Staggered sliding bars with a small ball tracing across the top.
export const StaggerBars = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function StaggerBars(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <span
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10%',
          }}
        >
          {/* Ball gliding across the top */}
          <span
            style={{
              width: '18%',
              height: '18%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.staggerBall} var(--rl-speed) ease-in-out infinite`,
            }}
          />
          {BARS.map((b, i) => (
            <span
              key={i}
              style={{
                width: b.width,
                height: '9%',
                borderRadius: '999px',
                background: b.color,
                animation: `${KEYFRAME.staggerBar} var(--rl-speed) ease-in-out infinite`,
                animationDelay: `calc(var(--rl-speed) * ${b.delay})`,
              }}
            />
          ))}
        </span>
      </LoaderBase>
    );
  },
);
