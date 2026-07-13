'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Four translucent triangular faces folded into a rotating tetrahedron.
// Each face reuses --rl-color at a different opacity for a glassy, layered look.
const SIDES = [
  { transform: 'rotateZ(-30deg) rotateY(90deg)', mix: '85%' },
  { transform: 'rotateZ(30deg) rotateY(90deg)', mix: '55%' },
  { transform: 'rotateX(30deg)', mix: '70%' },
  { transform: 'rotateX(-30deg)', mix: '40%' },
];

export const Pyramid = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function Pyramid(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <span
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '200px',
            transform: 'rotateX(-18deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <span
            style={{
              position: 'relative',
              width: '52%',
              height: '52%',
              transformStyle: 'preserve-3d',
              animation: `${KEYFRAME.pyramidSpin} var(--rl-speed) linear infinite`,
            }}
          >
            {SIDES.map((s, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: 'center top',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  transform: s.transform,
                  background: `color-mix(in srgb, var(--rl-color) ${s.mix}, transparent)`,
                  boxShadow: 'inset 0 0 14px var(--rl-color)',
                  filter: 'drop-shadow(var(--rl-glow))',
                }}
              />
            ))}
          </span>
        </span>
      </LoaderBase>
    );
  },
);
