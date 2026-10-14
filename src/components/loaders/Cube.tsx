'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Faces sit half the cube's width (70% of the box) from its centre. Tied to
// --rl-size so the cube stays closed at every size — a fixed 20px only fit ~57px.
const HALF = 'calc(var(--rl-size) * 0.35)';
const FACES = [
  { transform: `translateZ(${HALF})` },
  { transform: `rotateY(180deg) translateZ(${HALF})` },
  { transform: `rotateY(90deg) translateZ(${HALF})` },
  { transform: `rotateY(-90deg) translateZ(${HALF})` },
  { transform: `rotateX(90deg) translateZ(${HALF})` },
  { transform: `rotateX(-90deg) translateZ(${HALF})` },
];

export const Cube = forwardRef<HTMLDivElement, BaseLoaderProps>(function Cube(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ width: '100%', height: '100%', perspective: 'calc(var(--rl-size) * 2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
