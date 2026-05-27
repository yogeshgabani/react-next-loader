'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ThemeMode, ThemeTokens } from '../types';
import { darkTokens, lightTokens, tokensToCssVars } from './tokens';

export interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  tokens: ThemeTokens;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  mode?: ThemeMode;
  tokens?: Partial<{ light: Partial<ThemeTokens>; dark: Partial<ThemeTokens> }>;
  children: ReactNode;
  /** When true, the provider does not render a wrapper element — instead it
   *  sets CSS variables on `documentElement`. */
  scope?: 'wrapper' | 'document';
}

function useSystemMode(): 'light' | 'dark' {
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemMode(e.matches ? 'dark' : 'light');
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return systemMode;
}

export function ThemeProvider({
  mode: controlledMode,
  tokens: tokenOverrides,
  children,
  scope = 'wrapper',
}: ThemeProviderProps) {
  const [internalMode, setInternalMode] = useState<ThemeMode>(controlledMode ?? 'auto');
  const mode: ThemeMode = controlledMode ?? internalMode;
  const systemMode = useSystemMode();
  const resolvedMode: 'light' | 'dark' = mode === 'auto' ? systemMode : mode;

  const tokens = useMemo<ThemeTokens>(() => {
    const base = resolvedMode === 'dark' ? darkTokens : lightTokens;
    const override = tokenOverrides?.[resolvedMode] ?? {};
    return { ...base, ...override };
  }, [resolvedMode, tokenOverrides]);

  const cssVars = useMemo(() => tokensToCssVars(tokens), [tokens]);

  useEffect(() => {
    if (scope !== 'document' || typeof document === 'undefined') return;
    const root = document.documentElement;
    const applied: string[] = [];
    for (const [k, v] of Object.entries(cssVars)) {
      root.style.setProperty(k, v);
      applied.push(k);
    }
    return () => {
      for (const k of applied) root.style.removeProperty(k);
    };
  }, [cssVars, scope]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolvedMode, tokens, setMode: setInternalMode }),
    [mode, resolvedMode, tokens],
  );

  if (scope === 'document') {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  }

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-rl-theme={resolvedMode}
        style={{ display: 'contents', ...(cssVars as React.CSSProperties) }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx) return ctx;
  return {
    mode: 'light',
    resolvedMode: 'light',
    tokens: lightTokens,
    setMode: () => {},
  };
}
