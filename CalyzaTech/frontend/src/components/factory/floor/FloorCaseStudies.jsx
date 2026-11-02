import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../../../data/caseStudies';
import { FACTORY_CASE_MAP } from '../../../data/factory';

const ease = [0.16, 1, 0.3, 1];

/* FLOOR MODE 01 — CASE STUDIES. Documented work for THIS industry only:
   the challenge → what Calyza built → outcome. Verified data, honest states. */
export default function FloorCaseStudies({ industry, onGotoSolutions }) {
  const industries = FACTORY_CASE_MAP[industry.id] || [];
  const studies = CASE_STUDIES.filter((s) => industries.includes(s.industry));

  if (studies.length === 0) {
    return (
      <div className="border border-t-border p-8 md:p-10" data-testid="floor-case-empty">
        <span className="inline-block border border-t-border-strong px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-t-fg-sec">
          Case study in progress
        </span>
        <p className="mt-5 max-w-xl font-display text-xl font-light leading-snug text-t-fg sm:text-2xl">
          Documented {industry.name.toLowerCase()} engagements are being prepared for publication.
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-t-fg-sec">
          Until then, the solution rack and capability matrix show exactly how we would approach this industry —
          and a conversation shows you more.
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <button
            onClick={onGotoSolutions}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-t-acc"
            data-testid="floor-case-empty-solutions"
          >
            See the {industry.name.toLowerCase()} solution rack
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-t-fg-sec transition-colors hover:text-t-fg"
            data-testid="floor-case-empty-contact"
          >
            Talk to us
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="floor-case-studies">
      <div className="border-b border-t-border">
        {studies.map((study, i) => {
          const outcome = study.outcomes?.[0];
          return (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <Link
                to={`/case-studies/${study.slug}`}
                data-testid={`floor-case-${study.slug}`}
                className="group grid grid-cols-12 items-start gap-x-6 gap-y-3 border-t border-t-border py-6 pr-1 transition-colors duration-300 hover:bg-t-surface-hover"
              >
                <span className="col-span-12 lg:col-span-3">
                  <span className="block font-display text-lg font-light tracking-tight text-t-fg-sec transition-colors duration-300 group-hover:text-t-fg md:text-xl">
                    {study.shortName}
                  </span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-t-fg-mut">
                    {study.client}
                  </span>
                </span>
                <span className="col-span-12 lg:col-span-3">
                  <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.22em] text-t-fg-mut">The challenge</span>
                  <span className="block text-xs leading-relaxed text-t-fg-sec line-clamp-3">{study.challenge[0]}</span>
                </span>
                <span className="col-span-12 lg:col-span-3">
                  <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.22em] text-t-fg-mut">What Calyza built</span>
                  <span className="block text-xs leading-relaxed text-t-fg-sec line-clamp-3">{study.solution}</span>
                </span>
                <span className="col-span-10 lg:col-span-2">
                  <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.22em] text-t-fg-mut">Outcome</span>
                  {outcome && (
                    <>
                      <span className="block font-display text-lg font-light" style={{ color: industry.accent[0] }}>
                        {outcome.value}
                      </span>
                      <span className="block text-[10px] leading-snug text-t-fg-mut line-clamp-2">{outcome.label}</span>
                    </>
                  )}
                </span>
                <span className="col-span-2 self-center text-right text-t-fg-mut transition-all duration-300 group-hover:translate-x-1 group-hover:text-t-acc lg:col-span-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-t-fg-mut">
        Documented Calyza engagements — verified information only. Full stories live in the{' '}
        <Link to="/case-studies" className="text-t-acc underline-offset-4 hover:underline" data-testid="floor-case-archive">
          case archive →
        </Link>
      </p>
    </div>
  );
}
