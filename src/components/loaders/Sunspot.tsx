'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const RAYS = 12;

export const Sunspot = forwardRef<HTMLDivElement, BaseLoaderProps>(function Sunspot(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            animation: `${KEYFRAME.sunRays} var(--rl-speed) linear infinite`,
          }}
        >
          {Array.from({ length: RAYS }).map((_, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                width: '6%',
                height: '22%',
                background: 'var(--rl-color)',
                borderRadius: '4px',
                transformOrigin: '50% 226%',
                transform: `translate(-50%, 0) rotate(${(360 / RAYS) * i}deg)`,
                boxShadow: 'var(--rl-glow)',
                opacity: 0.85,
              }}
            />
          ))}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: '0 0 20px var(--rl-color)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
