'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Ping — two ring outlines expanding outward like a radar ping. */
export const Ping = forwardRef<HTMLDivElement, BaseLoaderProps>(function Ping(props, ref) {
  const bw = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 12)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              borderStyle: 'solid',
              borderWidth: bw,
              borderColor: 'var(--rl-color)',
              animation: `${KEYFRAME.ripple} calc(var(--rl-speed) * 1.4) cubic-bezier(0, 0.2, 0.8, 1) ${
                i === 1 ? 'calc(var(--rl-speed) * -0.7)' : '0s'
              } infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
