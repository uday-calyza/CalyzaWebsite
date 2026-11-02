import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import SpectralCTA from './SpectralCTA';

const ease = [0.16, 1, 0.3, 1];

/* The closing scene — the journey is complete; now start the conversation.
   A quiet, static near-black environment in both themes with a restrained
   spectral light. One CTA row, generous air, no marquee, no second contact. */
export default function HomeClosing() {
  return (
    <section
      className="cv-auto relative overflow-hidden bg-t-section-dark text-calyza-ivory"
      data-testid="home-closing"
    >
      {/* subtle spectral light behind the content */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 28% 62%, rgb(var(--accent-primary) / 0.13), transparent 70%), radial-gradient(34% 30% at 76% 22%, rgb(var(--accent-tertiary) / 0.09), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[85vh] w-full max-w-[1600px] flex-col justify-center px-6 py-32 md:px-14 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-15% 0px', once: true }}
          transition={{ duration: 1, ease }}
        >
          <p className="mb-8 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-calyza-violetB">
            Contact
          </p>
          <h2 className="font-display text-5xl font-light leading-[0.98] tracking-tighter sm:text-6xl lg:text-8xl">
            Ready to build
            <span className="block italic text-calyza-violetB">what&apos;s next?</span>
          </h2>
          <p className="mt-9 max-w-md text-base leading-relaxed text-calyza-ivory/60">
            Tell us where AI could create the most leverage in your business.
          </p>
          <div className="mt-14 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
            <Magnetic>
              <Link
                to="/contact"
                data-testid="home-closing-primary"
                className="rounded-full bg-calyza-ivory px-9 py-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#0B0B0B] transition-colors duration-300 hover:bg-white"
              >
                Book an AI strategy call
              </Link>
            </Magnetic>
            <SpectralCTA href="/ai-factory" label="Enter AI Factory" dark testId="home-closing-secondary" />
          </div>

          {/* direct lines — the one place these details live */}
          <div className="mt-16 border-t border-white/10 pt-8" data-testid="home-closing-direct">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-calyza-ivory/40">Direct</p>
            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:gap-14">
              <a
                href="mailto:udeshang.parmar@calyzatech.com"
                data-testid="home-closing-email"
                className="group block"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-calyza-violetB">
                  Email us
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
                <span className="mt-2 block font-display text-lg font-light tracking-tight text-calyza-ivory/85 transition-colors duration-300 group-hover:text-calyza-ivory sm:text-xl">
                  udeshang.parmar@calyzatech.com
                </span>
              </a>
              <a href="tel:+919323188130" data-testid="home-closing-call" className="group block">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-calyza-violetB">
                  Call us
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
                <span className="mt-2 block font-display text-lg font-light tracking-tight text-calyza-ivory/85 transition-colors duration-300 group-hover:text-calyza-ivory sm:text-xl">
                  +91 9323188130
                </span>
              </a>
              <div data-testid="home-closing-address" className="block">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-calyza-violetB">
                  Visit us
                </span>
                <span className="mt-2 block max-w-[16rem] text-sm leading-relaxed text-calyza-ivory/60">
                  A208, Mondeal Heights, Satellite, Ahmedabad, Gujarat 380015
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* the journey's full stop — one small, calm crystal mark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="pointer-events-none absolute bottom-16 right-10 hidden md:block"
        aria-hidden="true"
        data-testid="home-closing-mark"
      >
        <div className="float-slow">
          <svg viewBox="0 0 120 120" className="crystal-spin h-24 w-24 opacity-70" style={{ transformBox: 'fill-box' }}>
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
      </motion.div>
    </section>
  );
}
