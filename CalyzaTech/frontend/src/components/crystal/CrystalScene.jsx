import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import CrystalFallback from './CrystalFallback';
import ErrorBoundary from '../ErrorBoundary';
import { useCrystal } from './CrystalController';
import { useTheme } from '../ThemeProvider';

/* If the 3D chunk fails to load (network hiccup, stale cache), retry once,
   then degrade silently — the SVG fallback beneath stays visible. */
const lazyRetry = (factory) =>
  lazy(() =>
    factory().catch(() => factory()).catch(() => ({ default: () => null }))
  );

const CrystalCanvas = lazyRetry(() => import('./CrystalCanvas'));

function webglSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function CrystalScene() {
  const reduced = useReducedMotion();
  const { stageInView, progress } = useCrystal();
  const { theme } = useTheme();
  const [supported] = useState(webglSupported);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [fallbackGone, setFallbackGone] = useState(false);

  /* Once the 3D crystal is live and faded in, remove the SVG fallback entirely —
     this permanently stops its infinite spin animations and blur layer. */
  useEffect(() => {
    if (!ready) return undefined;
    const t = setTimeout(() => setFallbackGone(true), 1200);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const backdrop = useTransform(
    progress,
    [0, 0.12, 0.28, 0.5, 0.72, 0.86, 1],
    theme === 'dark'
      ? ['#050505', '#080808', '#0A0A0A', '#090909', '#070707', '#060606', '#050505']
      : ['#F7F5F2', '#F1ECE6', '#1C1613', '#171310', '#100D0B', '#0A0807', '#050505']
  );

  useEffect(() => {
    if (reduced || !supported) return undefined;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoad(true);
    };
    let id;
    if ('requestIdleCallback' in window) {
      id = window.requestIdleCallback(start, { timeout: 900 });
    } else {
      id = setTimeout(start, 120);
    }
    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [reduced, supported]);

  const show3D = load && supported && !reduced;

  return (
    <div className="absolute inset-0" data-testid="crystal-scene">
      <motion.div className="absolute inset-0" style={{ backgroundColor: backdrop }} />
      {fallbackGone ? null : (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <CrystalFallback />
        </div>
      )}
      {show3D && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ErrorBoundary name="crystal" fallback={null}>
            <Suspense fallback={null}>
              <CrystalCanvas onReady={() => setReady(true)} active={stageInView && !hidden} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
