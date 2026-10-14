'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Blips sit at a clockwise angle (from 12 o'clock) and radius (% of the box);
// each lights up the moment the sweep's leading edge passes over it.
const BLIPS = [
  { angle: 60, radius: 28 },
  { angle: 215, radius: 18 },
];

/** Radar — a rotating sweep over range rings, with blips flashing as it passes. */
export const Radar = forwardRef<HTMLDivElement, BaseLoaderProps>(function Radar(props, ref) {
  const duration = 'calc(var(--rl-speed) * 2)';
  const ring = (inset: string, mix: number) => ({
    position: 'absolute' as const,
    inset,
    borderRadius: '50%',
    border: `var(--rl-thickness, 2px) solid color-mix(in srgb, var(--rl-color) ${mix}%, transparent)`,
  });

  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: 'var(--rl-glow)',
        }}
      >
        <span style={ring('0', 55)} />
        <span style={ring('25%', 30)} />
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, transparent 0deg 250deg, color-mix(in srgb, var(--rl-color) 60%, transparent) 360deg)',
            animation: `${KEYFRAME.spin} ${duration} linear infinite`,
          }}
        />
        {BLIPS.map(({ angle, radius }) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <span
              key={angle}
              style={{
                position: 'absolute',
                left: `${(50 + radius * Math.sin(rad)).toFixed(2)}%`,
                top: `${(50 - radius * Math.cos(rad)).toFixed(2)}%`,
                width: '12%',
                height: '12%',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                opacity: 0,
                animation: `${KEYFRAME.radarBlip} ${duration} ease-out infinite`,
                animationDelay: `calc(var(--rl-speed) * ${((2 * angle) / 360).toFixed(3)})`,
              }}
            />
          );
        })}
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '8%',
            height: '8%',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
