import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function CrystalChapter({ id, number, state, kicker, title, copy, caption, minH, dark = false }) {
  if (caption) {
    return (
      <section
        id={id}
        className={`relative flex ${minH || 'min-h-[90vh]'} items-center justify-center px-6`}
        data-testid={`chapter-${id}`}
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-35% 0px' }}
          transition={{ duration: 1, ease }}
          className={`font-display text-2xl font-light italic sm:text-3xl ${
            dark ? 'text-calyza-ivory/75' : 'text-calyza-plum/60'
          }`}
        >
          {title}
        </motion.p>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`relative flex ${minH || 'min-h-[115vh]'} items-end px-6 pb-[16vh] md:px-14`}
      data-testid={`chapter-${id}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-25% 0px' }}
        transition={{ duration: 1.1, ease }}
        className={`max-w-xl max-md:-m-5 max-md:rounded-lg max-md:p-5 max-md:backdrop-blur-md ${
          dark ? 'max-md:bg-calyza-plum/50' : 'max-md:bg-t-bg/60'
        }`}
      >
        <p
          className={`mb-5 flex items-baseline gap-4 text-[11px] font-medium uppercase tracking-[0.3em] ${
            dark ? 'text-calyza-violetB' : 'text-t-acc-sec'
          }`}
        >
          <span
            className={`font-mono text-xs font-light ${
              dark ? 'text-white/35' : 'text-calyza-plum/45'
            }`}
          >
            {number}
          </span>
          State {state} — {kicker}
        </p>
        <h2
          className={`font-display text-3xl font-light leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? 'text-calyza-ivory' : 'text-calyza-ink'
          }`}
        >
          {title}
        </h2>
        {copy && (
          <p className={`mt-6 max-w-md text-sm leading-relaxed ${dark ? 'text-calyza-ivory/65' : 'text-calyza-ink/60'}`}>
            {copy}
          </p>
        )}
      </motion.div>
    </section>
  );
}
