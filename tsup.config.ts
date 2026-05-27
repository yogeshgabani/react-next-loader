import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const USE_CLIENT = '"use client";';

function prependUseClient(dir: string) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      prependUseClient(full);
      continue;
    }
    if (!/\.(js|cjs|mjs)$/.test(entry)) continue;
    const contents = readFileSync(full, 'utf8');
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
    copyFileSync(src, dest);
    prependUseClient('dist');
  },
});
