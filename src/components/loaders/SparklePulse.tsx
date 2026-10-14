'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

/** Sparkle Pulse — a beating sparkle sending out halo rings, like an AI "listening" state. */
export const SparklePulse = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparklePulse(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: 'var(--rl-thickness, calc(var(--rl-size) / 16)) solid color-mix(in srgb, var(--rl-color) 60%, transparent)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.ripple} calc(var(--rl-speed) * 1.6) ease-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${-0.8 * i})`,
            }}
          />
        ))}
        <span
          style={{
            position: 'absolute',
            inset: '22%',
            ...sparkleShape(),
            animation: `${KEYFRAME.beat} calc(var(--rl-speed) * 0.8) ease-in-out infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
