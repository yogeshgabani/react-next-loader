'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

function Heart({ delay }: { delay: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      style={{
        width: '28%',
        height: '60%',
        filter: 'drop-shadow(var(--rl-glow))',
        animation: `${KEYFRAME.heartsBeat} var(--rl-speed) ease-in-out ${delay}s infinite`,
      }}
    >
      <path
        d="M16 28 C 4 18, 0 10, 8 6 C 12 4, 16 8, 16 12 C 16 8, 20 4, 24 6 C 32 10, 28 18, 16 28 Z"
        fill="var(--rl-color)"
      />
    </svg>
  );
}

export const Hearts = forwardRef<HTMLDivElement, BaseLoaderProps>(function Hearts(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '6%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Heart delay={0} />
        <Heart delay={0.2} />
        <Heart delay={0.4} />
      </span>
    </LoaderBase>
  );
});
