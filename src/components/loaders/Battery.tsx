'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Battery — a battery outline whose fill charges up on a loop. */
export const Battery = forwardRef<HTMLDivElement, BaseLoaderProps>(function Battery(props, ref) {
  const bw = props.thickness != null ? `${props.thickness}px` : 'max(2px, calc(var(--rl-size) / 22))';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {/* Body */}
        <span
          style={{
            position: 'relative',
            width: '72%',
            height: '46%',
            borderStyle: 'solid',
            borderWidth: bw,
            borderColor: 'var(--rl-color)',
            borderRadius: '4px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: '14%',
              background: 'var(--rl-color)',
              borderRadius: '2px',
              transformOrigin: 'left center',
              animation: `${KEYFRAME.batteryCharge} calc(var(--rl-speed) * 1.6) ease-in-out infinite`,
            }}
          />
        </span>
        {/* Positive terminal */}
        <span
          style={{
            width: '5%',
            height: '20%',
            marginLeft: '2%',
            borderRadius: '0 2px 2px 0',
            background: 'var(--rl-color)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
