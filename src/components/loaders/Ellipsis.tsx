'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DOT = {
  position: 'absolute' as const,
  top: '41%',
  width: '18%',
  height: '18%',
  borderRadius: '50%',
  background: 'var(--rl-color)',
};

/** Ellipsis — four dots grow, glide across, and shrink in a loop (lds-ellipsis). */
export const Ellipsis = forwardRef<HTMLDivElement, BaseLoaderProps>(function Ellipsis(props, ref) {
  const dur = 'calc(var(--rl-speed) * 0.6)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <span style={{ ...DOT, left: '8%', animation: `${KEYFRAME.ellipsisGrow} ${dur} ease infinite` }} />
        <span style={{ ...DOT, left: '8%', animation: `${KEYFRAME.ellipsisMove} ${dur} ease infinite` }} />
        <span style={{ ...DOT, left: '41%', animation: `${KEYFRAME.ellipsisMove} ${dur} ease infinite` }} />
        <span style={{ ...DOT, left: '74%', animation: `${KEYFRAME.ellipsisShrink} ${dur} ease infinite` }} />
      </span>
    </LoaderBase>
  );
});
