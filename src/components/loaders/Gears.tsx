'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const COG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E";

/** Gears — two interlocking cogs turning in opposite directions. */
export const Gears = forwardRef<HTMLDivElement, BaseLoaderProps>(function Gears(props, ref) {
  const mask = `url("${COG}") center / contain no-repeat`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <span
          style={{
            position: 'absolute',
            top: '4%',
            left: '2%',
            width: '62%',
            height: '62%',
            background: 'var(--rl-color)',
            WebkitMask: mask,
            mask,
            animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '2%',
            right: '2%',
            width: '52%',
            height: '52%',
            background: 'color-mix(in srgb, var(--rl-color) 70%, transparent)',
            WebkitMask: mask,
            mask,
            animation: `${KEYFRAME.spinReverse} calc(var(--rl-speed) * 0.84) linear infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
