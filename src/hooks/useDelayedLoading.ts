'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseDelayedLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export function useDelayedLoading(
  loading: boolean,
  { delay = 200, minDuration = 400 }: UseDelayedLoadingOptions = {},
): boolean {
  const [shown, setShown] = useState(false);
  // Kept in a ref (not a local) so it survives the effect re-run triggered by
  // `setShown(true)` — otherwise elapsed time is measured from 0 and
  // `minDuration` is never enforced.
  const shownAtRef = useRef(0);

  useEffect(() => {
    if (loading) {
      if (shown) return;
      const showTimer = setTimeout(() => {
        shownAtRef.current = Date.now();
        setShown(true);
      }, delay);
      return () => clearTimeout(showTimer);
    }

    if (!shown) return;
    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, minDuration - elapsed);
    const hideTimer = setTimeout(() => setShown(false), remaining);
    return () => clearTimeout(hideTimer);
  }, [loading, delay, minDuration, shown]);

  return shown;
}
