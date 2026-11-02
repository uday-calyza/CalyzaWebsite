import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICE_FAMILIES, SERVICES_PAGE } from '../data/services';
import Magnetic from '../components/Magnetic';
import useSeo from '../hooks/useSeo';

const ease = [0.16, 1, 0.3, 1];

/* Asymmetric directory offsets — the index reads as an editorial ledger. */
const OFFSETS = ['lg:ml-0', 'lg:ml-[7%]', 'lg:ml-[14%]', 'lg:ml-[7%]', 'lg:ml-0', 'lg:ml-[14%]'];

export default function ServicesPage() {
  useSeo({
    title: 'Services — Calyza Tech',
    description: SERVICES_PAGE.sub,
  });

  return (
    <div className="bg-t-bg px-6 pb-28 pt-36 transition-colors duration-500 md:px-14 md:pt-44" data-testid="services-page">
      <div className="mx-auto max-w-[1600px]">
        {/* ---- Hero ---- */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl"
        >
          <p className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            {SERVICES_PAGE.kicker}
          </p>
          <h1 className="font-display text-5xl font-light leading-[0.98] tracking-tighter text-t-fg sm:text-6xl lg:text-7xl">
            {SERVICES_PAGE.headline}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-t-fg-sec sm:text-base">{SERVICES_PAGE.sub}</p>
          <p className="mt-8 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-t-fg-mut">
            Services = what we build &amp; deliver.{' '}
            <Link to="/ai-factory" className="text-t-acc underline-offset-4 hover:underline" data-testid="services-factory-link">
              AI Factory = ready-to-deploy industry intelligence →
            </Link>
          </p>
        </motion.header>

        {/* ---- Directory of the six families ---- */}
        <div className="mt-20 border-b border-t-border" data-testid="services-directory">
          {SERVICE_FAMILIES.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-8% 0px' }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease }}
            >
              <Link
                to={`/services/${f.id}`}
                data-testid={`family-row-${f.id}`}
                className={`group relative block border-t border-t-border py-8 transition-colors duration-500 hover:bg-t-surface-hover md:py-10 ${OFFSETS[i]}`}
              >
                <span
                  className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ background: `linear-gradient(180deg, ${f.accent[0]}, ${f.accent[1]})` }}
                  aria-hidden="true"
                />
                <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 pl-4 md:pl-8">
                  <span className="col-span-2 font-mono text-xs tracking-[0.2em] text-t-fg-mut transition-colors duration-300 group-hover:text-t-acc md:col-span-1">
                    {f.number}
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <h2 className="font-display text-3xl font-light tracking-tight text-t-fg-sec transition-all duration-500 group-hover:translate-x-2 group-hover:text-t-fg md:text-5xl">
                      {f.name}
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-t-fg-mut">{f.tagline}</p>
                  </div>
                  <div className="col-span-12 flex items-center gap-6 md:col-span-4 md:justify-end">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-t-fg-mut">
                      {f.subs.length} capabilities
                    </span>
                    <span
                      className="text-t-fg-mut transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-t-acc"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ---- CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="mt-28 pt-4"
          data-testid="services-cta"
        >
          <h2 className="max-w-2xl font-display text-3xl font-light leading-tight tracking-tight text-t-fg sm:text-5xl">
            What should we build <span className="italic text-t-acc">together?</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-t-fg-sec">{SERVICES_PAGE.ctaSub}</p>
          <div className="mt-10 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
            <Magnetic>
              <Link
                to="/contact"
                data-testid="services-cta-primary"
                className="rounded-full bg-t-btn px-8 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text transition-colors duration-300 hover:bg-t-btn-hover"
              >
                Book an AI strategy call
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/ai-factory"
                data-testid="services-cta-secondary"
                className="group relative rounded-full border border-t-border-strong px-8 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 hover:border-t-acc hover:text-t-fg"
              >
                Enter AI Factory
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
