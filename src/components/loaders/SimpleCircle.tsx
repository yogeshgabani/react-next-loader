'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Simple Circle Loader — two opposing arcs (top and bottom) formed from a
 * transparent border with only the top/bottom edges colored, rotating.
 */
export const SimpleCircle = forwardRef<HTMLDivElement, BaseLoaderProps>(function SimpleCircle(
  props,
  ref,
) {
  // Default scales with the loader size so arcs stay proportional at every
  // size; an explicit `thickness` prop (px) always wins.
  const ring = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 8)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          // Longhand only — mixing the `border` shorthand with `borderTopColor`
          // breaks on updates: React re-applies the changed shorthand and resets
          // the colors to transparent, so changing `thickness` would hide the
          // arcs. Using `borderWidth` alone keeps the colors intact.
          borderStyle: 'solid',
          borderWidth: ring,
          borderTopColor: 'var(--rl-color)',
          borderRightColor: 'transparent',
          borderBottomColor: 'var(--rl-color)',
          borderLeftColor: 'transparent',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          boxSizing: 'border-box',
        }}
      />
    </LoaderBase>
  );
});
