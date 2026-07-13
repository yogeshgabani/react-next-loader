'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Varying bar widths (%) for a barcode look.
const BARS = [6, 3, 9, 4, 3, 8, 5, 3, 7, 4];

/** Barcode — vertical bars of varying widths shimmering like a scan. */
export const Barcode = forwardRef<HTMLDivElement, BaseLoaderProps>(function Barcode(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3%',
          width: '100%',
          height: '100%',
        }}
      >
        {BARS.map((w, i) => (
          <span
            key={i}
            style={{
              width: `${w}%`,
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '1px',
              animation: `${KEYFRAME.fadeInOut} calc(var(--rl-speed) * 1) ease-in-out ${(i * 0.08).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
