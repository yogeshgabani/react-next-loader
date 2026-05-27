'use client';

import { useEffect, useState } from 'react';

export interface UseDelayedLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export function useDelayedLoading(
  loading: boolean,
  { delay = 200, minDuration = 400 }: UseDelayedLoadingOptions = {},
): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let shownAt = 0;

    if (loading) {
      showTimer = setTimeout(() => {
        shownAt = Date.now();
        setShown(true);
      }, delay);
    } else if (shown) {
      const elapsed = Date.now() - shownAt;
      const remaining = Math.max(0, minDuration - elapsed);
      hideTimer = setTimeout(() => setShown(false), remaining);
    }

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [loading, delay, minDuration, shown]);

  return shown;
}
