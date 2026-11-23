import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import useSeo from '../hooks/useSeo';

const ease = [0.16, 1, 0.3, 1];

const AHM_REG_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=49zdMFVosU-H3t3GuhbA8jz1x1zHgkBNl-xWYYGP2-BUQjlKOTBCWEZKQVBFTlZZU1hCRjAyNzZZTi4u';

function RegisterBtn({ label = 'Reserve My Seat — Free', large = false, testId }) {
  return (
    <a
      href={AHM_REG_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      style={{ background: 'var(--cta-spectral)' }}
      className={`group relative inline-flex rounded-full p-[1.5px] transition-transform duration-[400ms] hover:scale-[1.025]`}
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

export default function AhmedabadEventPage() {
  const { theme } = useTheme();

  useSeo({
    title: 'Agentic AI on AWS: Executive Briefing — Ahmedabad, 2 December 2026',
    description:
      'Live demonstrations of Amazon Q and Kiro for senior enterprise leaders. 2 Dec 2026 · 6:00 PM – 10:30 PM · Ahmedabad. No cost to attend.',
  });

  return (
    <div
      className="relative overflow-hidden bg-t-bg px-6 pb-32 pt-40 text-t-fg transition-colors duration-500 md:px-14 md:pt-48"
      data-testid="ahmedabad-event-page"
    >
      {/* Ambient drift background */}
      <div className="drift-layer pointer-events-none absolute -inset-1/3 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1360px]">

        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-20">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Event type badge */}
            <div className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-t-acc">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-calyza-peach" aria-hidden="true" />
              Executive Briefing · In Person · Ahmedabad
            </div>

            {/* Headline — large impact */}
            <h1 className="mb-5 font-display font-light leading-[0.92] tracking-tighter">
              <span className="block text-2xl text-t-fg-sec sm:text-3xl">Agentic AI on AWS</span>
              <span
                className="block text-7xl sm:text-8xl lg:text-[7rem]"
                style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Amazon Q
              </span>
              <span
                className="block text-7xl sm:text-8xl lg:text-[7rem]"
                style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                &amp; Kiro
              </span>
              <span className="block text-3xl text-t-fg sm:text-4xl">Live — not slides.</span>
            </h1>

            {/* Lead */}
            <p className="mb-6 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
              An evening session for senior leaders on what agentic AI on AWS{' '}
              <strong className="font-medium text-t-fg">actually does in a business</strong> — and what
              it doesn't. Real use cases. Live demonstrations.
            </p>

            {/* ★ REGISTER BUTTON — above the fold, immediately visible */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <RegisterBtn large testId="hero-register-btn" />
              <p className="font-mono text-sm text-t-fg-mut">
                No cost to attend ·{' '}
                <strong className="font-medium text-calyza-peach">Limited seats</strong>
              </p>
            </div>

            {/* Event meta strip */}
            <div className="mb-8 flex flex-col overflow-hidden rounded-xl border border-t-border sm:flex-row">
              <MetaCell
                icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>}
                label="Date"
                value="Wednesday, 2 December 2026"
              />
              <MetaCell
                icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                label="Time"
                value="6:00 PM – 10:30 PM"
              />
              <MetaCell
                icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                label="Location"
                value="Ahmedabad, India"
              />
            </div>

            {/* Differentiator pills */}
            <div className="mb-6 flex flex-wrap gap-2.5">
              <DiffPill icon="▶">Live demonstrations</DiffPill>
              <DiffPill icon="🔒">Your data stays in AWS</DiffPill>
              <DiffPill icon="✓">Free discovery workshop</DiffPill>
            </div>

            {/* Why attend bullets */}
            <ul className="flex flex-col gap-4">
              <CheckItem>
                See <strong className="font-medium text-t-fg">Amazon Q and Kiro working live</strong> — not in a product video or a deck
              </CheckItem>
              <CheckItem>
                <strong className="font-medium text-t-fg">Your data stays inside your own AWS account</strong> — AWS does not use it to train models
              </CheckItem>
              <CheckItem>
                Attending organisations receive{' '}
                <strong className="font-medium text-t-fg">priority access to a complimentary discovery workshop</strong>{' '}
                to scope a Q or Kiro rollout
              </CheckItem>
            </ul>
          </motion.div>

          {/* Right column — event card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative overflow-hidden rounded-2xl border border-t-acc/20 bg-t-surface-elev"
            id="programme"
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgb(var(--accent-primary)) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-7">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-calyza-peach/25 bg-calyza-peach/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-calyza-peach">
                <span className="h-1 w-1 animate-pulse rounded-full bg-calyza-peach" aria-hidden="true" />
                In-person · Ahmedabad
              </div>

              <h3 className="mb-2 font-display text-xl font-light leading-tight text-t-fg">
                Agentic AI on AWS:<br />Executive Briefing
              </h3>
              <p className="mb-5 text-base leading-relaxed text-t-fg-sec">
                An evening for enterprise leaders who need to understand what agentic AI on AWS can actually do — and decide whether to act.
              </p>

              <div className="mb-5 h-px bg-t-border" />

              {/* Programme */}
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">Evening programme</p>
              <div className="flex flex-col gap-3">
                {[
                  ['6:00 PM', 'High tea on arrival. Informal networking.'],
                  ['7:00 PM', 'Session begins. Live demos: Amazon Q and Kiro on real enterprise scenarios.'],
                  ['9:00 PM', 'Dinner and networking with the Calyza team.'],
                  ['10:30 PM', 'Close.'],
                ].map(([time, desc]) => (
                  <div key={time} className="flex items-start gap-4">
                    <span className="mt-0.5 w-14 shrink-0 font-mono text-[10px] tracking-[0.1em] text-t-acc">{time}</span>
                    <span className="text-base leading-relaxed text-t-fg-sec">{desc}</span>
                  </div>
                ))}
              </div>

              <div className="my-5 h-px bg-t-border" />

              {/* Partner logos */}
              <div className="mb-5 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-full border border-t-border px-3 py-1.5">
                  <img
                    src="/aws-advanced-tier-services-partner.png"
                    alt="AWS Advanced Tier Services Partner"
                    className="h-3.5 object-contain opacity-60"
                    style={{ filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }}
                  />
                  <span className="font-mono text-[10px] text-t-fg-sec">AWS Advanced Tier</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-t-border px-3 py-1.5">
                  <img
                    src="/aws-generative-ai-competency.png"
                    alt="AWS Generative AI Competency"
                    className="h-3.5 object-contain opacity-60"
                    style={{ filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }}
                  />
                  <span className="font-mono text-[10px] text-t-fg-sec">AI Competency</span>
                </div>
              </div>

              {/* Workshop promo */}
              <div className="rounded-xl border border-calyza-mint/20 bg-calyza-mint/5 p-4">
                <p className="mb-1 text-xs font-semibold text-calyza-mint">Complimentary discovery workshop</p>
                <p className="text-xs leading-relaxed text-t-fg-sec">
                  Included for attending organisations — a scoped rollout plan for Q or Kiro in your environment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            DEMONSTRATIONS
        ═══════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="mt-28"
        >
          <SectionKicker>What you'll see</SectionKicker>
          <SectionHeading>
            Live demonstrations.<br />
            <em className="italic text-t-acc">Not a product video.</em>
          </SectionHeading>
          <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
            Every demonstration runs against realistic enterprise scenarios. You'll see the tools handle them in real time.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-t-border bg-t-border sm:grid-cols-2">
            {[
              {
                num: '01',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
                title: 'Amazon Q — Natural Language Across Your Business',
                body: 'Watch Amazon Q answer questions over internal documents, surface insights from operational data, and automate research workflows — no engineering required.',
                tag: 'Amazon Q',
              },
              {
                num: '02',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                title: 'Kiro — From Requirements to Running Code',
                body: 'Kiro takes a plain-English specification and produces design documents, task breakdowns, and working code. See how development teams move significantly faster on new features.',
                tag: 'Kiro',
              },
            ].map((d) => (
              <div key={d.num} className="bg-t-bg p-8 transition-colors duration-300 hover:bg-t-bg-sub">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc">{d.num}</p>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-t-acc-wash text-t-acc">
                  {d.icon}
                </div>
                <h3 className="mb-3 font-display text-2xl font-light leading-snug text-t-fg">{d.title}</h3>
                <p className="text-base leading-relaxed text-t-fg-sec">{d.body}</p>
                <span className="mt-4 inline-block rounded-full border border-t-acc/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-t-acc">
                  {d.tag}
                </span>
              </div>
            ))}

            {/* Full-width third card */}
            <div className="bg-t-bg p-8 transition-colors duration-300 hover:bg-t-bg-sub sm:col-span-2">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc">The differentiator</p>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-t-acc-wash text-t-acc">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-light leading-snug text-t-fg">Your Data Stays in Your Account</h3>
                </div>
                <div>
                  <p className="mb-4 text-base leading-relaxed text-t-fg-sec">
                    Both Amazon Q and Kiro operate entirely within your AWS account. Your documents, queries, and outputs never leave your environment, and AWS does not use your data to train its models.
                  </p>
                  <p className="mb-4 text-base leading-relaxed text-t-fg-sec">
                    We walk through the security architecture in plain terms — designed for senior decision-makers evaluating enterprise deployment.
                  </p>
                  <span className="inline-block rounded-full border border-t-acc/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-t-acc">
                    Security &amp; Privacy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            WORKSHOP
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
                Included for attending organisations
              </div>
              <SectionHeading>
                Complimentary<br />
                <em className="italic text-t-acc">discovery workshop.</em>
              </SectionHeading>
              <p className="mt-4 text-lg font-light leading-relaxed text-t-fg-sec">
                Every organisation that sends a senior leader receives{' '}
                <strong className="font-medium text-t-fg">priority access to a one-day discovery workshop</strong> — a scoped Q or Kiro rollout plan for your specific environment.
              </p>

              <ol className="mt-8 flex flex-col divide-y divide-t-border">
                {[
                  ['Map your current environment', 'We understand your AWS footprint, your data sources, and where your teams spend the most time on manual work.'],
                  ['Identify the highest-impact use cases', 'Based on what works at enterprises of your size and sector — not generic examples.'],
                  ['Produce a rollout scope document', 'A concrete plan your team can take to a business case or straight to procurement.'],
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

            {/* Workshop deliverables card */}
            <div className="rounded-2xl border border-calyza-mint/20 bg-t-surface p-8">
              <h3 className="mb-3 font-display text-2xl font-light text-t-fg">
                What the workshop <em className="italic text-calyza-mint">produces</em>
              </h3>
              <p className="mb-6 text-base leading-relaxed text-t-fg-sec">
                A clear, written output — not a sales document — that your team can act on immediately.
              </p>
              <ul className="mb-8 flex flex-col gap-3.5">
                {[
                  ['Use case shortlist', 'ranked by effort and business value for your specific context'],
                  ['Environment mapping', 'which of your data sources and workflows can connect to Q or Kiro today'],
                  ['Rollout scope document', 'suitable for internal sign-off or procurement'],
                  ['Indicative timeline and resource estimate', 'from the Calyza delivery team'],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-calyza-mint" aria-hidden="true" />
                    <span className="text-base leading-relaxed text-t-fg-sec">
                      <strong className="font-medium text-t-fg">{bold}</strong> — {rest}
                    </span>
                  </li>
                ))}
              </ul>
              <RegisterBtn label="Attend & claim the workshop" testId="workshop-register-btn" />
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
            Senior leaders at<br />
            <em className="italic text-t-acc">enterprise organisations.</em>
          </SectionHeading>
          <p className="mt-4 mb-10 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
            Organisations with more than 1,000 employees. The content is calibrated for authority, not technical depth.
          </p>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-t-border bg-t-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              { role: 'CEOs & Founders', desc: 'Understand the competitive implications of agentic AI and what a credible enterprise deployment looks like.' },
              { role: 'CTOs & CIOs', desc: 'See the AWS AI stack in production. Evaluate what your team can deploy and what it costs to run safely.' },
              { role: 'Chief Digital Officers', desc: 'Map where Q and Kiro fit into your digital transformation roadmap and how they change delivery velocity.' },
              { role: 'Operations Leaders', desc: 'Identify which document-heavy and manual workflows are the highest-value automation targets right now.' },
              { role: 'Finance & Risk Leaders', desc: 'Understand how to model AI ROI, assess security risk, and make a credible internal recommendation.' },
              { role: 'Heads of Strategy', desc: 'Build the picture of where agentic AI creates structural advantage in your sector and what the window of opportunity looks like.' },
            ].map((w) => (
              <div key={w.role} className="group border-t-2 border-transparent bg-t-bg p-7 transition-colors duration-300 hover:border-t-acc hover:bg-t-bg-sub">
                <h3 className="mb-2 font-display text-xl font-light text-t-fg">{w.role}</h3>
                <p className="text-base leading-relaxed text-t-fg-sec">{w.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-t-border bg-t-surface p-5 text-sm leading-relaxed text-t-fg-sec">
            <strong className="font-medium text-t-fg">Enterprise organisations only.</strong> Designed for companies with more than 1,000 employees. We keep the room small so the conversation is substantive.
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
          className="mt-28 overflow-hidden rounded-3xl border border-t-acc/20 bg-t-surface-elev p-12 text-center md:p-20"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-1/2 -translate-x-1/2 opacity-30"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgb(var(--accent-primary)) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <p className="mb-5 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-t-acc">
            <span className="h-px w-8 bg-t-acc" />No cost to attend · Limited seats<span className="h-px w-8 bg-t-acc" />
          </p>
          <h2 className="mb-5 font-display text-4xl font-light leading-[1.05] tracking-tighter text-t-fg sm:text-5xl lg:text-6xl">
            This is the year<br />your organisation{' '}
            <em className="italic text-t-acc">decides.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg font-light leading-relaxed text-t-fg-sec">
            The gap between companies that move on agentic AI in 2026 and those that wait is widening.
            This evening puts you in the room with the people, the demonstrations, and the plan to move with confidence.
          </p>
          <RegisterBtn label="Reserve My Seat — It's Free" large testId="closing-register-btn" />
          <p className="mt-6 font-mono text-[11px] text-t-fg-mut">
            Wednesday 2 December 2026 · 6:00 PM – 10:30 PM · Ahmedabad ·{' '}
            <strong className="font-medium text-calyza-peach">Limited seats</strong>
          </p>
        </motion.section>

      </div>
    </div>
  );
}
