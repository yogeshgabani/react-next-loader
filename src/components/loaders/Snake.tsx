'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Grid indexes (row-major, 3×3) of the outer ring, in clockwise order.
const PATH = [0, 1, 2, 5, 8, 7, 6, 3];

/** Snake — a lit head with a fading tail travels clockwise around a 3×3 grid. */
export const Snake = forwardRef<HTMLDivElement, BaseLoaderProps>(function Snake(props, ref) {
  const radius = props.rounded === false ? 0 : '18%';
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10%',
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: 9 }, (_, cell) => {
          const step = PATH.indexOf(cell);
          return (
            <span
              key={cell}
              style={{
                borderRadius: radius,
                background: 'var(--rl-color)',
                boxShadow: step < 0 ? undefined : 'var(--rl-glow)',
                opacity: 0.12,
                animation:
                  step < 0
                    ? undefined
                    : `${KEYFRAME.snake} calc(var(--rl-speed) * 1.2) linear infinite`,
                animationDelay:
                  step < 0 ? undefined : `calc(var(--rl-speed) * ${((step / PATH.length - 1) * 1.2).toFixed(3)})`,
              }}
            />
          );
        })}
      </span>
    </LoaderBase>
  );
});
