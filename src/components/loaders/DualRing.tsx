'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const DualRing = forwardRef<HTMLDivElement, BaseLoaderProps>(function DualRing(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          // Longhand only: the `border` shorthand resets border colors on every
          // update, so mixing it with `borderTopColor` hides the ring when
          // `thickness` changes. `borderWidth` alone keeps the colors intact.
          borderStyle: 'solid',
          borderWidth: `${thickness}px`,
          borderColor: 'transparent',
          borderTopColor: 'var(--rl-color)',
          borderBottomColor: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.dualRing} var(--rl-speed) linear infinite`,
          boxSizing: 'border-box',
        }}
      />
    </LoaderBase>
  );
});
