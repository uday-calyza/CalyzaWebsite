import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CASE_FILTERS,
  CASE_STUDIES,
  CASE_STUDIES_LANDING,
  FEATURED_CASE,
  LATEST_SLUGS,
  getCaseStudy,
} from '../data/caseStudies';
import CaseCard from '../components/case-studies/CaseCard';
import CaseVisual from '../components/case-studies/CaseVisual';
import FilterBar from '../components/case-studies/FilterBar';
import { SplitReveal } from '../components/DynamicWord';
import useSeo from '../hooks/useSeo';
import ClosingCTA from '../components/ClosingCTA';

const ease = [0.16, 1, 0.3, 1];

function MetricChip({ metric }) {
  return (
    <span className="inline-flex items-baseline gap-2 border border-t-border px-3.5 py-2" data-testid="story-metric">
      <span className="font-display text-xl font-light text-t-acc">{metric.value}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-t-fg-mut">{metric.label}</span>
    </span>
  );
}

function StoryMeta({ study }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg-mut">
      {study.client} — {study.industry}
    </p>
  );
}

function StoryLink({ slug }) {
  return (
    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg transition-colors duration-300 group-hover:text-t-acc">
      View case study
      <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
    </span>
  );
}

/* Distinct editorial compositions per story — driven by the data model's `layout` */
function StoryFeature({ study, index }) {
  const base = 'group border border-t-border bg-t-surface transition-colors duration-500';

  if (study.layout === 'split') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-8% 0px' }}
        transition={{ duration: 0.8, ease }}
        data-testid={`story-${study.slug}`}
      >
        <Link to={`/case-studies/${study.slug}`} className={`${base} grid grid-cols-1 md:grid-cols-2`} aria-label={`Case study: ${study.title}`}>
          <div className="flex flex-col p-8 md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-acc">0{index + 2}</p>
            <StoryMeta study={study} />
            <h3 className="mt-4 font-display text-2xl font-light leading-snug tracking-tight text-t-fg sm:text-3xl">{study.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-t-fg-sec">{study.shortDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <span key={t} className="border border-t-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-t-fg-mut">{t}</span>
              ))}
            </div>
            <StoryLink slug={study.slug} />
          </div>
          <div className="overflow-hidden border-t border-t-border md:border-l md:border-t-0">
            <div className="h-full transition-transform duration-300 group-hover:scale-[1.02]">
              <CaseVisual motif={study.motif} className="aspect-[4/3] h-full md:aspect-auto" testId={`story-visual-${study.slug}`} />
            </div>
          </div>
        </Link>
      </motion.section>
    );
  }

  if (study.layout === 'pipeline') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-8% 0px' }}
        transition={{ duration: 0.8, ease }}
        data-testid={`story-${study.slug}`}
      >
        <Link to={`/case-studies/${study.slug}`} className={`${base} block`} aria-label={`Case study: ${study.title}`}>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="p-8 md:col-span-4 md:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-acc">0{index + 2}</p>
              <StoryMeta study={study} />
              <MetricChip metric={study.metric} />
            </div>
            <div className="p-8 pt-0 md:col-span-8 md:p-12 md:pt-12">
              <h3 className="font-display text-2xl font-light leading-snug tracking-tight text-t-fg sm:text-3xl">{study.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-t-fg-sec">{study.shortDescription}</p>
              {/* pipeline strip */}
              <div className="mt-8 flex flex-wrap items-center gap-y-3">
                {study.workflow.map((w, i) => (
                  <span key={w.step} className="flex items-center">
                    <span className="border border-t-border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-t-fg-sec">{w.label}</span>
                    {i < study.workflow.length - 1 && <span className="px-2 text-t-acc" aria-hidden="true">→</span>}
                  </span>
                ))}
              </div>
              <StoryLink slug={study.slug} />
            </div>
          </div>
        </Link>
      </motion.section>
    );
  }

  /* 'architecture' — large visual-led composition (default for new stories) */
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease }}
      data-testid={`story-${study.slug}`}
    >
      <Link to={`/case-studies/${study.slug}`} className={`${base} grid grid-cols-1 lg:grid-cols-12`} aria-label={`Case study: ${study.title}`}>
        <div className="overflow-hidden lg:col-span-7">
          <div className="h-full transition-transform duration-300 group-hover:scale-[1.02]">
            <CaseVisual motif={study.motif} className="aspect-[16/10] h-full lg:aspect-auto" testId={`story-visual-${study.slug}`} />
          </div>
        </div>
        <div className="flex flex-col border-t border-t-border p-8 md:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-acc">0{index + 2}</p>
          <StoryMeta study={study} />
          <h3 className="mt-4 font-display text-2xl font-light leading-snug tracking-tight text-t-fg sm:text-3xl">{study.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-t-fg-sec">{study.shortDescription}</p>
          <div className="mt-6"><MetricChip metric={study.metric} /></div>
          <StoryLink slug={study.slug} />
        </div>
      </Link>
    </motion.section>
  );
}

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('ALL');

  useSeo({
    title: 'Case Studies — Calyza Tech',
    description: CASE_STUDIES_LANDING.sub,
  });

  const archive = useMemo(
    () =>
      CASE_STUDIES.filter(
        (c) => !c.featured && !LATEST_SLUGS.includes(c.slug) && (filter === 'ALL' || c.categories.includes(filter))
      ),
    [filter]
  );

  const latest = LATEST_SLUGS.map(getCaseStudy).filter(Boolean).filter((c) => !c.featured);

  return (
    <div className="bg-t-bg px-6 pb-28 pt-36 transition-colors duration-500 md:px-14 md:pt-44" data-testid="case-studies-page">
      <div className="mx-auto max-w-[1600px]">
        {/* ---- Hero ---- */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl"
        >
          <p className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            {CASE_STUDIES_LANDING.kicker}
          </p>
          <h1 className="font-display text-4xl font-light leading-[1.04] tracking-tighter text-t-fg sm:text-6xl lg:text-7xl">
            {CASE_STUDIES_LANDING.headlineA}{' '}
            <SplitReveal text={CASE_STUDIES_LANDING.headlineB} className="italic text-t-acc" delay={0.35} />
          </h1>
          <span className="peach-line mt-10 block h-px w-40" aria-hidden="true" />
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-t-fg-sec">{CASE_STUDIES_LANDING.sub}</p>
        </motion.header>

        {/* ---- Featured: strongest proof ---- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="mt-24"
          data-testid="featured-case"
        >
          <Link
            to={`/case-studies/${FEATURED_CASE.slug}`}
            className="group relative grid grid-cols-1 border border-t-border bg-t-surface transition-colors duration-500 lg:grid-cols-12"
            aria-label={`Featured case study: ${FEATURED_CASE.title}`}
          >
            <div className="flex flex-col p-8 md:p-12 lg:col-span-5">
              <p className="font-mono text-[10px] font-normal uppercase tracking-[0.25em] text-t-acc">
                Featured — {FEATURED_CASE.client} · {FEATURED_CASE.industry}
              </p>
              <h2 className="mt-5 font-display text-3xl font-light leading-tight tracking-tight text-t-fg sm:text-4xl">
                {FEATURED_CASE.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-t-fg-sec">{FEATURED_CASE.shortDescription}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {FEATURED_CASE.tags.map((tag) => (
                  <span key={tag} className="border border-t-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-t-fg-mut">
                    {tag}
                  </span>
                ))}
              </div>
              <StoryLink slug={FEATURED_CASE.slug} />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-t-acc transition-[width] duration-300 group-hover:w-full" aria-hidden="true" />
            </div>
            {/* metric-forward column */}
            <div className="grid grid-cols-2 gap-px border-t border-t-border bg-t-border lg:col-span-7 lg:border-l lg:border-t-0" data-testid="featured-metrics">
              {FEATURED_CASE.outcomes.map((o) => (
                <div key={o.label} className="bg-t-surface-elev p-7 transition-colors duration-500">
                  <p className="font-display text-3xl font-light tracking-tight text-t-acc sm:text-4xl">{o.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-t-fg-sec">{o.label}</p>
                </div>
              ))}
            </div>
          </Link>
        </motion.section>

        {/* ---- The four latest stories, each in its own composition ---- */}
        <div className="mt-24 space-y-6">
          {latest.map((study, i) => (
            <StoryFeature key={study.slug} study={study} index={i} />
          ))}
        </div>

        {/* ---- Archive ---- */}
        <div className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-5% 0px' }}
            transition={{ duration: 0.7, ease }}
            className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-t-acc">{CASE_STUDIES_LANDING.archiveKicker}</p>
              <h2 className="font-display text-2xl font-light tracking-tight text-t-fg sm:text-3xl">
                {CASE_STUDIES_LANDING.archiveHeadline}
              </h2>
            </div>
          </motion.div>
          <FilterBar filters={CASE_FILTERS} active={filter} onChange={setFilter} />
          <motion.div layout className="mt-10 grid grid-cols-1 gap-px border border-t-border bg-t-border sm:grid-cols-2 lg:grid-cols-3" data-testid="case-grid">
            <AnimatePresence mode="popLayout">
              {archive.map((study, i) => (
                <CaseCard key={study.slug} study={study} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
          {archive.length === 0 && (
            <p className="py-20 text-center font-mono text-xs uppercase tracking-[0.25em] text-t-fg-mut" data-testid="case-grid-empty">
              No archived case studies in this category yet — see the featured stories above.
            </p>
          )}
          <ClosingCTA
            kicker="Contact"
            headline="Have a problem"
            headlineAccent="like these?"
            sub="Tell us where AI could create the most leverage in your business."
            primary={{ label: 'Book an AI strategy call', to: '/contact', testId: 'cases-closing-cta' }}
          />
        </div>
      </div>
    </div>
  );
}
