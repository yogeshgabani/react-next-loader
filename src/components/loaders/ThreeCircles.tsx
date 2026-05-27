'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const ThreeCircles = forwardRef<HTMLDivElement, BaseLoaderProps>(function ThreeCircles(
  props,
  ref,
) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1, 2].map((i) => {
          const inset = i * 12 + '%';
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: inset,
                left: inset,
                right: inset,
                bottom: inset,
                borderRadius: '50%',
                border: `${thickness}px solid transparent`,
                borderTopColor: 'var(--rl-color)',
                boxSizing: 'border-box',
                animation: `${i % 2 === 0 ? KEYFRAME.spin : KEYFRAME.spinReverse} ${1 + i * 0.3}s linear infinite`,
              }}
            />
          );
        })}
      </span>
    </LoaderBase>
  );
});
