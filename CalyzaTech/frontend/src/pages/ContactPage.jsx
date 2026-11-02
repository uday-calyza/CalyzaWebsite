import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONTACT_PAGE } from '../data/content';
import Magnetic from '../components/Magnetic';
import { scrollToId } from '../components/SmoothScroll';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.16, 1, 0.3, 1];
const initialForm = { name: '', email: '', company: '', industry: '', message: '', timeline: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClass = 'mb-2 block font-mono text-[10px] font-normal uppercase tracking-[0.25em] text-t-fg-mut';

function fieldClass(hasError) {
  return `w-full border-b bg-transparent pb-3 text-sm text-t-fg outline-none transition-colors duration-300 placeholder:text-t-fg-mut/70 hover:border-t-border-strong focus:border-t-input-focus disabled:opacity-40 [&_option]:text-t-fg ${
    hasError ? 'border-t-error' : 'border-t-border-strong'
  }`;
}

/* Small calm crystal anchor — a mark, not a scene */
function CrystalMark() {
  return (
    <div className="float-slow" data-testid="contact-crystal" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="crystal-spin h-28 w-28" style={{ transformBox: 'fill-box' }}>
        <polygon
          points="60,14 100,60 60,106 20,60"
          fill="rgb(var(--accent-primary) / 0.06)"
          stroke="rgb(var(--accent-primary))"
          strokeWidth="1"
        />
        <path
          d="M60 14 L60 106 M20 60 L100 60 M60 14 L86 60 L60 106 L34 60 Z"
          stroke="rgb(var(--accent-secondary))"
          strokeWidth="0.5"
          fill="none"
          opacity="0.55"
        />
        <circle cx="60" cy="60" r="4" fill="rgb(var(--accent-tertiary))" fillOpacity="0.8" />
      </svg>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setFieldErrors((fe) => (fe[key] ? { ...fe, [key]: null } : fe));
  };

  const validate = () => {
    const fe = {};
    if (!form.name.trim()) fe.name = 'Your name is required.';
    if (!EMAIL_RE.test(form.email.trim())) fe.email = 'A valid work email is required.';
    if (!form.industry) fe.industry = 'Select an industry.';
    if (!form.message.trim()) fe.message = 'Tell us a little about the work.';
    if (!form.timeline) fe.timeline = 'Select a timeline.';
    return fe;
  };

  const submit = async (e) => {
    e.preventDefault();
    const fe = validate();
    setFieldErrors(fe);
    if (Object.keys(fe).length > 0) return;
    setSending(true);
    setError(false);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const FieldError = ({ k }) =>
    fieldErrors[k] ? (
      <p className="mt-2 text-[11px] tracking-wide text-t-error" data-testid={`contact-error-${k}`}>
        {fieldErrors[k]}
      </p>
    ) : null;

  return (
    <div
      className="relative overflow-hidden bg-t-bg px-6 pb-32 pt-40 text-t-fg transition-colors duration-500 md:pt-48"
      data-testid="contact-page"
    >
      <div className="drift-layer pointer-events-none absolute -inset-1/3 opacity-50" />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12 lg:gap-20">
        {/* ---- Left: quiet editorial hero ---- */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-5"
        >
          <p className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc-ter">
            {CONTACT_PAGE.kicker}
          </p>
          <h1 className="font-display text-4xl font-light leading-[1.02] tracking-tighter text-t-fg sm:text-5xl lg:text-6xl">
            {CONTACT_PAGE.headline}{' '}
            <span className="italic text-t-acc">{CONTACT_PAGE.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-t-fg-sec">{CONTACT_PAGE.sub}</p>

          <div className="mt-10 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId('#contact-form')}
                data-testid="contact-hero-cta"
                className="rounded-full bg-t-btn px-9 py-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text transition-colors duration-300 hover:bg-t-btn-hover"
              >
                {CONTACT_PAGE.cta}
              </button>
            </Magnetic>
            <Magnetic>
              <Link
                to={CONTACT_PAGE.secondaryCta.href}
                data-testid="contact-hero-secondary"
                className="group relative px-1 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-t-fg-sec transition-colors duration-300 hover:text-t-fg"
              >
                {CONTACT_PAGE.secondaryCta.label}
                <span className="absolute bottom-1 left-0 h-px w-full bg-t-border-strong" />
                <span className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-t-acc transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </Magnetic>
          </div>

          <p className="mt-10 font-mono text-[10px] font-light uppercase tracking-[0.25em] text-t-fg-mut">
            {CONTACT_PAGE.note}
          </p>

          {/* direct lines — email, phone, studio address */}
          <div className="mt-12 border-t border-t-border pt-8" data-testid="contact-direct">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">Direct</p>
            <div className="mt-5 flex flex-col gap-6">
              <a
                href="mailto:udeshang.parmar@calyzatech.com"
                data-testid="contact-direct-email"
                className="group block"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc-ter">
                  Email us
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
                <span className="mt-2 block font-display text-lg font-light tracking-tight text-t-fg-sec transition-colors duration-300 group-hover:text-t-fg">
                  udeshang.parmar@calyzatech.com
                </span>
              </a>
              <a href="tel:+919323188130" data-testid="contact-direct-call" className="group block">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc-ter">
                  Call us
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
                <span className="mt-2 block font-display text-lg font-light tracking-tight text-t-fg-sec transition-colors duration-300 group-hover:text-t-fg">
                  +91 9323188130
                </span>
              </a>
              <div data-testid="contact-direct-address" className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-t-acc-ter">Visit us</span>
                <span className="mt-2 block max-w-sm text-sm leading-relaxed text-t-fg-sec">
                  A208, Mondeal Heights, Sarkhej Gandhinagar Service Road, Near Wide Angle Cinema, Ramdevnagar, Satellite, Ahmedabad, Gujarat 380015
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 hidden lg:block">
            <CrystalMark />
          </div>
        </motion.header>

        {/* ---- Right: the form, on an elevated surface ---- */}
        <div className="lg:col-span-7">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="border border-t-border bg-t-surface p-8 md:p-12"
              data-testid="contact-success"
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="none"
                stroke="rgb(var(--success))"
                strokeWidth="1.2"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease }}
              >
                <circle cx="12" cy="12" r="10" />
                <motion.path
                  d="M8 12.5 L11 15.5 L16 9.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease }}
                />
              </motion.svg>
              <h2 className="mt-6 font-display text-3xl font-light tracking-tight text-t-fg">
                Message received.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-t-fg-sec">
                We read everything personally and reply quickly. The crystal has it from here.
              </p>
              <button
                onClick={() => {
                  setForm(initialForm);
                  setFieldErrors({});
                  setSent(false);
                }}
                data-testid="contact-send-another"
                className="group relative mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 hover:text-t-fg"
              >
                Send another message
                <span className="absolute -bottom-1 left-0 h-px w-full bg-t-border-strong" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-t-acc transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              id="contact-form"
              onSubmit={submit}
              noValidate
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="grid scroll-mt-32 grid-cols-1 gap-x-10 gap-y-10 border border-t-border bg-t-surface p-8 transition-colors duration-500 sm:grid-cols-2 md:p-12"
              data-testid="contact-form"
            >
              <label className="block">
                <span className={labelClass}>Name</span>
                <input type="text" value={form.name} onChange={update('name')} disabled={sending} placeholder="Your name" className={fieldClass(fieldErrors.name)} data-testid="contact-name-input" />
                <FieldError k="name" />
              </label>
              <label className="block">
                <span className={labelClass}>Work Email</span>
                <input type="email" value={form.email} onChange={update('email')} disabled={sending} placeholder="you@company.com" className={fieldClass(fieldErrors.email)} data-testid="contact-email-input" />
                <FieldError k="email" />
              </label>
              <label className="block">
                <span className={labelClass}>Company</span>
                <input type="text" value={form.company} onChange={update('company')} disabled={sending} placeholder="Company" className={fieldClass(false)} data-testid="contact-company-input" />
              </label>
              <label className="block">
                <span className={labelClass}>Industry</span>
                <select value={form.industry} onChange={update('industry')} disabled={sending} className={`${fieldClass(fieldErrors.industry)} appearance-none`} data-testid="contact-industry-select">
                  <option value="" disabled>Select industry</option>
                  {CONTACT_PAGE.industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                <FieldError k="industry" />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>What are you looking to build?</span>
                <textarea rows={3} value={form.message} onChange={update('message')} disabled={sending} placeholder="Tell us about the workflow, the bottleneck, the ambition." className={`${fieldClass(fieldErrors.message)} resize-none`} data-testid="contact-message-input" />
                <FieldError k="message" />
              </label>
              <label className="block">
                <span className={labelClass}>Timeline</span>
                <select value={form.timeline} onChange={update('timeline')} disabled={sending} className={`${fieldClass(fieldErrors.timeline)} appearance-none`} data-testid="contact-timeline-select">
                  <option value="" disabled>Select timeline</option>
                  {CONTACT_PAGE.timelines.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <FieldError k="timeline" />
              </label>
              <div className="flex items-end justify-between gap-6 sm:col-span-2">
                {error ? (
                  <p className="text-sm text-t-error" data-testid="contact-error">
                    Something interrupted the signal. Please try again.
                  </p>
                ) : (
                  <span />
                )}
                <Magnetic>
                  <button
                    type="submit"
                    disabled={sending}
                    data-testid="contact-submit-button"
                    className="inline-flex items-center gap-3 rounded-full bg-t-btn px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text transition-colors duration-300 hover:bg-t-btn-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending && (
                      <span className="rail-pulse block h-1.5 w-1.5 rounded-full bg-t-btn-text" aria-hidden="true" />
                    )}
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                </Magnetic>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
