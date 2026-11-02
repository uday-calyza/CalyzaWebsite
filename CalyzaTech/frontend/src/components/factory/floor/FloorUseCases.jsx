import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { USE_CASES } from '../../../data/factory';
import MiniModel from '../MiniModel';

const ease = [0.16, 1, 0.3, 1];

/* FLOOR MODE 03 — USE CASES. What Calyza can build for THIS industry.
   Capability framing only — nothing here claims to be deployed. */
export default function FloorUseCases({ industry }) {
  const [openIdx, setOpenIdx] = useState(null);
  const cases = USE_CASES[industry.id] || [];

  return (
    <div data-testid="floor-use-cases">
      <p className="mb-6 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-t-fg-mut">
        What we can build for {industry.name.toLowerCase()} — shaped per engagement, never claimed as deployed.
      </p>

      <div className="border-b border-t-border">
        {cases.map((uc, i) => {
          const open = openIdx === i;
          return (
            <div key={uc.name} className="border-t border-t-border">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                data-testid={`usecase-row-${i}`}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 py-5 text-left transition-colors duration-300 hover:bg-t-surface-hover"
              >
                <span className="col-span-1 font-mono text-xs text-t-fg-mut">{String(i + 1).padStart(2, '0')}</span>
                <span className={`col-span-10 font-display text-lg font-light tracking-tight transition-colors duration-300 md:col-span-4 md:text-xl ${open ? 'text-t-fg' : 'text-t-fg-sec group-hover:text-t-fg'}`}>
                  {uc.name}
                </span>
                <span className="col-span-10 col-start-2 text-sm leading-relaxed text-t-fg-mut md:col-span-6 md:col-start-auto">
                  {uc.desc}
                </span>
                <span className={`col-span-1 text-right font-display text-xl transition-transform duration-500 ${open ? 'rotate-45 text-t-acc' : 'text-t-fg-mut'}`} aria-hidden="true">
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                    data-testid={`usecase-detail-${i}`}
                  >
                    <div className="px-1 pb-8 pt-2 md:pl-14 md:pr-4">
                      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">
                        How Calyza approaches it
                      </p>
                      <MiniModel />
                      <Link
                        to="/contact"
                        data-testid={`usecase-cta-${i}`}
                        className="group/link mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-t-acc"
                      >
                        Discuss this use case
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
