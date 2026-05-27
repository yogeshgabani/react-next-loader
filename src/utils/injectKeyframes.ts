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
