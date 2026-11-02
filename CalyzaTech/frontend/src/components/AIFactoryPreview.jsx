import { motion } from 'framer-motion';
import { AI_FACTORY, AI_FACTORY_CTA } from '../data/content';
import SpectralCTA from './SpectralCTA';

const ease = [0.16, 1, 0.3, 1];

/* Chapter 06 — the crystal completes; a compact invitation into the flagship experience. */
export default function AIFactoryPreview() {
  return (
    <section
      className="relative flex min-h-[110vh] items-center justify-center px-6"
      data-testid="factory-invitation"
    >
      <div className="max-w-3xl text-center max-md:rounded-lg max-md:bg-calyza-plum/50 max-md:p-5 max-md:backdrop-blur-md">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: '-25% 0px' }}
          transition={{ duration: 0.9 }}
          className="mb-6 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-calyza-violetB"
        >
          The next system is ready.
        </motion.p>

        <h2 className="font-display text-4xl font-light leading-[1.02] tracking-tighter text-calyza-ivory sm:text-6xl">
          {['AI', 'FACTORY'].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ margin: '-25% 0px' }}
                transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-25% 0px' }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-calyza-ivory/60"
        >
          {AI_FACTORY.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-25% 0px' }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="mt-10 flex justify-center"
        >
          <SpectralCTA href={AI_FACTORY_CTA.href} label="Enter AI Factory" dark testId="enter-factory-cta" />
        </motion.div>
      </div>
    </section>
  );
}
