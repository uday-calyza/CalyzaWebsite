import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const ease = [0.16, 1, 0.3, 1];

/* The single closing CTA every page ends with. One per page — the site footer
   carries no CTA of its own. */
export default function ClosingCTA({ kicker, headline, headlineAccent, sub, primary, secondary }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease }}
      className="mt-28 border-t border-t-border pt-16"
      data-testid="closing-cta"
    >
      <span className="mb-8 block h-px w-28" style={{ background: 'var(--spectral)' }} />
      {kicker && (
        <p className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">{kicker}</p>
      )}
      <h2 className="max-w-3xl font-display text-3xl font-light leading-tight tracking-tight text-t-fg sm:text-5xl">
        {headline} {headlineAccent && <span className="italic text-t-acc">{headlineAccent}</span>}
      </h2>
      {sub && <p className="mt-4 max-w-md text-sm leading-relaxed text-t-fg-sec">{sub}</p>}
      <div className="mt-10 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
        <Magnetic>
          <Link
            to={primary.to}
            data-testid={primary.testId || 'closing-cta-primary'}
            className="rounded-full bg-t-btn px-8 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text transition-colors duration-300 hover:bg-t-btn-hover"
          >
            {primary.label}
          </Link>
        </Magnetic>
        {secondary && (
          <Magnetic>
            <Link
              to={secondary.to}
              data-testid={secondary.testId || 'closing-cta-secondary'}
              className="group relative rounded-full border border-t-border-strong px-8 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 hover:border-t-acc hover:text-t-fg"
            >
              {secondary.label}
            </Link>
          </Magnetic>
        )}
      </div>
    </motion.section>
  );
}
