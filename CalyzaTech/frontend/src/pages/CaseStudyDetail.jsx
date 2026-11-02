import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CASE_STUDIES, getCaseStudy } from '../data/caseStudies';
import CaseVisual from '../components/case-studies/CaseVisual';
import WorkflowDiagram from '../components/case-studies/WorkflowDiagram';
import Magnetic from '../components/Magnetic';
import useSeo from '../hooks/useSeo';

const ease = [0.16, 1, 0.3, 1];

function SectionLabel({ index, children }) {
  return (
    <p className="flex items-baseline gap-4 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
      <span className="text-xs font-light text-t-fg-mut">{index}</span>
      {children}
    </p>
  );
}

function Section({ index, label, testId, children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease }}
      className={`grid grid-cols-1 gap-8 border-t border-t-border py-16 md:py-20 lg:grid-cols-12 ${className}`}
      data-testid={testId}
    >
      <div className="lg:col-span-4">
        <SectionLabel index={index}>{label}</SectionLabel>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </motion.section>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  useSeo({
    title: study ? `${study.title} — Calyza Tech Case Study` : 'Case Study — Calyza Tech',
    description: study ? study.metaDescription : 'Calyza Tech case study.',
  });

  if (!study) return <Navigate to="/case-studies" replace />;

  const next = CASE_STUDIES[(CASE_STUDIES.indexOf(study) + 1) % CASE_STUDIES.length];

  return (
    <div className="bg-t-bg px-6 pb-28 pt-36 transition-colors duration-500 md:px-14 md:pt-44" data-testid="case-study-page">
      <article className="mx-auto max-w-[1600px]">
        {/* ---- Hero ---- */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl"
          data-testid="case-hero"
        >
          <Link
            to="/case-studies"
            data-testid="case-back-link"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut transition-colors duration-300 hover:text-t-acc"
          >
            <span aria-hidden="true">←</span> All case studies
          </Link>
          <p className="font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            Case Study — {study.industry}
          </p>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.04] tracking-tighter text-t-fg sm:text-5xl lg:text-6xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-t-fg-sec">{study.shortDescription}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="border border-t-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-t-fg-mut"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg-mut">
            <span>
              Client — <span className="text-t-fg">{study.client}</span>
            </span>
            <span>
              Industry — <span className="text-t-fg">{study.industry}</span>
            </span>
          </div>
          <span className="peach-line mt-10 block h-px w-40" aria-hidden="true" />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="mt-16 border border-t-border"
        >
          <CaseVisual motif={study.motif} className="aspect-[16/9] w-full" testId="case-hero-visual" />
        </motion.div>

        <div className="mt-20">
          {/* ---- The Challenge ---- */}
          <Section index="01" label="The Challenge" testId="case-challenge">
            <ul className="space-y-4">
              {study.challenge.map((item) => (
                <li key={item.slice(0, 32)} className="flex items-baseline gap-4 text-sm leading-relaxed text-t-fg-sec sm:text-base">
                  <span className="block h-px w-5 shrink-0 translate-y-[-4px] bg-t-acc" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* ---- The Business Problem ---- */}
          <Section index="02" label="The Business Problem" testId="case-business-problem">
            <p className="max-w-3xl font-display text-2xl font-light leading-snug tracking-tight text-t-fg sm:text-3xl">
              {study.businessProblem}
            </p>
          </Section>

          {/* ---- Our Approach ---- */}
          <Section index="03" label="Our Approach" testId="case-approach">
            <div className="grid grid-cols-1 gap-px border border-t-border bg-t-border sm:grid-cols-2">
              {study.approach.map((step, i) => (
                <div key={step.title} className="bg-t-bg p-7 transition-colors duration-300 hover:bg-t-surface-hover" data-testid={`approach-step-${i + 1}`}>
                  <span className="font-mono text-xs font-light text-t-acc">0{i + 1}</span>
                  <h3 className="mt-3 text-base font-medium text-t-fg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-t-fg-sec">{step.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ---- The Solution ---- */}
          <Section index="04" label="The Solution" testId="case-solution">
            <p className="max-w-3xl text-sm leading-relaxed text-t-fg-sec sm:text-base">{study.solution}</p>
          </Section>

          {/* ---- How It Works ---- */}
          <Section index="05" label="How It Works" testId="case-workflow">
            <WorkflowDiagram steps={study.workflow} />
          </Section>

          {/* ---- Technology ---- */}
          <Section index="06" label="Technology" testId="case-technology">
            <ul className="flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <li
                  key={tech}
                  className="border border-t-border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-t-fg-sec transition-colors duration-300 hover:border-t-acc hover:text-t-acc"
                  data-testid={`tech-${tech.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Section>

          {/* ---- Outcome ---- */}
          <Section index="07" label="Outcome" testId="case-outcome">
            <div className="grid grid-cols-1 gap-px border border-t-border bg-t-border sm:grid-cols-2">
              {study.outcomes.map((outcome) => (
                <div key={outcome.label} className="bg-t-bg p-7" data-testid={`outcome-${outcome.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <p className="font-display text-3xl font-light tracking-tight text-t-acc sm:text-4xl">{outcome.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-t-fg-sec">{outcome.label}</p>
                </div>
              ))}
            </div>
            {study.outcomeNote && (
              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-t-fg-sec">{study.outcomeNote}</p>
            )}
          </Section>
        </div>

        {/* ---- Key Takeaway ---- */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="border-t border-t-border py-20 md:py-28"
          data-testid="case-takeaway"
        >
          <p className="mb-10 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            Key Takeaway
          </p>
          <span className="block h-px w-24 bg-t-acc" aria-hidden="true" />
          <p className="mt-10 max-w-4xl font-display text-3xl font-light italic leading-snug tracking-tight text-t-fg sm:text-4xl lg:text-5xl">
            {study.keyTakeaway}
          </p>
        </motion.section>

        {/* ---- CTA ---- */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start gap-8 border border-t-border bg-t-surface p-8 transition-colors duration-500 md:p-14"
          data-testid="case-cta"
        >
          <p className="font-display text-3xl font-light leading-tight tracking-tight text-t-fg sm:text-4xl">
            Have a similar challenge? <span className="italic text-t-acc">Let&apos;s solve it.</span>
          </p>
          <Magnetic>
            <Link
              to="/contact"
              data-testid="case-cta-button"
              className="inline-flex items-center gap-3 rounded-full bg-t-btn px-9 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text transition-colors duration-300 hover:bg-t-btn-hover"
            >
              Talk to Calyza Tech
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
        </motion.section>

        {/* ---- Next case study ---- */}
        <Link
          to={`/case-studies/${next.slug}`}
          data-testid="case-next"
          className="group mt-20 flex items-center justify-between gap-6 border-t border-t-border pt-10"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">Next case study</p>
            <p className="mt-3 font-display text-2xl font-light tracking-tight text-t-fg transition-colors duration-300 group-hover:text-t-acc sm:text-3xl">
              {next.title}
            </p>
          </div>
          <span className="text-2xl text-t-acc transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">
            →
          </span>
        </Link>
      </article>
    </div>
  );
}
