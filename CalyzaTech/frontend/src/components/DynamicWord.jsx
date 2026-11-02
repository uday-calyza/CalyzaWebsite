import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Character reveal: opacity + slight horizontal settle + blur-to-sharp. Premium, never flashy. */
export function SplitReveal({ text, className = '', delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, x: -5, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.5, delay: delay + i * 0.028, ease }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* Quiet rotation through a word set: blur-to-sharp crossfade, subtle rise. */
export function RotatingWords({ words, className = '', interval = 2400, testId }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block ${className}`} data-testid={testId} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block italic text-t-acc"
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(5px)' }}
          transition={{ duration: 0.45, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
