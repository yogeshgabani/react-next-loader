'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Ring 2 — two counter-rotating arcs in a two-tone colour scheme. */
export const Ring2 = forwardRef<HTMLDivElement, BaseLoaderProps>(function Ring2(props, ref) {
  const bw = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 10)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            borderStyle: 'solid',
            borderWidth: bw,
            borderColor: 'transparent',
            borderTopColor: 'var(--rl-color)',
            borderRightColor: 'var(--rl-color)',
            animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: '22%',
            borderRadius: '50%',
            borderStyle: 'solid',
            borderWidth: bw,
            borderColor: 'transparent',
            borderBottomColor: 'color-mix(in srgb, var(--rl-color) 55%, transparent)',
            borderLeftColor: 'color-mix(in srgb, var(--rl-color) 55%, transparent)',
            animation: `${KEYFRAME.spinReverse} calc(var(--rl-speed) * 0.8) linear infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
