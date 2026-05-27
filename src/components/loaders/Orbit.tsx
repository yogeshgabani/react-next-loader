'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Orbit = forwardRef<HTMLDivElement, BaseLoaderProps>(function Orbit(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1px dashed color-mix(in srgb, var(--rl-color) 30%, transparent)',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '22%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: '0 0 18px var(--rl-color)',
          }}
        />
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              animation: `${KEYFRAME.orbit} ${1.4 + i * 0.9}s linear infinite`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: i === 0 ? '16%' : '11%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'color-mix(in srgb, var(--rl-color) 80%, white)',
                boxShadow: 'var(--rl-glow)',
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
