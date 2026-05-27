'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const COUNT = 12;

export const RotatingLines = forwardRef<HTMLDivElement, BaseLoaderProps>(function RotatingLines(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {Array.from({ length: COUNT }).map((_, i) => {
          const rotation = (360 / COUNT) * i;
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '4%',
                left: '50%',
                width: '8%',
                height: '24%',
                background: 'var(--rl-color)',
                borderRadius: '999px',
                transformOrigin: '50% calc(50% + 46%)',
                transform: `translate(-50%, 0) rotate(${rotation}deg)`,
                opacity: 0.15,
                animation: `${KEYFRAME.fadeRotate} var(--rl-speed) linear ${(-i / COUNT) * 1}s infinite`,
              }}
            />
          );
        })}
      </span>
    </LoaderBase>
  );
});
