'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Spinner = forwardRef<HTMLDivElement, BaseLoaderProps>(function Spinner(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          // Longhand only: mixing the `border` shorthand with `borderTopColor`
          // resets the top color to the track color whenever `thickness` (and
          // thus the shorthand) changes, making the spinner look static/faint.
          borderStyle: 'solid',
          borderWidth: `${thickness}px`,
          borderColor: 'color-mix(in srgb, var(--rl-color) 20%, transparent)',
          borderTopColor: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          boxSizing: 'border-box',
        }}
      />
    </LoaderBase>
  );
});
