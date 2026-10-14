'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const BAR_HEIGHTS = ['30%', '52%', '74%', '96%'];

/** Signal — cellular signal bars filling up one by one, then fading out. */
export const Signal = forwardRef<HTMLDivElement, BaseLoaderProps>(function Signal(props, ref) {
  const radius = props.rounded === false ? 0 : 'calc(var(--rl-size) / 20)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '9%',
          width: '100%',
          height: '100%',
          padding: '2% 6%',
          boxSizing: 'border-box',
        }}
      >
        {BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            style={{
              width: '16%',
              height: h,
              borderRadius: radius,
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              opacity: 0.18,
              animation: `${KEYFRAME.signalBar} calc(var(--rl-speed) * 1.6) ease-in-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(i * 0.18).toFixed(2)})`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
