'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Boxes = forwardRef<HTMLDivElement, BaseLoaderProps>(function Boxes(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '22%',
              height: '50%',
              background: 'var(--rl-color)',
              borderRadius: '12%',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.boxStack} var(--rl-speed) cubic-bezier(0.55, 0.06, 0.68, 0.19) ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
