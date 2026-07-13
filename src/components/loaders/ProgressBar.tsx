'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Indeterminate horizontal progress bar: a coloured segment sweeps along a track.
export const ProgressBar = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function ProgressBar(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <span
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              position: 'relative',
              width: '86%',
              height: '12%',
              minHeight: 4,
              borderRadius: '999px',
              background: 'color-mix(in srgb, var(--rl-color) 22%, transparent)',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                borderRadius: '999px',
                background: 'var(--rl-color)',
                boxShadow: 'var(--rl-glow)',
                animation: `${KEYFRAME.progressIndeterminate} var(--rl-speed) ease-in-out infinite`,
              }}
            />
          </span>
        </span>
      </LoaderBase>
    );
  },
);
