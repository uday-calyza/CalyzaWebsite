import { useRef, useState } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';
import { useCrystal } from './CrystalController';

export default function PulseWave() {
  const { progress } = useCrystal();
  const [pulse, setPulse] = useState(0);
  const prev = useRef(0);

  useMotionValueEvent(progress, 'change', (v) => {
    const crossed =
      (prev.current < 0.78 && v >= 0.78) || (prev.current > 0.78 && v <= 0.78);
    if (crossed) setPulse((k) => k + 1);
    prev.current = v;
  });

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
      data-testid="crystal-pulse-wave"
    >
      {pulse > 0 && (
        <motion.span
          key={pulse}
          className="block aspect-square w-[38vmin] rounded-full md:translate-x-[13vw]"
          style={{
            border: '1px solid rgba(138, 77, 232, 0.5)',
            boxShadow: 'inset 0 0 40px rgba(39, 199, 217, 0.12)',
          }}
          initial={{ scale: 0.25, opacity: 0.55 }}
          animate={{ scale: 3.4, opacity: 0 }}
          transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </div>
  );
}
