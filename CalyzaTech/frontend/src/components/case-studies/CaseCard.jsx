import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CaseVisual from './CaseVisual';

const ease = [0.16, 1, 0.3, 1];

export default function CaseCard({ study, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease }}
      className="group relative bg-t-bg"
      data-testid={`case-card-${study.slug}`}
    >
      <Link
        to={`/case-studies/${study.slug}`}
        className="flex h-full flex-col transition-transform duration-300 group-hover:-translate-y-1"
        aria-label={`View case study: ${study.title}`}
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-300 group-hover:scale-[1.02]">
            <CaseVisual motif={study.motif} className="aspect-[4/3]" testId={`case-visual-${study.slug}`} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <p className="font-mono text-[10px] font-normal uppercase tracking-[0.25em] text-t-acc">
            {study.industry}
          </p>
          <h3 className="mt-3 font-display text-xl font-light leading-snug tracking-tight text-t-fg transition-colors duration-300 sm:text-2xl">
            {study.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-t-fg-sec">{study.shortDescription}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="border border-t-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-t-fg-mut"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 group-hover:text-t-acc">
            View Case Study
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </div>

        <span
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-t-acc transition-[width] duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  );
}
