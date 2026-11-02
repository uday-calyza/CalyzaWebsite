import { useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { useCrystal } from './crystal/CrystalController';
import { useTheme } from './ThemeProvider';
import { CRYSTAL_STATES } from '../data/content';

export default function CrystalScrollProgress() {
  const { progress, stageInView } = useCrystal();
  const { theme } = useTheme();
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    setActive(Math.min(CRYSTAL_STATES.length - 1, Math.floor(v * CRYSTAL_STATES.length)));
  });

  const darkEnv = theme === 'dark' || active >= 2;

  return (
    <aside
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 transition-opacity duration-500 lg:flex ${
        stageInView ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      data-testid="crystal-scroll-progress"
      aria-label="Crystal journey progress"
    >
      {CRYSTAL_STATES.map((s, i) => (
        <div key={s.id} className="flex items-center justify-end gap-3" data-testid={`progress-state-${s.id}`}>
          <span
            className={`font-mono text-[10px] uppercase transition-colors duration-500 ${
              active === i
                ? darkEnv
                  ? 'text-white'
                  : 'text-t-acc'
                : darkEnv
                  ? 'text-white/40'
                  : 'text-t-fg-mut'
            }`}
          >
            {s.index} — {s.label}
          </span>
          <span className="relative flex items-center">
            <span
              className={`block h-px transition-[width,background-color,box-shadow] duration-500 ${
                active === i
                  ? 'w-9 bg-gradient-to-r from-t-acc to-t-acc-sec shadow-[0_0_10px_rgb(var(--accent-primary)_/_0.5)]'
                  : `w-4 ${darkEnv ? 'bg-white/25' : 'bg-t-border-strong'}`
              }`}
            />
            {active === i && (
              <span className="rail-pulse absolute -right-1 block h-1 w-1 rounded-full bg-t-acc" />
            )}
          </span>
        </div>
      ))}
    </aside>
  );
}
