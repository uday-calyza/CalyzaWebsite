import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HERO } from '../data/content';
import Magnetic from './Magnetic';
import SpectralCTA from './SpectralCTA';

const lineEase = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-end px-6 pb-14 md:px-14 md:pb-16"
      data-testid="hero-section"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mb-6 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc"
        data-testid="hero-overline"
      >
        {HERO.overline}
      </motion.p>

      <h1
        className="font-display text-4xl font-light leading-[1.02] tracking-tighter text-t-fg sm:text-6xl lg:text-7xl"
        data-testid="hero-headline"
      >
        {HERO.lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-1">
            <motion.span
              className={`block ${i === HERO.lines.length - 1 ? 'italic text-t-acc' : ''}`}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.45 + i * 0.14, ease: lineEase }}
            >
              {(() => {
                const idx = line.lastIndexOf('possibility.');
                if (i !== HERO.lines.length - 1 || idx < 0) return line;
                return (
                  <>
                    {line.slice(0, idx)}
                    <span className="possibility-breathe">possibility.</span>
                  </>
                );
              })()}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: lineEase }}
            className="max-w-md text-sm leading-relaxed text-t-fg-sec"
            data-testid="hero-subcopy"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: lineEase }}
            className="mt-8 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center"
          >
            <SpectralCTA href={HERO.primaryCta.href} testId="hero-cta-primary" />
            <Magnetic>
              <Link
                to={HERO.secondaryCta.href}
                data-testid="hero-cta-secondary"
                className="group relative px-1 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-t-fg-sec transition-colors duration-300 hover:text-t-fg"
              >
                {HERO.secondaryCta.label}
                <span className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-t-border-strong transition-transform duration-300 group-hover:scale-x-0" />
                <span className="absolute bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-t-acc transition-transform duration-300 delay-100 group-hover:scale-x-100" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center gap-4"
          data-testid="hero-scroll-cue"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-t-fg-mut">{HERO.cue}</span>
          <span className="relative block h-12 w-px overflow-hidden bg-t-border">
            <span className="scroll-cue-dot absolute left-0 top-0 block h-full w-px bg-t-acc" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
