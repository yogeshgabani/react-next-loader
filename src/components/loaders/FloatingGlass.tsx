'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const FloatingGlass = forwardRef<HTMLDivElement, BaseLoaderProps>(function FloatingGlass(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: `${i * 20}%`,
              left: `${i * 20}%`,
              width: '55%',
              height: '55%',
              borderRadius: '20%',
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--rl-color) 35%, transparent), color-mix(in srgb, var(--rl-color) 15%, transparent))',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid color-mix(in srgb, var(--rl-color) 40%, transparent)',
              boxShadow: '0 8px 28px color-mix(in srgb, var(--rl-color) 25%, transparent)',
              animation: `${KEYFRAME.glassFloat} var(--rl-speed) ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
