'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const FACES = [
  { transform: 'translateZ(20px)' },
  { transform: 'rotateY(180deg) translateZ(20px)' },
  { transform: 'rotateY(90deg) translateZ(20px)' },
  { transform: 'rotateY(-90deg) translateZ(20px)' },
  { transform: 'rotateX(90deg) translateZ(20px)' },
  { transform: 'rotateX(-90deg) translateZ(20px)' },
];

export const Cube = forwardRef<HTMLDivElement, BaseLoaderProps>(function Cube(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ width: '100%', height: '100%', perspective: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            position: 'relative',
            width: '70%',
            height: '70%',
            transformStyle: 'preserve-3d',
            animation: `${KEYFRAME.cubeRotate} var(--rl-speed) linear infinite`,
          }}
        >
          {FACES.map((f, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'color-mix(in srgb, var(--rl-color) 70%, transparent)',
                border: '1.5px solid var(--rl-color)',
                boxShadow: 'inset 0 0 12px var(--rl-color)',
                transform: f.transform,
              }}
            />
          ))}
        </span>
      </span>
    </LoaderBase>
  );
});
