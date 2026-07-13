'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Planet — a moon orbiting a central planet. */
export const Planet = forwardRef<HTMLDivElement, BaseLoaderProps>(function Planet(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Planet */}
        <span
          style={{
            position: 'absolute',
            inset: '30%',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
          }}
        />
        {/* Orbiting moon */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '18%',
              height: '18%',
              marginLeft: '-9%',
              borderRadius: '50%',
              background: 'color-mix(in srgb, var(--rl-color) 60%, transparent)',
            }}
          />
        </span>
      </span>
    </LoaderBase>
  );
});
