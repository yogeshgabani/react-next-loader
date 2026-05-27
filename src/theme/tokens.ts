import type { ThemeTokens } from '../types';

export const lightTokens: ThemeTokens = {
  colorPrimary: '#7c3aed',
  colorSecondary: '#6366f1',
  colorAccent: '#06b6d4',
  colorBackground: '#ffffff',
  colorSurface: '#f3f4f6',
  colorText: '#111827',
  colorMuted: '#9ca3af',
  shadowGlow: '0 0 12px rgba(124, 58, 237, 0.5)',
  radius: '8px',
};

export const darkTokens: ThemeTokens = {
  colorPrimary: '#a78bfa',
  colorSecondary: '#818cf8',
  colorAccent: '#22d3ee',
  colorBackground: '#0b0b0f',
  colorSurface: '#1f2937',
  colorText: '#f9fafb',
  colorMuted: '#6b7280',
  shadowGlow: '0 0 16px rgba(167, 139, 250, 0.55)',
  radius: '8px',
};

export const TOKEN_TO_VAR: Record<keyof ThemeTokens, string> = {
  colorPrimary: '--rl-theme-primary',
  colorSecondary: '--rl-theme-secondary',
  colorAccent: '--rl-theme-accent',
  colorBackground: '--rl-theme-bg',
  colorSurface: '--rl-theme-surface',
  colorText: '--rl-theme-text',
  colorMuted: '--rl-theme-muted',
  shadowGlow: '--rl-theme-glow',
  radius: '--rl-theme-radius',
};

export function tokensToCssVars(tokens: ThemeTokens): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of Object.keys(tokens) as Array<keyof ThemeTokens>) {
    out[TOKEN_TO_VAR[key]] = tokens[key];
  }
  return out;
}
