'use client';

import { forwardRef, type CSSProperties } from 'react';
import { Skeleton, type SkeletonAnimation } from './Skeleton';
import { AvatarSkeleton } from './AvatarSkeleton';
import { TextSkeleton } from './TextSkeleton';
import { CardSkeleton } from './CardSkeleton';
import type { BaseLoaderProps } from '../../types';

/* ----------------------------------------------------------------- */
/* Shared helper                                                      */
/* ----------------------------------------------------------------- */

function commonProps(p: BaseLoaderProps) {
  return {
    animation: (p.skeletonAnimation ?? 'shimmer') as SkeletonAnimation,
    speed: p.speed,
  };
}

function toCss(v: number | string | undefined, fallback: string | number): string | number {
  if (v == null) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

/* ----------------------------------------------------------------- */
/* Simple full-width bar — most common skeleton pattern               */
/* ----------------------------------------------------------------- */

export const SkeletonBar = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonBar(
  props,
  ref,
) {
  return (
    <Skeleton
      ref={ref}
      width={toCss(props.width, '100%')}
      height={toCss(props.height, 18)}
      rounded
      className={props.className}
      style={props.style}
      aria-label={props['aria-label']}
      {...commonProps(props)}
    />
  );
});

/* ----------------------------------------------------------------- */
/* Image placeholder (landscape rectangle)                            */
/* ----------------------------------------------------------------- */

export const SkeletonImage = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonImage(
  props,
  ref,
) {
  return (
    <Skeleton
      ref={ref}
      width={toCss(props.width, '100%')}
      height={toCss(props.height, 140)}
      rounded={10}
      className={props.className}
      style={props.style}
      aria-label={props['aria-label'] ?? 'Loading image'}
      {...commonProps(props)}
    />
  );
});

/* ----------------------------------------------------------------- */
/* Button-shaped placeholder                                          */
/* ----------------------------------------------------------------- */

export const SkeletonButton = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonButton(
  props,
  ref,
) {
  return (
    <Skeleton
      ref={ref}
      width={toCss(props.width, 120)}
      height={toCss(props.height, 38)}
      rounded={10}
      className={props.className}
      style={props.style}
      aria-label={props['aria-label'] ?? 'Loading button'}
      {...commonProps(props)}
    />
  );
});

/* ----------------------------------------------------------------- */
/* Square (rounded) avatar                                            */
/* ----------------------------------------------------------------- */

export const SkeletonAvatarSquare = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function SkeletonAvatarSquare(props, ref) {
    const px =
      typeof props.width === 'number'
        ? props.width
        : typeof props.height === 'number'
          ? props.height
          : 56;
    return (
      <AvatarSkeleton
        ref={ref}
        size={px}
        shape="square"
        className={props.className}
        style={props.style}
        aria-label={props['aria-label'] ?? 'Loading avatar'}
        {...commonProps(props)}
      />
    );
  },
);

/* ----------------------------------------------------------------- */
/* Profile row — avatar + 2 lines (chat / contact item)               */
/* ----------------------------------------------------------------- */

export const SkeletonProfile = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonProfile(
  props,
  ref,
) {
  const common = commonProps(props);
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    width: toCss(props.width, 280),
    ...props.style,
  };
  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label={props['aria-label'] ?? 'Loading profile'}
      className={props.className}
      style={containerStyle}
    >
      <AvatarSkeleton size={44} {...common} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton height={11} width="65%" {...common} />
        <Skeleton height={9} width="40%" {...common} />
      </div>
    </div>
  );
});

/* ----------------------------------------------------------------- */
/* Vertical list — 3 profile rows                                     */
/* ----------------------------------------------------------------- */

export const SkeletonList = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonList(
  props,
  ref,
) {
  const common = commonProps(props);
  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label={props['aria-label'] ?? 'Loading list'}
      className={props.className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        width: toCss(props.width, 280),
        ...props.style,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AvatarSkeleton size={36} {...common} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton height={10} width={i % 2 === 0 ? '70%' : '55%'} {...common} />
            <Skeleton height={8} width={i % 2 === 0 ? '38%' : '50%'} {...common} />
          </div>
        </div>
      ))}
    </div>
  );
});

/* ----------------------------------------------------------------- */
/* 2x2 grid of image placeholders                                     */
/* ----------------------------------------------------------------- */

export const SkeletonGrid = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonGrid(
  props,
  ref,
) {
  const common = commonProps(props);
  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label={props['aria-label'] ?? 'Loading grid'}
      className={props.className}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        width: toCss(props.width, 220),
        ...props.style,
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} height={72} rounded={8} {...common} />
      ))}
    </div>
  );
});

/* ----------------------------------------------------------------- */
/* Chat-bubble + author + time                                        */
/* ----------------------------------------------------------------- */

export const SkeletonComment = forwardRef<HTMLDivElement, BaseLoaderProps>(function SkeletonComment(
  props,
  ref,
) {
  const common = commonProps(props);
  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label={props['aria-label'] ?? 'Loading comment'}
      className={props.className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        width: toCss(props.width, 280),
        ...props.style,
      }}
    >
      <AvatarSkeleton size={40} {...common} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Skeleton height={10} width={64} {...common} />
          <Skeleton height={10} width={40} {...common} />
        </div>
        <Skeleton height={9} width="100%" {...common} />
        <Skeleton height={9} width="86%" {...common} />
        <Skeleton height={9} width="58%" {...common} />
      </div>
    </div>
  );
});

/* ----------------------------------------------------------------- */
/* Paragraph — 5-line text block (longer than TextSkeleton's default) */
/* ----------------------------------------------------------------- */

export const SkeletonParagraph = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function SkeletonParagraph(props, ref) {
    return (
      <TextSkeleton
        ref={ref}
        lines={5}
        lineHeight={10}
        gap={10}
        lastLineWidth="45%"
        className={props.className}
        style={{ width: toCss(props.width, 320), ...props.style }}
        aria-label={props['aria-label'] ?? 'Loading paragraph'}
        {...commonProps(props)}
      />
    );
  },
);

/* ----------------------------------------------------------------- */
/* Registry-friendly wrappers for the originally-existing skeletons   */
/* (they take their own prop shapes, so they need a BaseLoaderProps   */
/*  adapter to fit the unified <Loader> dispatcher).                  */
/* ----------------------------------------------------------------- */

export const SkeletonTextWrapper = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function SkeletonTextWrapper(props, ref) {
    return (
      <TextSkeleton
        ref={ref}
        lines={3}
        lineHeight={12}
        className={props.className}
        style={{ width: toCss(props.width, 240), ...props.style }}
        aria-label={props['aria-label'] ?? 'Loading text'}
        {...commonProps(props)}
      />
    );
  },
);

export const SkeletonAvatarWrapper = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function SkeletonAvatarWrapper(props, ref) {
    const px =
      typeof props.width === 'number'
        ? props.width
        : typeof props.height === 'number'
          ? props.height
          : 56;
    return (
      <AvatarSkeleton
        ref={ref}
        size={px}
        shape="circle"
        className={props.className}
        style={props.style}
        aria-label={props['aria-label'] ?? 'Loading avatar'}
        {...commonProps(props)}
      />
    );
  },
);

export const SkeletonCardWrapper = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function SkeletonCardWrapper(props, ref) {
    return (
      <CardSkeleton
        ref={ref}
        width={toCss(props.width, 280)}
        className={props.className}
        style={props.style}
        aria-label={props['aria-label'] ?? 'Loading card'}
        {...commonProps(props)}
      />
    );
  },
);
