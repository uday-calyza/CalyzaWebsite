import { motion } from 'framer-motion';
import useSeo from '../hooks/useSeo';

const ease = [0.16, 1, 0.3, 1];

const WEB_REG_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=49zdMFVosU-H3t3GuhbA8jz1x1zHgkBNl-xWYYGP2-BUMDhCWktPSjJXR1k3QzZGM0kzMjAySjlDTi4u';

function RegisterBtn({ label = 'Register — It\'s Free', large = false, testId }) {
  return (
    <a
      href={WEB_REG_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      style={{ background: 'var(--cta-spectral)' }}
      className="group relative inline-flex rounded-full p-[1.5px] transition-transform duration-[400ms] hover:scale-[1.025]"
    >
      <span
        className={`relative flex items-center gap-3 overflow-hidden rounded-full bg-t-btn ${large ? 'px-10 py-5 text-sm' : 'px-8 py-4 text-[11px]'} font-medium uppercase tracking-[0.18em] text-t-btn-text transition-colors duration-[450ms] group-hover:bg-transparent group-hover:text-white`}
      >
        <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-out group-hover:left-[130%]" />
        <span className="relative">{label}</span>
        <span className="relative transition-transform duration-[400ms] group-hover:translate-x-1.5" aria-hidden="true">→</span>
      </span>
    </a>
  );
}

function MetaCell({ icon, label, value }) {
  return (
    <div className="flex flex-1 items-center gap-3 border-r border-t-border px-5 py-4 last:border-r-0">
      <span className="text-t-acc" aria-hidden="true">{icon}</span>
      <div>
        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.22em] text-t-fg-mut">{label}</div>
        <div className="text-[13px] font-medium leading-tight text-t-fg">{value}</div>
      </div>
    </div>
  );
}

function SectionKicker({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-t-acc">
      <span className="block h-px w-6 bg-t-acc" aria-hidden="true" />
      {children}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tighter text-t-fg sm:text-5xl lg:text-6xl">
      {children}
    </h2>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-t-acc-wash">
        <svg className="h-2.5 w-2.5 stroke-t-acc" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="text-base leading-relaxed text-t-fg-sec">{children}</span>
    </li>
  );
}

function DiffPill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-t-acc/20 bg-t-acc-wash/40 px-4 py-2 text-sm font-medium text-t-acc">
      <span aria-hidden="true">{icon}</span>
      {children}
    </span>
  );
}

export default function WebinarEventPage() {
  useSeo({
    title: 'From Prompts to Agents: Building Agentic AI on AWS — Live Webinar, 3 December 2026',
    description:
      '60 minutes. Three live demonstrations. No slideware. Amazon Bedrock, Amazon Q and Kiro — building agentic AI that works in production. Online · 3 Dec 2026 · 11:30 AM IST.',
  });

  return (
    <div
      className="relative overflow-hidden bg-t-bg px-6 pb-32 pt-40 text-t-fg transition-colors duration-500 md:px-14 md:pt-48"
      data-testid="webinar-event-page"
    >
      <div className="drift-layer pointer-events-none absolute -inset-1/3 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1360px]">

        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:gap-20">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Event type badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-t-acc">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-t-acc" aria-hidden="true" />
              Live Webinar · Online · 3 December 2026
            </div>

            {/* Headline */}
            <h1 className="mb-5 font-display font-light leading-[0.92] tracking-tighter">
              <span
                className="block text-7xl sm:text-8xl lg:text-[7rem]"
                style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                From prompts
              </span>
              <span
                className="block text-7xl sm:text-8xl lg:text-[7rem]"
                style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                to agents.
              </span>
              <span className="block text-3xl text-t-fg sm:text-4xl">Building Agentic AI on AWS.</span>
            </h1>

            {/* Lead */}
            <p className="mb-6 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
              Most AI pilots stop at a chatbot. This session is about what changes when a model can{' '}
              <strong className="font-medium text-t-fg">actually take action</strong> — and what has to be true before it works in production. Sixty minutes. Three live demonstrations. No slideware.
            </p>

            {/* ★ REGISTER BUTTON — above the fold */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <RegisterBtn large testId="hero-register-btn" />
              <p className="font-mono text-sm text-t-fg-mut">
                Free · 60 minutes ·{' '}
                <strong className="font-medium text-t-acc">Register for the link</strong>
              </p>
            </div>

            {/* Differentiator pills */}
            <div className="mb-6 flex flex-wrap gap-2.5">
              <DiffPill icon="▶">Three live demos</DiffPill>
              <DiffPill icon="🔒">Your data stays in AWS</DiffPill>
              <DiffPill icon="✓">Free readiness assessment</DiffPill>
            </div>

            {/* Why attend */}
            <ul className="flex flex-col gap-4">
              <CheckItem>
                See <strong className="font-medium text-t-fg">Amazon Bedrock, Amazon Q and Kiro working live</strong> against realistic enterprise scenarios
              </CheckItem>
              <CheckItem>
                <strong className="font-medium text-t-fg">Your data stays inside your own AWS account</strong> — AWS does not use it to train models
              </CheckItem>
              <CheckItem>
                Attendees can book a{' '}
                <strong className="font-medium text-t-fg">complimentary two-week AWS Generative AI Readiness Assessment</strong>{' '}
                with our team
              </CheckItem>
            </ul>

            {/* Event meta strip */}
            <div className="mb-8 flex flex-col overflow-hidden rounded-xl border border-t-border sm:flex-row">
              <MetaCell
                icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>}
                label="Date"
                value="Thursday, 3 December 2026"
              />
              <MetaCell
                icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                label="Time"
                value="11:30 AM – 12:30 PM IST"
              />
              <MetaCell
                icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                label="Format"
                value="Online · Free to attend"
              />
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#demos" className="text-base font-medium uppercase tracking-[0.15em] text-t-fg-sec transition-colors duration-300 hover:text-t-fg">
                See the demos ↓
              </a>
            </div>
          </motion.div>

          {/* Right column — registration card — same size as Ahmedabad card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative overflow-hidden rounded-2xl border border-t-acc/20 bg-t-surface-elev"
          >
            <div
              className="pointer-events-none absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, rgb(var(--accent-primary)) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative z-10 p-7">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-t-acc/25 bg-t-acc-wash/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-t-acc">
                <span className="h-1 w-1 animate-pulse rounded-full bg-t-acc" aria-hidden="true" />
                Live Webinar · Online
              </div>

              <h3 className="mb-3 font-display text-2xl font-light leading-tight text-t-fg">
                From Prompts to Agents:<br />Agentic AI on AWS
              </h3>
              <p className="mb-5 text-base leading-relaxed text-t-fg-sec">
                Three products demonstrated live. No slides. Production-focused, not hype.
              </p>

              <div className="mb-5 h-px bg-t-border" />

              {/* Demo list */}
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">Three live demonstrations</p>
              <div className="flex flex-col gap-4">
                {[
                  ['01', 'Amazon Bedrock', 'Foundation models, Knowledge Bases, Guardrails, multi-step agent task'],
                  ['02', 'Amazon Q', 'Natural-language analytics, no-code workflows, internal document research'],
                  ['03', 'Kiro', 'Specification-driven development: requirements → design → tasks → code'],
                ].map(([n, name, desc]) => (
                  <div key={n} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 shrink-0 font-mono text-[11px] tracking-[0.1em] text-t-acc">{n}</span>
                    <div>
                      <p className="text-base font-medium text-t-fg">{name}</p>
                      <p className="text-sm leading-relaxed text-t-fg-sec">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-5 h-px bg-t-border" />

              {/* Assessment */}
              <div className="rounded-xl border border-calyza-mint/20 bg-calyza-mint/5 p-4">
                <p className="mb-1.5 text-sm font-semibold text-calyza-mint">Complimentary readiness assessment</p>
                <p className="text-sm leading-relaxed text-t-fg-sec">
                  Attendees can book a free two-week AWS Generative AI Readiness Assessment after the webinar.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            WHY THIS IS DIFFERENT
        ═══════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="mt-28"
        >
          <SectionKicker>Why this is different</SectionKicker>
          <SectionHeading>
            Production-focused.<br />
            <em className="italic text-t-acc">Not hype.</em>
          </SectionHeading>
          <p className="mt-4 mb-10 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
            Every session shows the actual mechanics of production-grade agentic AI — not the marketing version.
          </p>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-t-border bg-t-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: '01', title: 'Three live demos', body: 'Amazon Bedrock, Amazon Q and Kiro — running against realistic scenarios in real time, no pre-recorded footage.' },
              { n: '02', title: 'From prompts to execution', body: 'The shift from a chatbot that responds to an agent that acts — completing multi-step tasks without manual intervention.' },
              { n: '03', title: 'Production-focused, not hype', body: 'Guardrails, security boundaries, knowledge architecture, and permissions — the parts that actually determine whether a deployment succeeds.' },
              { n: '04', title: 'Complimentary readiness assessment', body: 'Every attendee can book a free two-week AWS Generative AI Readiness Assessment — a concrete next step, not a sales call.' },
              { n: '05', title: 'Built for your audience', body: 'CTOs, CIOs, engineering leaders — content calibrated to your authority level, not entry-level awareness.' },
              { n: '06', title: '60 minutes, nothing wasted', body: 'No panel discussions, no Q&A padding. The session starts with the first demo and ends with a clear next step.' },
            ].map((h) => (
              <div key={h.n} className="group border-t-2 border-transparent bg-t-bg p-7 transition-colors duration-300 hover:border-t-acc hover:bg-t-bg-sub">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc">{h.n}</p>
                <h3 className="mb-2 font-display text-xl font-light text-t-fg">{h.title}</h3>
                <p className="text-base leading-relaxed text-t-fg-sec">{h.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            THREE DEMOS
        ═══════════════════════════════════════════════ */}
        <motion.section
          id="demos"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="mt-28"
        >
          <SectionKicker>What we demonstrate</SectionKicker>
          <SectionHeading>
            Three products.<br />
            <em className="italic text-t-acc">Sixty minutes.</em>
          </SectionHeading>
          <p className="mt-4 mb-10 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
            Each demonstration runs against a realistic enterprise scenario — the kind of problem your team is already thinking about.
          </p>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-t-border bg-t-border sm:grid-cols-3">
            {[
              {
                num: 'Demo 01', title: 'Amazon Bedrock',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
                body: 'Foundation model selection, Knowledge Bases connected to your own documents, Guardrails enforcing content and security boundaries, and an agent completing a multi-step task without manual prompting.',
                tag: 'Amazon Bedrock',
              },
              {
                num: 'Demo 02', title: 'Amazon Q',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
                body: 'Natural-language analytics over your business data, no-code workflow automation, and research across an internal document set — without any engineering setup.',
                tag: 'Amazon Q',
              },
              {
                num: 'Demo 03', title: 'Kiro',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                body: 'A plain-English requirement enters at one end. Design documents, task breakdowns, and working code come out the other. Watch a development team move significantly faster on a new feature.',
                tag: 'Kiro',
              },
            ].map((d) => (
              <div key={d.num} className="bg-t-bg p-7 transition-colors duration-300 hover:bg-t-bg-sub">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc">{d.num}</p>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-t-acc-wash text-t-acc">
                  {d.icon}
                </div>
                <h3 className="mb-3 font-display text-2xl font-light leading-snug text-t-fg">{d.title}</h3>
                <p className="mb-4 text-base leading-relaxed text-t-fg-sec">{d.body}</p>
                <span className="inline-block rounded-full border border-t-acc/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-t-acc">
                  {d.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Data security note */}
          <div className="mt-3 flex items-start gap-4 rounded-xl border border-t-border bg-t-surface p-5">
            <span className="mt-0.5 text-t-acc" aria-hidden="true">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            <p className="text-base leading-relaxed text-t-fg-sec">
              <strong className="font-medium text-t-fg">Your data stays in your account.</strong> All three products operate entirely within your AWS environment. Your documents, queries, and outputs never leave your boundaries, and AWS does not use your data to train models. We walk through the security architecture during the session.
            </p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            MID-PAGE CTA
        ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-t-acc/20 bg-t-surface p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc">Free · Online</p>
            <p className="text-base font-medium text-t-fg">3 demos, 60 minutes — register to get the link.</p>
          </div>
          <RegisterBtn testId="mid-register-btn" />
        </motion.div>

        {/* ═══════════════════════════════════════════════
            READINESS ASSESSMENT
        ═══════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="mt-28"
        >
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-calyza-mint/25 bg-calyza-mint/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-calyza-mint">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Free for all attendees
              </div>
              <SectionHeading>
                Complimentary<br />
                <em className="italic text-t-acc">Readiness Assessment.</em>
              </SectionHeading>
              <p className="mt-4 text-lg font-light leading-relaxed text-t-fg-sec">
                Every attendee can book a{' '}
                <strong className="font-medium text-t-fg">complimentary two-week AWS Generative AI Readiness Assessment</strong>{' '}
                with the Calyza team. We evaluate your environment against the requirements for production Bedrock, Q, and Kiro deployments.
              </p>

              <ol className="mt-8 flex flex-col divide-y divide-t-border">
                {[
                  ['Evaluate your AWS environment', 'We assess your existing AWS footprint against the prerequisites for running Bedrock agents, Q, and Kiro at the scale your organisation needs.'],
                  ['Identify your highest-value use cases', 'Based on what works at organisations of your size, sector, and technical maturity — not generic patterns.'],
                  ['Produce a written readiness report', 'A clear output your engineering and business teams can use to make a confident internal recommendation.'],
                ].map(([title, desc], i) => (
                  <div key={title} className="flex items-start gap-5 py-5">
                    <span className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-t-acc">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mb-1 text-sm font-medium text-t-fg">{title}</p>
                      <p className="text-base leading-relaxed text-t-fg-sec">{desc}</p>
                    </div>
                  </div>
                ))}
              </ol>
            </div>

            {/* Assessment deliverables card */}
            <div className="rounded-2xl border border-calyza-mint/20 bg-t-surface p-8">
              <h3 className="mb-3 font-display text-2xl font-light text-t-fg">
                What the assessment <em className="italic text-calyza-mint">produces</em>
              </h3>
              <p className="mb-6 text-base leading-relaxed text-t-fg-sec">
                A two-week engagement, fully remote, with a written deliverable at the end.
              </p>
              <ul className="mb-8 flex flex-col gap-3.5">
                {[
                  ['AWS environment gap analysis', "what's in place, what's missing, and what it takes to close the gap"],
                  ['Prioritised use case shortlist', 'ranked by implementation effort and expected business value'],
                  ['Security and data architecture review', 'covering Bedrock Guardrails, Knowledge Base controls, and Q permissions'],
                  ['Written readiness report', 'suitable for internal sign-off, with indicative timelines and resource estimates'],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-calyza-mint" aria-hidden="true" />
                    <span className="text-base leading-relaxed text-t-fg-sec">
                      <strong className="font-medium text-t-fg">{bold}</strong> — {rest}
                    </span>
                  </li>
                ))}
              </ul>
              <RegisterBtn label="Register to claim your assessment" testId="assess-register-btn" />
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            WHO SHOULD ATTEND
        ═══════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="mt-28"
        >
          <SectionKicker>Who this is for</SectionKicker>
          <SectionHeading>
            Engineering and AI leaders<br />
            <em className="italic text-t-acc">at scale.</em>
          </SectionHeading>
          <p className="mt-4 mb-10 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
            Technical and strategic decision-makers at organisations with 200 or more employees. The content assumes authority, not an introduction to AI.
          </p>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-t-border bg-t-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              { role: 'CTOs & CIOs', desc: 'Evaluate the AWS AI stack against your current architecture. Understand what it takes to deploy Bedrock, Q, and Kiro safely.' },
              { role: 'Chief Digital Officers', desc: 'Understand how agentic AI on AWS changes your digital transformation delivery cadence.' },
              { role: 'Chief Data Officers', desc: 'See how Knowledge Bases and Guardrails work against your document estate. Evaluate the data governance model.' },
              { role: 'Heads of Engineering', desc: 'Watch Kiro work and understand what it means for your team\'s velocity on new feature delivery.' },
              { role: 'Platform & Data Leads', desc: 'Understand the infrastructure requirements for running agentic AI workloads reliably at enterprise scale.' },
              { role: 'Heads of Developer Productivity', desc: 'See Kiro turn a specification into working code and evaluate what that means for your development lifecycle.' },
            ].map((w) => (
              <div key={w.role} className="group border-t-2 border-transparent bg-t-bg p-7 transition-colors duration-300 hover:border-t-acc hover:bg-t-bg-sub">
                <h3 className="mb-2 font-display text-xl font-light text-t-fg">{w.role}</h3>
                <p className="text-base leading-relaxed text-t-fg-sec">{w.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-t-border bg-t-surface p-5 text-sm leading-relaxed text-t-fg-sec">
            <strong className="font-medium text-t-fg">Organisations with 200 or more employees.</strong> The session is calibrated for teams already operating at scale — the security, data, and architecture discussions assume a real AWS environment.
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            CLOSING CTA
        ═══════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-28 overflow-hidden rounded-3xl border border-t-acc/20 bg-t-surface-elev p-12 text-center md:p-20"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-1/2 -translate-x-1/2 opacity-25"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgb(var(--accent-primary)) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <p className="mb-5 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-t-acc">
            <span className="h-px w-8 bg-t-acc" />60 minutes · Free · Online<span className="h-px w-8 bg-t-acc" />
          </p>
          <h2 className="mb-5 font-display text-4xl font-light leading-[1.05] tracking-tighter text-t-fg sm:text-5xl lg:text-6xl">
            See it working.<br />
            <em className="italic text-t-acc">Then decide.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg font-light leading-relaxed text-t-fg-sec">
            Most organisations are still evaluating. The ones that move in the next six months will set the trajectory for years. This hour gives you the evidence to make a confident call.
          </p>
          <RegisterBtn label="Register — It's Free" large testId="closing-register-btn" />
          <p className="mt-6 font-mono text-[11px] text-t-fg-mut">
            Thursday 3 December 2026 · 11:30 AM – 12:30 PM IST · Online ·{' '}
            <strong className="font-medium text-t-acc">Register to receive your link</strong>
          </p>
        </motion.section>

      </div>
    </div>
  );
}
