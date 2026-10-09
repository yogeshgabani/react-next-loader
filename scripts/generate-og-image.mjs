#!/usr/bin/env node
/**
 * Renders scripts/og-image.html → playground/public/og-image.png (1200×630)
 * with a locally installed Chrome / Edge in headless mode, so no extra npm
 * dependencies are needed. Vite copies playground/public/ into the build,
 * which makes the image available at <site>/og-image.png.
 *
 * Usage:
 *   npm run og:image
 *   CHROME_PATH="/path/to/chrome" npm run og:image   # custom browser path
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const template = resolve(root, 'scripts/og-image.html');
const output = resolve(root, 'playground/public/og-image.png');

const { LOCALAPPDATA, PROGRAMFILES, 'PROGRAMFILES(X86)': PROGRAMFILES_X86 } = process.env;
const candidates = [
  process.env.CHROME_PATH,
  // Windows
  PROGRAMFILES && join(PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'),
  PROGRAMFILES_X86 && join(PROGRAMFILES_X86, 'Google/Chrome/Application/chrome.exe'),
  LOCALAPPDATA && join(LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
  PROGRAMFILES_X86 && join(PROGRAMFILES_X86, 'Microsoft/Edge/Application/msedge.exe'),
  PROGRAMFILES && join(PROGRAMFILES, 'Microsoft/Edge/Application/msedge.exe'),
  // macOS
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  // Linux
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge',
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error(
    'Could not find Chrome, Chromium or Edge. Set CHROME_PATH to a Chromium-based browser and retry.',
  );
  process.exit(1);
}

mkdirSync(dirname(output), { recursive: true });
// Throwaway profile so the headless run never touches (or waits on) your real browser profile.
const profile = mkdtempSync(join(tmpdir(), 'rnl-og-'));

try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${profile}`,
      '--force-device-scale-factor=1',
      `--window-size=${WIDTH},${HEIGHT}`,
      `--screenshot=${output}`,
      pathToFileURL(template).href,
    ],
    { stdio: 'ignore', timeout: 60_000 },
  );
} finally {
  rmSync(profile, { recursive: true, force: true });
}

// Sanity-check the PNG header so a silent browser failure doesn't ship a broken image.
const png = existsSync(output) ? readFileSync(output) : null;
if (!png || png.toString('ascii', 1, 4) !== 'PNG') {
  console.error(`Screenshot failed — no valid PNG written to ${output}`);
  process.exit(1);
}
const w = png.readUInt32BE(16);
const h = png.readUInt32BE(20);
if (w !== WIDTH || h !== HEIGHT) {
  console.error(`Expected ${WIDTH}×${HEIGHT}, got ${w}×${h}. Check the browser's headless mode.`);
  process.exit(1);
}

console.log(`✓ og-image.png ${w}×${h} (${(png.length / 1024).toFixed(1)} KB) → ${output}`);
