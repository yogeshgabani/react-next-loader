'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

/** Sparkle Dots — three sparkles twinkling in sequence, an AI "typing" indicator. */
export const SparkleDots = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleDots(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(var(--rl-glow))',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '30%',
              aspectRatio: '1 / 1',
              ...sparkleShape(),
              animation: `${KEYFRAME.sparkle} calc(var(--rl-speed) * 1.2) ease-in-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(0.2 * i - 1.2).toFixed(1)})`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
