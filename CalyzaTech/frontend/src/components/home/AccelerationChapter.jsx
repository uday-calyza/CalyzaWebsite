import { motion } from 'framer-motion';
import { ACCELERATION_STORY } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

export default function AccelerationChapter() {
  return (
    <section
      id="acceleration"
      className="relative flex min-h-[160vh] items-end px-6 pb-[10vh] md:px-14"
      data-testid="chapter-acceleration"
    >
      <div className="max-w-xl max-md:rounded-lg max-md:bg-calyza-plum/50 max-md:p-5 max-md:backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-25% 0px' }}
          transition={{ duration: 1, ease }}
        >
          <p className="mb-5 flex items-baseline gap-4 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-calyza-violetB">
            <span className="text-xs font-light text-white/35">03</span>
            State 04 — Velocity
          </p>
          <h2 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-calyza-ivory sm:text-4xl lg:text-5xl">
            {ACCELERATION_STORY.headline}{' '}
            <span className="italic text-calyza-violetB">{ACCELERATION_STORY.headlineAccent}</span>
          </h2>
        </motion.div>

        <ul className="mt-12">
          {ACCELERATION_STORY.steps.map((step, i) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-20% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="flex items-baseline justify-between gap-6 border-t border-white/10 py-4"
              data-testid={`milestone-${step.id}`}
            >
              <span className="flex items-center gap-3 text-sm font-medium text-calyza-ivory">
                <span className="block h-1.5 w-1.5 rotate-45 bg-t-acc" />
                {step.label}
              </span>
              <span className="font-mono text-[11px] font-light text-calyza-ivory/45">{step.note}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
