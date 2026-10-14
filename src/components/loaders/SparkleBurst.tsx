'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

const ANGLES = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
const PARTICLE = 10; // % of the box

/** Sparkle Burst — a sparkle pops into view and throws off a ring of tiny sparkles. */
export const SparkleBurst = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleBurst(props, ref) {
  const duration = 'calc(var(--rl-speed) * 1.6)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        {ANGLES.map((angle) => (
          <span key={angle} style={{ position: 'absolute', inset: 0, transform: `rotate(${angle}deg)` }}>
            <span
              style={{
                position: 'absolute',
                left: `${50 - PARTICLE / 2}%`,
                top: `${50 - PARTICLE / 2}%`,
                width: `${PARTICLE}%`,
                height: `${PARTICLE}%`,
                opacity: 0,
                ...sparkleShape(),
                // Fires as the centre sparkle reaches full size (~30% into its cycle).
                animation: `${KEYFRAME.burst} ${duration} cubic-bezier(0.2, 0.6, 0.4, 1) infinite`,
                animationDelay: 'calc(var(--rl-speed) * 0.48)',
              }}
            />
          </span>
        ))}
        <span
          style={{
            position: 'absolute',
            inset: '22%',
            ...sparkleShape(),
            animation: `${KEYFRAME.sparklePop} ${duration} ease-out infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
