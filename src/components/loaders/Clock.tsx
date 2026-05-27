'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Clock = forwardRef<HTMLDivElement, BaseLoaderProps>(function Clock(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid var(--rl-color)',
          boxSizing: 'border-box',
          boxShadow: 'var(--rl-glow)',
        }}
      >
        {/* Minute hand: wrapper fills the clock and rotates around its own center,
            which IS the clock center. Hand is placed so its bottom touches center. */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            animation: `${KEYFRAME.clockHand} var(--rl-speed) linear infinite`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '12%',
              left: '50%',
              width: '8%',
              maxWidth: '3px',
              height: '38%',
              background: 'var(--rl-color)',
              borderRadius: '2px',
              transform: 'translateX(-50%)',
            }}
          />
        </span>

        {/* Hour hand: slower, shorter, slightly faded. */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            animation: `${KEYFRAME.clockHand} calc(var(--rl-speed) * 5) linear infinite`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '22%',
              left: '50%',
              width: '8%',
              maxWidth: '3px',
              height: '28%',
              background: 'var(--rl-color)',
              opacity: 0.6,
              borderRadius: '2px',
              transform: 'translateX(-50%)',
            }}
          />
        </span>

        {/* Center pivot dot */}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '9%',
            height: '9%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
