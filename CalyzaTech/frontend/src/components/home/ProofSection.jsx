import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SELECTED_WORK, getCaseStudy } from '../../data/caseStudies';

const ease = [0.16, 1, 0.3, 1];

export default function ProofSection() {
  return (
    <section
      className="cv-auto relative z-10 border-t border-t-border bg-t-bg-sub px-6 py-20 transition-colors duration-500 md:px-14 md:py-24"
      data-testid="proof-section"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-t-acc">Selected work</p>
            <h2 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-t-fg sm:text-4xl">
              Proof, <span className="italic text-t-acc">in production.</span>
            </h2>
          </div>
          <Link
            to="/case-studies"
            data-testid="proof-view-link"
            className="group relative self-start text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 hover:text-t-fg md:self-auto"
          >
            All case studies
            <span className="absolute -bottom-1 left-0 h-px w-full bg-t-border-strong" />
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-t-acc transition-transform duration-300 group-hover:scale-x-100" />
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </motion.div>

        {/* horizontal editorial sequence — one verified proof point per story */}
        <div className="mt-12">
          {SELECTED_WORK.map((item, i) => {
            const study = getCaseStudy(item.slug);
            if (!study) return null;
            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-8% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease }}
              >
                <Link
                  to={`/case-studies/${study.slug}`}
                  data-testid={`selected-work-${study.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="group grid grid-cols-1 items-baseline gap-2 border-t border-t-border py-7 transition-colors duration-300 last:border-b sm:grid-cols-12 sm:gap-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg-mut sm:col-span-2">
                    {study.client.split(' ')[0]}
                  </span>
                  <span className="font-display text-2xl font-light tracking-tight text-t-fg transition-transform duration-300 group-hover:translate-x-2 sm:col-span-3 sm:text-3xl">
                    {study.shortName}
                  </span>
                  <span className="text-sm leading-relaxed text-t-fg-sec sm:col-span-4">{item.line}</span>
                  <span className="font-display text-xl font-light italic text-t-acc sm:col-span-2 sm:text-right">
                    {study.metric.value}
                  </span>
                  <span className="hidden text-t-fg-mut transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-t-acc sm:col-span-1 sm:block sm:text-right" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut" data-testid="selected-work-note">
          Each proof point from its own engagement — not directly comparable.
        </p>
      </div>
    </section>
  );
}
