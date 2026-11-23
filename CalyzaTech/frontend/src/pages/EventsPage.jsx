import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';

const ease = [0.16, 1, 0.3, 1];

export default function EventsPage() {
  useSeo({
    title: 'Events — CalyzaTech',
    description:
      'Join Calyza Tech at upcoming live events and webinars on Agentic AI on AWS. Ahmedabad executive briefing on 2 December 2026 and live webinar on 3 December 2026.',
  });

  return (
    <div
      className="relative overflow-hidden bg-t-bg px-6 pb-32 pt-40 text-t-fg transition-colors duration-500 md:px-14 md:pt-48"
      data-testid="events-page"
    >
      <div className="drift-layer pointer-events-none absolute -inset-1/3 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1360px]">

        {/* Minimal header — just the kicker, no big title */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            Upcoming Events · December 2026
          </p>
        </motion.header>

        {/* Event cards */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Card 1 — Ahmedabad */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-t-border bg-t-surface transition-colors duration-300 hover:border-t-acc/40"
          >
            {/* Top accent line */}
            <div
              className="h-px w-full"
              style={{ background: 'var(--spectral)' }}
              aria-hidden="true"
            />

            <div className="flex flex-1 flex-col p-8">
              {/* Badges */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-calyza-peach/30 bg-calyza-peach/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-calyza-peach">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-calyza-peach" aria-hidden="true" />
                  In-Person
                </span>
                <span className="rounded-full border border-t-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut">
                  Ahmedabad
                </span>
                <span className="rounded-full border border-t-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut">
                  Free
                </span>
              </div>

              {/* Date + time */}
              <div className="mb-5 flex items-baseline gap-3">
                <span
                  className="font-display text-6xl font-light leading-none tracking-tighter"
                  style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  2
                </span>
                <div>
                  <div className="font-display text-xl font-light text-t-fg">December 2026</div>
                  <div className="font-mono text-[11px] text-t-fg-sec">Wednesday · 6:00 PM – 10:30 PM</div>
                </div>
              </div>

              {/* Title */}
              <h2 className="mb-3 font-display text-4xl font-light leading-snug text-t-fg">
                Agentic AI on AWS:<br />
                <em className="italic text-t-acc">Executive Briefing</em>
              </h2>

              <p className="mb-6 text-sm font-light leading-relaxed text-t-fg-sec">
                An evening for senior leaders at enterprise organisations. Live demonstrations of Amazon Q and Kiro — not a product video, not slides. High tea on arrival, dinner and networking after.
              </p>

              {/* Key points */}
              <ul className="mb-8 flex flex-col gap-2.5">
                {[
                  'Amazon Q & Kiro demonstrated live',
                  'Your data stays inside your own AWS account',
                  'Complimentary discovery workshop for attending organisations',
                  'Senior leaders at 1,000+ employee organisations',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-t-acc" aria-hidden="true" />
                    <span className="text-sm text-t-fg-sec">{point}</span>
                  </li>
                ))}
              </ul>

              {/* CTA — pushed to bottom */}
              <div className="mt-auto flex flex-wrap items-center gap-4">
                <Link
                  to="/event/ahmedabad"
                  style={{ background: 'var(--cta-spectral)' }}
                  className="group/btn relative inline-flex rounded-full p-[1.5px] transition-transform duration-[400ms] hover:scale-[1.025]"
                  data-testid="events-ahmedabad-link"
                >
                  <span className="relative flex items-center gap-2.5 overflow-hidden rounded-full bg-t-btn px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-t-btn-text transition-colors duration-[450ms] group-hover/btn:bg-transparent group-hover/btn:text-white">
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-out group-hover/btn:left-[130%]" />
                    <span className="relative">View &amp; Register</span>
                    <span className="relative transition-transform duration-[400ms] group-hover/btn:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Webinar */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-t-border bg-t-surface transition-colors duration-300 hover:border-t-acc/40"
          >
            {/* Top accent line */}
            <div
              className="h-px w-full"
              style={{ background: 'var(--spectral)' }}
              aria-hidden="true"
            />

            <div className="flex flex-1 flex-col p-8">
              {/* Badges */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-t-acc/30 bg-t-acc-wash/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-t-acc">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-t-acc" aria-hidden="true" />
                  Live Webinar
                </span>
                <span className="rounded-full border border-t-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut">
                  Online
                </span>
                <span className="rounded-full border border-t-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut">
                  Free
                </span>
              </div>

              {/* Date + time */}
              <div className="mb-5 flex items-baseline gap-3">
                <span
                  className="font-display text-6xl font-light leading-none tracking-tighter"
                  style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  3
                </span>
                <div>
                  <div className="font-display text-xl font-light text-t-fg">December 2026</div>
                  <div className="font-mono text-[11px] text-t-fg-sec">Thursday · 11:30 AM – 12:30 PM IST</div>
                </div>
              </div>

              {/* Title */}
              <h2 className="mb-3 font-display text-4xl font-light leading-snug text-t-fg">
                From Prompts to Agents:<br />
                <em className="italic text-t-acc">Building Agentic AI on AWS</em>
              </h2>

              <p className="mb-6 text-sm font-light leading-relaxed text-t-fg-sec">
                Sixty minutes, three live demonstrations, no slideware. Amazon Bedrock, Amazon Q, and Kiro — running against realistic enterprise scenarios in real time.
              </p>

              {/* Key points */}
              <ul className="mb-8 flex flex-col gap-2.5">
                {[
                  'Amazon Bedrock, Amazon Q & Kiro — all three live',
                  'Production-focused: Guardrails, security, knowledge architecture',
                  'Your data stays inside your own AWS account',
                  'Complimentary two-week AWS Generative AI Readiness Assessment',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-t-acc" aria-hidden="true" />
                    <span className="text-sm text-t-fg-sec">{point}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto flex flex-wrap items-center gap-4">
                <Link
                  to="/event/webinar"
                  style={{ background: 'var(--cta-spectral)' }}
                  className="group/btn relative inline-flex rounded-full p-[1.5px] transition-transform duration-[400ms] hover:scale-[1.025]"
                  data-testid="events-webinar-link"
                >
                  <span className="relative flex items-center gap-2.5 overflow-hidden rounded-full bg-t-btn px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-t-btn-text transition-colors duration-[450ms] group-hover/btn:bg-transparent group-hover/btn:text-white">
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-out group-hover/btn:left-[130%]" />
                    <span className="relative">View &amp; Register</span>
                    <span className="relative transition-transform duration-[400ms] group-hover/btn:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-10 font-mono text-[11px] text-t-fg-mut"
        >
          Calyza Tech is an AWS Advanced Tier Services Partner holding the AWS AI Services Competency.
        </motion.p>

      </div>
    </div>
  );
}
