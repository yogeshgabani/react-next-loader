'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Atom — three elliptical orbits spin around a central nucleus. */
export const Atom = forwardRef<HTMLDivElement, BaseLoaderProps>(function Atom(props, ref) {
  const bw = props.thickness != null ? `${props.thickness}px` : 'max(2px, calc(var(--rl-size) / 26))';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 60, 120].map((deg, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '30%',
              left: 0,
              width: '100%',
              height: '40%',
              borderRadius: '50%',
              borderStyle: 'solid',
              borderWidth: bw,
              borderColor: 'var(--rl-color)',
              transform: `rotate(${deg}deg)`,
              animation: `${KEYFRAME.spin} calc(var(--rl-speed) * ${1 + i * 0.25}) linear infinite`,
            }}
          />
        ))}
        <span
          style={{
            position: 'absolute',
            inset: '42%',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
