'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Hash = forwardRef<HTMLDivElement, BaseLoaderProps>(function Hash(props, ref) {
  const thickness = props.thickness ?? 4;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: `${thickness}px`,
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              borderRadius: '4px',
              transform: `translate(-50%, -50%) rotate(${i === 0 ? 0 : 90}deg)`,
              animation: `${KEYFRAME.spin} var(--rl-speed) cubic-bezier(0.65, 0.05, 0.36, 1) ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
