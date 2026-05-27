'use client';

import { forwardRef } from 'react';
import { Skeleton, type SkeletonProps } from './Skeleton';

export interface AvatarSkeletonProps extends Omit<SkeletonProps, 'circle'> {
  size?: number;
  shape?: 'circle' | 'square';
}

export const AvatarSkeleton = forwardRef<HTMLDivElement, AvatarSkeletonProps>(
  function AvatarSkeleton({ size = 48, shape = 'circle', ...rest }, ref) {
    return (
      <Skeleton
        ref={ref}
        width={size}
        height={size}
        circle={shape === 'circle'}
        rounded={shape === 'square' ? 8 : true}
        {...rest}
      />
    );
  },
);
