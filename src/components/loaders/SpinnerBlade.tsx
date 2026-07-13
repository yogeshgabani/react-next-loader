'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const COUNT = 12;

/** Spinner Blade — twelve tapering blades fading in sequence (iOS-style, lds-spinner). */
export const SpinnerBlade = forwardRef<HTMLDivElement, BaseLoaderProps>(function SpinnerBlade(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {Array.from({ length: COUNT }).map((_, i) => (
          <span key={i} style={{ position: 'absolute', inset: 0, transform: `rotate(${i * (360 / COUNT)}deg)` }}>
            <span
              style={{
                position: 'absolute',
                top: '4%',
                left: '50%',
                width: '8%',
                height: '26%',
                marginLeft: '-4%',
                borderRadius: '999px',
                background: 'var(--rl-color)',
                animation: `${KEYFRAME.bladeFade} calc(var(--rl-speed) * 1.1) linear ${(-(COUNT - i) * (1.1 / COUNT)).toFixed(3)}s infinite`,
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
