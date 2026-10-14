'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

// Tiny sparkles twinkling around the wand tip: left, top, size (% of box), phase.
const DUST = [
  { left: 78, top: 8, size: 14, phase: 0 },
  { left: 84, top: 46, size: 11, phase: 0.5 },
  { left: 50, top: 4, size: 9, phase: 1 },
];

/** Sparkle Wand — a magic wand waves while its tip sparkles. Fits "Generate with AI" buttons. */
export const SparkleWand = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleWand(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        {/* Wand + tip sparkle wave together, pivoting on the handle end. */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: '14% 86%',
            animation: `${KEYFRAME.wandWave} calc(var(--rl-speed) * 1.5) ease-in-out infinite`,
          }}
        >
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <line x1="14" y1="86" x2="58" y2="42" stroke="var(--rl-color)" strokeWidth="10" strokeLinecap="round" />
            <line
              x1="50"
              y1="50"
              x2="58"
              y2="42"
              stroke="color-mix(in srgb, var(--rl-color) 40%, #ffffff)"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              position: 'absolute',
              left: '44%',
              top: '18%',
              width: '34%',
              height: '34%',
              ...sparkleShape(),
              animation: `${KEYFRAME.sparkle} calc(var(--rl-speed) * 1.5) ease-in-out infinite`,
            }}
          />
        </span>
        {DUST.map(({ left, top, size, phase }) => (
          <span
            key={left}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}%`,
              height: `${size}%`,
              ...sparkleShape(),
              animation: `${KEYFRAME.sparkleTwinkle} calc(var(--rl-speed) * 1.5) ease-in-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${-phase})`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
