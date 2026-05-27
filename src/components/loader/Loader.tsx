'use client';

import { Suspense } from 'react';
import { LOADER_REGISTRY, type LoaderType } from '../../registry';
import type { BaseLoaderProps } from '../../types';

export interface LoaderProps extends BaseLoaderProps {
  type?: LoaderType;
}

export function Loader({ type = 'spinner', ...rest }: LoaderProps) {
  const Component = LOADER_REGISTRY[type];
  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[react-next-loader] Unknown loader type "${type}". Falling back to "spinner".`,
      );
    }
    const Fallback = LOADER_REGISTRY.spinner;
    return (
      <Suspense fallback={null}>
        <Fallback {...rest} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={null}>
      <Component {...rest} />
    </Suspense>
  );
}
