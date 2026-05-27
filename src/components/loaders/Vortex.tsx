'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Vortex = forwardRef<HTMLDivElement, BaseLoaderProps>(function Vortex(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: `${i * 8}%`,
              borderRadius: '50%',
              border: `${thickness}px dashed color-mix(in srgb, var(--rl-color) ${80 - i * 15}%, transparent)`,
              boxSizing: 'border-box',
              animation: `${i % 2 === 0 ? KEYFRAME.spin : KEYFRAME.spinReverse} ${1.4 + i * 0.5}s linear infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
