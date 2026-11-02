import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

let lenis = null;

export function scrollToId(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    try {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    } catch (e) {
      console.error('[Calyza] smooth scroll unavailable, using native scroll', e);
      lenis = null;
      return undefined;
    }
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenis = null;
    };
  }, [reduced]);

  return children;
}
