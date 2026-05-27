'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Radio = forwardRef<HTMLDivElement, BaseLoaderProps>(function Radio(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
          }}
        />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `${thickness}px solid var(--rl-color)`,
              boxSizing: 'border-box',
              animation: `${KEYFRAME.radioWave} var(--rl-speed) cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
