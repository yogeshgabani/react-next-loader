'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Roller — eight dots on a ring, trailing with eased rotation (lds-roller). */
export const Roller = forwardRef<HTMLDivElement, BaseLoaderProps>(function Roller(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'center',
              animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 1.2) cubic-bezier(0.5, 0, 0.5, 1) ${(-0.036 * (8 - i)).toFixed(3)}s infinite`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                width: '13%',
                height: '13%',
                marginLeft: '-6.5%',
                borderRadius: '50%',
                background: 'var(--rl-color)',
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
