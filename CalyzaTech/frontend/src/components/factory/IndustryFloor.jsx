import { AnimatePresence, motion } from 'framer-motion';
import { FACTORY_FLOOR, FACTORY_MODES } from '../../data/factory';
import SystemLine from './SystemLine';
import FloorCaseStudies from './floor/FloorCaseStudies';
import FloorSolutions from './floor/FloorSolutions';
import FloorUseCases from './floor/FloorUseCases';

const ease = [0.16, 1, 0.3, 1];

/* THE INDUSTRY FLOOR — one floor per industry. The system line runs
   INPUT → INTELLIGENCE → OUTCOME; the three modes are INTERNAL navigation
   for the selected industry, never the global page structure. */
export default function IndustryFloor({ industry, mode, onSelectMode, openSolutionId, onToggleSolution }) {
  const floor = FACTORY_FLOOR[industry.id];
  const modeMeta = FACTORY_MODES.find((m) => m.id === mode);

  return (
    <motion.section
      key={industry.id}
      id="industry-floor"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.7, ease }}
      className="mt-16 scroll-mt-24"
      data-testid="industry-floor"
    >
      {/* floor header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: industry.accent[0] }}>
            Factory floor — {floor.number}
          </p>
          <h2 className="font-display text-4xl font-light leading-[1.0] tracking-tighter text-t-fg sm:text-5xl lg:text-6xl" data-testid="floor-title">
            {industry.name}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-t-fg-sec">{floor.tagline}</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg-mut">
          Floor {floor.number} / 04
        </p>
      </div>

      {/* the persistent system line */}
      <div className="mt-10">
        <SystemLine
          labels={{ input: 'Input', intelligence: 'Intelligence', outcome: 'Outcome' }}
          sublabels={floor.narrative}
          accent={industry.accent}
          pulseKey={`${industry.id}:${mode}`}
          caption={modeMeta?.tagline}
        />
      </div>

      {/* internal mode navigation — compact, segmented, architectural */}
      <div className="mt-10 inline-flex flex-wrap border border-t-border" role="tablist" aria-label="Floor sections" data-testid="floor-modes">
        {FACTORY_MODES.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              role="tab"
              aria-selected={active}
              data-testid={`floor-mode-${m.id}`}
              className={`relative px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 md:px-7 ${
                active ? 'text-t-fg' : 'text-t-fg-mut hover:text-t-fg-sec'
              }`}
            >
              <span className="mr-2" style={{ color: active ? industry.accent[0] : 'rgb(var(--text-muted))' }}>
                {m.number}
              </span>
              {m.label}
              {active && (
                <motion.span
                  layoutId="floor-mode-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${industry.accent[0]}, ${industry.accent[1]})` }}
                  transition={{ duration: 0.45, ease }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* mode content */}
      <div className="mt-8" data-testid="floor-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${industry.id}:${mode}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            {mode === 'case-studies' && <FloorCaseStudies industry={industry} onGotoSolutions={() => onSelectMode('ready-to-deploy')} />}
            {mode === 'ready-to-deploy' && (
              <FloorSolutions industry={industry} openSolutionId={openSolutionId} onToggle={onToggleSolution} />
            )}
            {mode === 'use-cases' && <FloorUseCases industry={industry} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
