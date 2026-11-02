import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AI_FACTORY } from '../data/content';
import { FACTORY_INDUSTRIES, FACTORY_MODES, FACTORY_PAGE, getFactoryIndustry, getFactorySolution } from '../data/factory';
import IndustryBays from '../components/factory/IndustryBays';
import IndustryFloor from '../components/factory/IndustryFloor';
import SystemLine from '../components/factory/SystemLine';
import ClosingCTA from '../components/ClosingCTA';
import useSeo from '../hooks/useSeo';
import { scrollToId } from '../components/SmoothScroll';

const ease = [0.16, 1, 0.3, 1];
const MODE_IDS = FACTORY_MODES.map((m) => m.id);

/* AI FACTORY — the flagship. Four industries are the primary structure;
   Case Studies / Ready-to-Deploy / Use Cases live INSIDE each industry's
   factory floor. No crystal, no 3D — typography, lines, panels, motion. */
export default function AIFactoryPage() {
  const [params, setParams] = useSearchParams();

  const industryParam = params.get('industry');
  const industryValid = FACTORY_INDUSTRIES.some((i) => i.id === industryParam);
  const solutionHit = params.get('solution') ? getFactorySolution(params.get('solution')) : null;

  /* Industry selection: explicit valid ?industry=, or derived from ?solution=. */
  const selectedId = industryValid ? industryParam : solutionHit ? solutionHit.industry.id : null;
  const industry = selectedId ? getFactoryIndustry(selectedId) : null;

  /* Internal mode (per floor): valid ?mode= wins; a solution deep link forces
     the rack; otherwise the floor opens on its first mode. */
  const modeParam = params.get('mode');
  const mode = solutionHit
    ? 'ready-to-deploy'
    : MODE_IDS.includes(modeParam)
      ? modeParam
      : 'case-studies';
  const openSolutionId =
    industry && solutionHit && solutionHit.industry.id === industry.id ? solutionHit.solution.id : null;

  useSeo({
    title: 'AI Factory — Calyza Tech',
    description: `${AI_FACTORY.tagline} ${FACTORY_PAGE.heroSub}`,
  });

  const selectIndustry = (id) => {
    if (!id) {
      setParams({}, { replace: true });
      return;
    }
    setParams({ industry: id });
    window.dispatchEvent(new CustomEvent('calyza:industry', { detail: id }));
    setTimeout(() => scrollToId('#industry-floor'), 280);
  };

  const selectMode = (m) => {
    const next = { industry: industry.id, mode: m };
    if (m === 'ready-to-deploy' && openSolutionId) next.solution = openSolutionId;
    setParams(next, { replace: true });
  };

  const toggleSolution = (id) => {
    if (openSolutionId === id) {
      setParams({ industry: industry.id, mode: 'ready-to-deploy' });
      return;
    }
    setParams({ industry: industry.id, mode: 'ready-to-deploy', solution: id });
    setTimeout(() => scrollToId(`[data-testid="solution-brief-${id}"]`), 380);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-t-bg text-t-fg transition-colors duration-500"
      data-testid="ai-factory-page"
    >
      {/* one quiet ambient wash — typography, lines and motion carry the page */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            'radial-gradient(46% 36% at 74% 14%, rgb(var(--accent-primary) / 0.08), transparent 70%)',
        }}
        data-testid="factory-ambient"
      />

      <div className="relative px-6 pb-28 pt-36 md:px-14 md:pt-44">
        <div className="mx-auto max-w-[1600px]">
          {/* ---- HERO ---- */}
          <motion.header
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-5xl font-light leading-[0.98] tracking-tighter text-t-fg sm:text-6xl lg:text-7xl">
              {AI_FACTORY.title}
            </h1>
            <p className="mt-4 font-display text-2xl font-light italic leading-snug text-t-acc sm:text-3xl">
              Industry-ready intelligence,
              <br />
              built to deploy.
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-t-fg-sec">{FACTORY_PAGE.heroSub}</p>
          </motion.header>

          {/* the hero system line — the factory's quiet signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="mt-14"
          >
            <SystemLine
              labels={{ input: 'Input', intelligence: 'Intelligence', outcome: 'Outcome' }}
              accent={['#5B1DB8', '#4169FF']}
              pulseKey="hero"
              caption="information → intelligence → action"
            />
          </motion.div>

          {/* ---- THE FOUR INDUSTRIES ---- */}
          <div className="mt-16">
            <p className="mb-6 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
              Choose a floor
            </p>
            <IndustryBays committedId={industry?.id || null} onSelect={selectIndustry} />
          </div>

          {/* ---- THE INDUSTRY FACTORY FLOOR ---- */}
          <AnimatePresence mode="wait">
            {industry && (
              <IndustryFloor
                key={industry.id}
                industry={industry}
                mode={mode}
                onSelectMode={selectMode}
                openSolutionId={openSolutionId}
                onToggleSolution={toggleSolution}
              />
            )}
          </AnimatePresence>

          {/* ---- ONE FINAL CTA ---- */}
          <ClosingCTA
            kicker={FACTORY_PAGE.ctaKicker}
            headline={FACTORY_PAGE.ctaHeadline}
            headlineAccent={FACTORY_PAGE.ctaHeadlineAccent}
            sub={FACTORY_PAGE.ctaSub}
            primary={{ label: FACTORY_PAGE.ctaPrimary, to: '/contact', testId: 'factory-cta-build' }}
            secondary={{ label: FACTORY_PAGE.ctaSecondary, to: '/contact', testId: 'factory-cta-contact' }}
          />
        </div>
      </div>
    </div>
  );
}
