import { useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { useCrystal } from '../crystal/CrystalController';
import { AWS_CREDIBILITY } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

/* TRANSFORM — the signature moment. The scene converges, compresses, holds its
   breath, pulses once, then reveals. Headline after the pulse; AWS badges last,
   as proof. All driven by the existing normalized journey progress. */
export default function TransformChapter() {
  const { progress } = useCrystal();
  const [show, setShow] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  useMotionValueEvent(progress, 'change', (v) => {
    const s = v > 0.79 && v < 0.94;
    setShow((prev) => (prev === s ? prev : s));
    const b = v > 0.84 && v < 0.94;
    setShowBadges((prev) => (prev === b ? prev : b));
  });

  /* The convergence line — Ecosystem and Velocity collapse toward Intelligence,
     then resolve into a single point. Subtle; not a progress bar. */
  const lineWrap = useTransform(progress, [0.66, 0.69, 0.9, 0.92], [0, 1, 1, 0]);
  const lineA = useTransform(progress, [0.69, 0.755], [1, 0.001]);
  const lineB = useTransform(progress, [0.725, 0.775], [1, 0.001]);
  const earlyLabels = useTransform(progress, [0.745, 0.775], [0.6, 0]);
  const intelLabel = useTransform(progress, [0.72, 0.755, 0.775, 0.795], [0, 1, 1, 0]);
  const pointIn = useTransform(progress, [0.775, 0.795], [0, 1]);

  return (
    <section
      id="transition"
      className="relative flex min-h-[175vh] items-end px-6 pb-[6vh] md:px-14"
      data-testid="chapter-transform"
    >
      <div className="max-w-3xl max-md:rounded-lg max-md:bg-calyza-plum/50 max-md:p-5 max-md:backdrop-blur-md">
        {/* convergence line — plays during the compression, before the reveal */}
        <motion.div
          style={{ opacity: lineWrap }}
          className="mb-12 flex w-full max-w-md items-center justify-end"
          data-testid="convergence-line"
          aria-hidden="true"
        >
          <motion.span
            style={{ opacity: earlyLabels }}
            className="shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] text-calyza-ivory/60"
          >
            Ecosystem
          </motion.span>
          <motion.span
            style={{ scaleX: lineA }}
            className="mx-4 h-px min-w-3 flex-1 origin-right bg-gradient-to-r from-white/25 to-[#9A62F5]/70"
          />
          <motion.span
            style={{ opacity: earlyLabels }}
            className="shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] text-calyza-ivory/60"
          >
            Velocity
          </motion.span>
          <motion.span
            style={{ scaleX: lineB }}
            className="mx-4 h-px min-w-3 flex-1 origin-right bg-gradient-to-r from-[#9A62F5]/70 to-[#27C7D9]"
          />
          <motion.span
            style={{ opacity: intelLabel }}
            className="shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] text-calyza-violetB"
          >
            Intelligence
          </motion.span>
          <motion.span
            style={{ opacity: pointIn, scale: pointIn }}
            className="ml-4 block h-1.5 w-1.5 shrink-0 rotate-45 bg-calyza-violetB"
          />
        </motion.div>

        <span className="mb-8 block h-px w-28" style={{ background: 'var(--spectral)' }} />

        <motion.p
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          initial={false}
          transition={{ duration: 0.9, ease }}
          className="mb-6 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-calyza-violetB"
        >
          05 — Transform
        </motion.p>
        <h2 className="font-display text-4xl font-light leading-[1.02] tracking-tighter text-calyza-ivory sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={false}
              animate={show ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 1.1, ease }}
            >
              From momentum
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="block italic text-calyza-violetB"
              initial={false}
              animate={show ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 1.1, delay: 0.12, ease }}
            >
              to intelligence.
            </motion.span>
          </span>
        </h2>
        <motion.p
          initial={false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="mt-6 max-w-md text-sm leading-relaxed text-calyza-ivory/65"
        >
          Everything we&apos;ve built — ecosystem, capability and acceleration — converges here.
        </motion.p>

        {/* the credibility cluster — proof attached to the achievement */}
        <div className="mt-14 border-t border-white/10 pt-9" data-testid="aws-credibility">
          <motion.p
            initial={false}
            animate={showBadges ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-calyza-ivory/45"
          >
            {AWS_CREDIBILITY.kicker}
          </motion.p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            {AWS_CREDIBILITY.badges.map((badge, i) => (
              <motion.div
                key={badge.testId}
                initial={false}
                animate={showBadges ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: showBadges ? i * 0.15 : 0, ease }}
                className="inline-flex w-fit items-center justify-center rounded-lg bg-[#F4F1EC] px-5 py-4"
                data-testid={badge.testId}
              >
                <img src={badge.src} alt={badge.alt} loading="lazy" className="h-14 w-auto md:h-[4.5rem]" />
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={false}
            animate={showBadges ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: showBadges ? 0.32 : 0, ease }}
            className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-calyza-ivory/50"
          >
            {AWS_CREDIBILITY.note}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
