'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Fingerprint — concentric arcs rotating at different speeds, like a scan. */
export const Fingerprint = forwardRef<HTMLDivElement, BaseLoaderProps>(function Fingerprint(props, ref) {
  const bw = props.thickness != null ? `${props.thickness}px` : 'max(2px, calc(var(--rl-size) / 28))';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const inset = `${i * 10}%`;
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
                borderStyle: 'solid',
                borderWidth: bw,
                borderColor: 'transparent',
                borderTopColor: 'var(--rl-color)',
                animation: `${i % 2 ? KEYFRAME.spinReverse : KEYFRAME.spin} calc(var(--rl-speed) * ${1 + i * 0.25}) linear infinite`,
              }}
            />
          );
        })}
      </span>
    </LoaderBase>
  );
});
