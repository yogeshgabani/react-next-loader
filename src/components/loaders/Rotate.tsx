'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Rotate = forwardRef<HTMLDivElement, BaseLoaderProps>(function Rotate(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: i === 0 ? 0 : 'auto',
              bottom: i === 1 ? 0 : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '30%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
