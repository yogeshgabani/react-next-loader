'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const AIThinking = forwardRef<HTMLDivElement, BaseLoaderProps>(function AIThinking(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '14%', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '20%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--rl-color) 70%, white), var(--rl-color))`,
              boxShadow: '0 0 12px var(--rl-color)',
              animation: `${KEYFRAME.aiThink} var(--rl-speed) ease-in-out ${i * 0.22}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
