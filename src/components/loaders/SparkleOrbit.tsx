'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

/** Sparkle Orbit — three small sparkles circling a twinkling central one. */
export const SparkleOrbit = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleOrbit(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        <span
          style={{
            position: 'absolute',
            inset: '28%',
            ...sparkleShape(),
            animation: `${KEYFRAME.sparkle} calc(var(--rl-speed) * 1.8) ease-in-out infinite`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: 0,
            animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 2.4) linear infinite`,
          }}
        >
          {[0, 120, 240].map((angle, i) => (
            <span
              key={angle}
              style={{ position: 'absolute', inset: 0, transform: `rotate(${angle}deg)` }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '41%',
                  top: 0,
                  width: '18%',
                  height: '18%',
                  ...sparkleShape(),
                  animation: `${KEYFRAME.sparkle} calc(var(--rl-speed) * 1.2) ease-in-out infinite`,
                  animationDelay: `calc(var(--rl-speed) * ${(-0.4 * i).toFixed(1)})`,
                }}
              />
            </span>
          ))}
        </span>
      </span>
    </LoaderBase>
  );
});
