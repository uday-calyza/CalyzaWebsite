import { useState } from 'react';
import { motion } from 'framer-motion';
import { FACTORY_FLOOR, FACTORY_INDUSTRIES } from '../../data/factory';

const ease = [0.16, 1, 0.3, 1];

/* THE FOUR INDUSTRY BAYS — the primary navigation of AI Factory.
   Hover/selection expands one bay and compresses the other three;
   committing a bay opens its factory floor beneath. */
export default function IndustryBays({ committedId, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className={`flex flex-col overflow-hidden border border-t-border transition-all duration-700 lg:flex-row ${
        committedId ? 'lg:h-auto' : 'lg:h-[56vh] lg:min-h-[420px]'
      }`}
      onMouseLeave={() => setHovered(null)}
      data-testid="industry-bays"
    >
      {FACTORY_INDUSTRIES.map((ind) => {
        const committed = committedId === ind.id;
        const active = committed || hovered === ind.id;
        const anyHover = hovered !== null;
        const floor = FACTORY_FLOOR[ind.id];

        return (
          <motion.button
            key={ind.id}
            onClick={() => onSelect(committed ? null : ind.id)}
            onMouseEnter={() => setHovered(ind.id)}
            onFocus={() => setHovered(ind.id)}
            initial={false}
            animate={{
              flexGrow: committed ? 2 : active ? 2.2 : anyHover || committedId ? 0.85 : 1,
            }}
            transition={{ duration: 0.65, ease }}
            style={{ flexBasis: 0 }}
            className="group relative min-w-0 cursor-pointer border-t border-t-border text-left lg:border-l lg:border-t-0 lg:first:border-l-0"
            data-testid={`industry-bay-${ind.id}`}
            aria-expanded={committed}
          >
            {/* subtle background atmosphere — accent carrier, never a repaint */}
            <span
              className="pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: active ? 1 : 0,
                background: `radial-gradient(80% 90% at 50% 100%, ${ind.accent[0]}14, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            <span className={`relative flex h-full flex-col justify-between p-6 md:p-8 ${committedId ? 'min-h-[96px] lg:min-h-[120px]' : 'min-h-[120px]'}`}>
              <span className="flex items-center justify-between">
                <span className={`font-mono text-[10px] tracking-[0.22em] transition-colors duration-500 ${active ? 'text-t-fg' : 'text-t-fg-mut'}`}>
                  {floor.number}
                </span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500 ${
                    committed ? 'text-t-fg' : active ? 'text-t-fg-sec' : 'text-t-fg-mut opacity-0'
                  }`}
                  data-testid={`bay-enter-${ind.id}`}
                >
                  {committed ? '● Floor open' : 'Enter industry →'}
                </span>
              </span>

              <span className="mt-8 block">
                <span
                  className={`block font-display font-light tracking-tight transition-all duration-500 ${
                    committedId
                      ? 'text-xl md:text-2xl'
                      : active
                        ? 'text-3xl md:text-4xl lg:text-5xl'
                        : 'text-2xl md:text-3xl lg:text-4xl'
                  } ${active ? 'text-t-fg' : 'text-t-fg-sec'}`}
                >
                  {ind.name}
                </span>
                {!committedId && (
                  <span
                    className={`mt-3 block max-w-[26ch] text-xs leading-relaxed transition-all duration-500 ${
                      active ? 'text-t-fg-sec opacity-100' : 'text-t-fg-mut opacity-0'
                    }`}
                  >
                    {floor.tagline}
                  </span>
                )}
                {/* the animated system line — draws across the bay when active */}
                <span className="mt-5 block h-[2px] w-full overflow-hidden bg-t-border" aria-hidden="true">
                  <motion.span
                    className="block h-full"
                    style={{ background: `linear-gradient(90deg, ${ind.accent[0]}, ${ind.accent[1]})` }}
                    initial={false}
                    animate={{ scaleX: active ? 1 : 0.12, opacity: active ? 1 : 0.35 }}
                    transition={{ duration: 0.7, ease }}
                  />
                </span>
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
