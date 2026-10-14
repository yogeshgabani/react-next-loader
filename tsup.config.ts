import { defineConfig } from 'tsup';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { KEYFRAMES_CSS } from './src/animations/keyframes';

const USE_CLIENT = '"use client";';

function prependUseClient(dir: string) {
  // Use withFileTypes to avoid a separate statSync per entry — the DTS build may
  // still be finalising hashed .d.cts files, and stat'ing a vanished one throws ENOENT.
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      prependUseClient(full);
      continue;
    }
    // Only runtime JS needs the directive; declaration files (.d.ts/.d.cts) are skipped.
    if (!/\.(js|cjs|mjs)$/.test(entry.name)) continue;
    let contents: string;
    try {
      contents = readFileSync(full, 'utf8');
    } catch {
      continue;
    }
    if (contents.startsWith(USE_CLIENT)) continue;
    writeFileSync(full, `${USE_CLIENT}\n${contents}`);
  }
}

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'loaders/index': 'src/components/loaders/index.ts',
    'skeletons/index': 'src/components/skeletons/index.ts',
    'progress/index': 'src/components/progress/index.ts',
    'theme/index': 'src/theme/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  banner: {
    js: USE_CLIENT,
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'framer-motion',
    'lottie-web',
    'lottie-react',
    'next',
    'react-router-dom',
    '@remix-run/react',
  ],
  async onSuccess() {
    const src = 'src/styles/base.css';
    const dest = 'dist/styles.css';
    mkdirSync(dirname(dest), { recursive: true });
    // Ship every keyframe in the standalone stylesheet so it can fully replace
    // runtime injection (e.g. under a strict CSP that blocks injected <style>).
    writeFileSync(dest, `${readFileSync(src, 'utf8')}\n/* Keyframes */${KEYFRAMES_CSS}`);
    prependUseClient('dist');
  },
});
