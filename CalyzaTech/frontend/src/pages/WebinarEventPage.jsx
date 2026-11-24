import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSeo from '../hooks/useSeo';

const ease = [0.16, 1, 0.3, 1];

const WEB_REG_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=49zdMFVosU-H3t3GuhbA8jz1x1zHgkBNl-xWYYGP2-BUMDhCWktPSjJXR1k3QzZGM0kzMjAySjlDTi4u';

// 3 December 2026, 11:30 AM IST (UTC+5:30) = 06:00 UTC
const WEBINAR_DATE = new Date('2026-12-03T06:00:00Z');

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  return {
    days: Math.floor(timeLeft / 86400000),
    hours: Math.floor((timeLeft % 86400000) / 3600000),
    mins: Math.floor((timeLeft % 3600000) / 60000),
    secs: Math.floor((timeLeft % 60000) / 1000),
    started: timeLeft === 0,
  };
}

function CountdownTile({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-t-fg text-t-bg sm:h-20 sm:w-20">
        <span className="font-display text-3xl font-bold leading-none sm:text-4xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut">{label}</span>
    </div>
  );
}

function RegisterBtn({ label = "Register — It's Free", large = false, testId }) {
  return (
    <a
      href={WEB_REG_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className={`inline-flex items-center justify-center gap-3 rounded-full font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.03] hover:opacity-90 ${large ? 'px-10 py-5 text-sm' : 'px-8 py-4 text-[11px]'}`}
      style={{ background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' }}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
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

// Add real attendee quotes here: { quote: '...', by: 'Name, Role, Company' }
// The "Real People. Real Experiences." section only appears when this list is not empty.
const TESTIMONIALS = [];

const LEARN_ITEMS = [
  'Choose foundation models in Amazon Bedrock for your use case',
  'Connect Knowledge Bases to your own document estate',
  'Enforce content and security boundaries with Guardrails',
  'Watch an agent complete a multi-step task end to end',
  'Run natural-language analytics, no-code workflows and document research in Amazon Quick',
  'Go from requirements to design, tasks and code with Kiro',
];

const FAQ_ITEMS = [
  {
    q: 'Is the webinar live?',
    a: 'Yes. It runs live online on Thursday 3 December 2026, 11:30 AM – 12:30 PM IST. All three demonstrations are shown live, with no slideware.',
  },
  {
    q: 'Who is this webinar for?',
    a: 'CTOs, CIOs, Chief Digital Officers, Chief Data Officers, Heads of Engineering, Platform and Data, and Heads of Developer Productivity at organisations of 200 employees or more.',
  },
  {
    q: 'What will be demonstrated?',
    a: 'Amazon Bedrock, Amazon Quick and Kiro, each running against realistic enterprise scenarios.',
  },
  {
    q: 'Where does my data go?',
    a: 'It stays inside your own AWS account, and AWS does not use it to train models. We walk through this during the session.',
  },
  {
    q: 'Is there a next step after the webinar?',
    a: 'Yes. Attendees can book a complimentary two-week AWS Generative AI Readiness Assessment with our team.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-t-border">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-t-fg">{q}</span>
        <span
          className="shrink-0 text-t-acc transition-transform duration-75"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-75 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-base leading-relaxed text-t-fg-sec">{a}</p>
        </div>
      </div>
    </div>
  );
}

const sectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-8% 0px' },
  transition: { duration: 0.8, ease },
};

// Isolated so the per-second tick re-renders only this block, not the whole page
function HeroCountdown() {
  const { days, hours, mins, secs, started } = useCountdown(WEBINAR_DATE.getTime());
  if (started) return null;
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg-mut">Webinar starts in</p>
      <div className="flex gap-3">
        <CountdownTile value={days} label="Days" />
        <CountdownTile value={hours} label="Hours" />
        <CountdownTile value={mins} label="Mins" />
        <CountdownTile value={secs} label="Secs" />
      </div>
    </div>
  );
}

export default function WebinarEventPage() {
  useSeo({
    title: 'From Prompts to Agents: Building Agentic AI on AWS — Live Webinar, 3 December 2026',
    description:
      'Sixty minutes, three live demonstrations, no slideware. Amazon Bedrock, Amazon Quick and Kiro. Online · Thursday 3 December 2026 · 11:30 AM – 12:30 PM IST.',
  });

  return (
    <div
      className="relative overflow-hidden bg-t-bg px-6 pb-32 pt-40 text-t-fg transition-colors duration-500 md:px-14 md:pt-48"
      data-testid="webinar-event-page"
    >
      <div className="drift-layer pointer-events-none absolute -inset-1/3 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1360px]">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-t-acc">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-t-acc" aria-hidden="true" />
            Live Webinar · Online · 3 December 2026
          </div>

          <h1 className="mb-5 font-display font-light leading-[0.92] tracking-tighter">
            <span
              className="block text-7xl sm:text-8xl lg:text-[7rem]"
              style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              From Prompts
            </span>
            <span
              className="block text-7xl sm:text-8xl lg:text-[7rem]"
              style={{ background: 'var(--spectral)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              to Agents.
            </span>
            <span className="block text-3xl text-t-fg sm:text-4xl">Building Agentic AI on AWS.</span>
          </h1>

          <p className="mb-3 max-w-2xl text-lg font-light leading-relaxed text-t-fg-sec">
            Most AI pilots stop at a chatbot. This session is about what changes when a model can{' '}
            <strong className="font-medium text-t-fg">actually take action</strong>, and what has to be true before it works in production.
          </p>
          <p className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-t-fg-sec">
            Sixty minutes, three live demonstrations, no slideware.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-4">
            <RegisterBtn large testId="hero-register-btn" />
            <p className="font-mono text-sm text-t-fg-mut">Free · Online · Limited seats</p>
          </div>

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

          <HeroCountdown />
        </motion.div>

        {/* WHAT WE COVER */}
        <motion.section {...sectionMotion} className="mt-28" id="demos">
          <SectionKicker>What we cover</SectionKicker>
          <SectionHeading>
            Three products.<br />
            <em className="italic text-t-acc">Sixty minutes.</em>
          </SectionHeading>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-t-border bg-t-border sm:grid-cols-3">
            {[
              {
                num: 'Demo 01',
                title: 'Amazon Bedrock',
                body: 'Foundation models, Knowledge Bases over your own document estate, Guardrails, and an agent completing a multi-step task.',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
              },
              {
                num: 'Demo 02',
                title: 'Amazon Quick',
                body: 'Natural-language analytics, no-code workflows, and research across an internal document set.',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
              },
              {
                num: 'Demo 03',
                title: 'Kiro',
                body: 'Specification-driven development, from requirements through design and tasks to code.',
                icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
              },
            ].map((d) => (
              <div key={d.num} className="bg-t-bg p-7 transition-colors duration-300 hover:bg-t-bg-sub">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc">{d.num}</p>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-t-acc-wash text-t-acc">
                  {d.icon}
                </div>
                <h3 className="mb-3 font-display text-2xl font-light leading-snug text-t-fg">{d.title}</h3>
                <p className="text-base leading-relaxed text-t-fg-sec">{d.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CURRICULUM */}
        <motion.section {...sectionMotion} className="mt-28">
          <div className="mb-10 text-center">
            <SectionKicker>Curriculum</SectionKicker>
            <SectionHeading>
              What You'll See <em className="italic text-t-acc">in 60 Minutes</em>
            </SectionHeading>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
              Live, hands-on and focused on production. No slideware.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            {LEARN_ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-4 rounded-xl border border-t-border bg-t-surface p-5 transition-colors duration-300 hover:border-t-acc/40">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-t-acc-wash text-t-acc">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <p className="text-base leading-relaxed text-t-fg-sec">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <RegisterBtn label="Reserve My Seat — Free" large testId="curriculum-register-btn" />
            <p className="font-mono text-[10px] text-t-fg-mut">Limited seats · Live online webinar</p>
          </div>
        </motion.section>

        {/* WHO SHOULD ATTEND */}
        <motion.section {...sectionMotion} className="mt-28">
          <div className="mb-10 text-center">
            <SectionHeading>
              Is This Webinar <em className="italic text-t-acc">Right For You?</em>
            </SectionHeading>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light leading-relaxed text-t-fg-sec">
              Built for technology leaders at organisations of 200 employees or more.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-t-border bg-t-surface p-7" style={{ borderTop: '3px solid #22c55e' }}>
              <h3 className="mb-5 flex items-center gap-3 font-display text-2xl font-light text-t-fg">
                <span aria-hidden="true">✅</span> Who Should Attend
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  'CTOs',
                  'CIOs',
                  'Chief Digital Officers',
                  'Chief Data Officers',
                  'Heads of Engineering',
                  'Heads of Platform and Data',
                  'Heads of Developer Productivity',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-t-fg-sec">
                    <span className="font-bold text-green-500" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-t-border bg-t-surface p-7" style={{ borderTop: '3px solid #ef4444' }}>
              <h3 className="mb-5 flex items-center gap-3 font-display text-2xl font-light text-t-fg">
                <span aria-hidden="true">❌</span> Who Should Not Attend
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  'Anyone looking for slides and theory instead of live demonstrations',
                  'Anyone looking for a sales pitch rather than a working session',
                  'Anyone who is not interested in learning how AI works in production',
                  'Anyone expecting instant results without any follow-through',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-t-fg-sec">
                    <span className="font-bold text-red-500" aria-hidden="true">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* TESTIMONIALS — renders only when real attendee quotes are added to TESTIMONIALS */}
        {TESTIMONIALS.length > 0 && (
          <motion.section {...sectionMotion} className="mt-28">
            <div className="mb-10 text-center">
              <SectionHeading>
                Real People. <em className="italic text-t-acc">Real Experiences.</em>
              </SectionHeading>
              <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-t-fg-sec">
                These are individual experiences shared by attendees. Results are not typical, are not guaranteed, and vary from person to person.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <div key={t.quote} className="flex flex-col gap-3 rounded-xl border border-t-border bg-t-surface p-6">
                  <div className="text-lg tracking-widest text-yellow-400" aria-label="5 stars">★★★★★</div>
                  <p className="text-base italic leading-relaxed text-t-fg-sec">"{t.quote}"</p>
                  <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.18em] text-t-fg-mut">{t.by}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
              <RegisterBtn label="Yes! I Want to Join — Free" large testId="testimonials-register-btn" />
              <p className="font-mono text-[10px] text-t-fg-mut">Limited seats · Live online webinar</p>
            </div>
          </motion.section>
        )}

        {/* WHY ATTEND */}
        <motion.section {...sectionMotion} className="mt-28">
          <SectionKicker>Why attend</SectionKicker>
          <SectionHeading>
            See it working.<br />
            <em className="italic text-t-acc">Then decide.</em>
          </SectionHeading>

          <ul className="mt-10 flex max-w-3xl flex-col gap-5">
            <CheckItem>
              See <strong className="font-medium text-t-fg">all three products working live</strong>, against realistic enterprise scenarios.
            </CheckItem>
            <CheckItem>
              Understand exactly where your data goes. <strong className="font-medium text-t-fg">It stays inside your own AWS account</strong>, and AWS does not use it to train models.
            </CheckItem>
            <CheckItem>
              Attendees can book a{' '}
              <strong className="font-medium text-t-fg">complimentary two-week AWS Generative AI Readiness Assessment</strong>{' '}
              with our team.
            </CheckItem>
          </ul>

          <div className="mt-10">
            <RegisterBtn label="Reserve My Seat — Free" large testId="why-register-btn" />
          </div>
        </motion.section>

        {/* MEET THE SPEAKER */}
        <motion.section {...sectionMotion} className="mt-28">
          <div className="mb-10 text-center">
            <SectionKicker>Your host</SectionKicker>
            <SectionHeading>
              Meet the Expert<br />
              <em className="italic text-t-acc">Behind This Webinar</em>
            </SectionHeading>
          </div>

          <div className="mx-auto grid max-w-5xl items-start gap-10 rounded-3xl border border-t-border bg-t-surface p-6 md:p-10 lg:grid-cols-[320px_1fr] lg:gap-12">
            <div className="mx-auto w-full max-w-[320px] lg:pt-2">
              <div className="overflow-hidden rounded-2xl border border-t-border shadow-xl" style={{ background: '#f7f7f7' }}>
                <img
                  src="/team/uday-parmar-suit.jpg"
                  alt="Udeshang (Uday) Parmar, Founder of Calyza Tech"
                  className="block aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: '50% 0%' }}
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-t-acc/25 bg-t-acc-wash/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-t-acc">
                <span className="h-1 w-1 rounded-full bg-t-acc" aria-hidden="true" />
                Founder · Calyza Tech
              </div>
              <h3 className="mb-1 font-display text-3xl font-light text-t-fg sm:text-4xl">Udeshang (Uday) Parmar</h3>
              <p className="mb-5 text-sm text-t-fg-mut">Building an AI Factory for Industries · Founder, Calyza Tech · Ahmedabad</p>
              <p className="mb-4 text-base leading-relaxed text-t-fg-sec">
                For more than 18 years, Uday has built technology for enterprises across engineering, cloud, data and AI. He has worked with organisations including S&amp;P Global, BNP Paribas and CitiusTech, built large-scale data platforms, and led engineering teams. He helped grow a Generative AI practice from 4 to 13 engineers.
              </p>
              <p className="mb-4 text-base leading-relaxed text-t-fg-sec">
                Today he leads Calyza Tech's <strong className="font-medium text-t-fg">AI Factory</strong>: ready-to-deploy AI solutions for Healthcare and Financial Services, built around real business workflows instead of starting every engagement from scratch.
              </p>
              <p className="mb-6 text-base font-medium text-t-fg">
                Build the solution. Make it deployment-ready. Adapt it to the enterprise. Scale it.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  '18+ years building enterprise technology',
                  'Worked with S&P Global, BNP Paribas and CitiusTech',
                  'Scaled a Generative AI practice from 4 to 13 engineers',
                  'Built large-scale data platforms and led engineering teams',
                  'AI Factory for Healthcare and Financial Services',
                  'Founder of an AWS Advanced Tier Services Partner',
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-t-fg-sec">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-t-acc-wash text-t-acc" aria-hidden="true">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <RegisterBtn label="Register Now — It's Free" testId="mentor-register-btn" />
                <p className="mt-3 font-mono text-[10px] text-t-fg-mut">Limited seats · Live online webinar</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section {...sectionMotion} className="mt-28">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <SectionHeading>
                Frequently Asked <em className="italic text-t-acc">Questions</em>
              </SectionHeading>
              <p className="mt-4 text-base font-light leading-relaxed text-t-fg-sec">
                The answers to the things people ask most before joining.
              </p>
            </div>

            <div>
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <RegisterBtn label="Join the Live Webinar — Free" large testId="faq-register-btn" />
              <p className="font-mono text-[10px] text-t-fg-mut">Limited seats · Live online webinar</p>
            </div>
          </div>
        </motion.section>

        {/* FOOTER NOTE */}
        <p className="mt-20 text-center font-mono text-[11px] text-t-fg-mut">
          Calyza Tech is an AWS Advanced Tier Services Partner holding the AWS AI Services Competency.
        </p>

      </div>
    </div>
  );
}
