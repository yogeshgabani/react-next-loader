'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const BallTriangle = forwardRef<HTMLDivElement, BaseLoaderProps>(function BallTriangle(
  props,
  ref,
) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      >
        {[
          { top: '0%', left: '50%' },
          { top: '100%', left: '0%' },
          { top: '100%', left: '100%' },
        ].map((pos, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              transform: 'translate(-50%, -50%)',
              width: '26%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              border: `${thickness}px solid var(--rl-color)`,
              boxSizing: 'border-box',
              boxShadow: 'var(--rl-glow)',
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
