'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Watch = forwardRef<HTMLDivElement, BaseLoaderProps>(function Watch(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '3px solid var(--rl-color)',
          boxSizing: 'border-box',
          boxShadow: 'var(--rl-glow)',
        }}
      >
        {/* Tick marks — each placed inside a rotated wrapper that fills the watch face. */}
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `rotate(${deg}deg)`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '6%',
                left: '50%',
                width: '6%',
                height: '10%',
                background: 'var(--rl-color)',
                borderRadius: '2px',
                transform: 'translateX(-50%)',
              }}
            />
          </span>
        ))}

        {/* Second hand — wrapper fills the face, rotates around the center. */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            animation: `${KEYFRAME.clockHand} var(--rl-speed) cubic-bezier(0.4, 2.3, 0.6, 1) infinite`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              width: '8%',
              maxWidth: '4px',
              height: '40%',
              background: 'var(--rl-color)',
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
            width: '11%',
            height: '11%',
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
