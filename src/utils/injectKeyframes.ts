import { KEYFRAMES_CSS } from '../animations/keyframes';

let injected = false;

export function injectKeyframes(): void {
  if (injected) return;
  if (typeof document === 'undefined') return;

  const existing = document.querySelector('style[data-react-next-loader]');
  if (existing) {
    injected = true;
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('data-react-next-loader', '');
  style.textContent = KEYFRAMES_CSS;
  document.head.appendChild(style);
  injected = true;
}

// Auto-inject keyframes the moment this module is loaded.
// Required so that animations work on a component's FIRST paint —
// without this, useEffect-based injection ran *after* the browser had
// already painted the element with an animation pointing at a missing
// `@keyframes` rule, leaving the loader/skeleton frozen.
// Guarded against SSR via the `typeof document` check above.
injectKeyframes();
