import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Rings outer → inner, matching family.rings order. */
const INSETS = ['inset-0', 'inset-[13%]', 'inset-[26%]', 'inset-[39%]'];

/* Industry — context before code. Concentric rings of domain context surround
   the core; hovering a capability illuminates the context it must understand. */
export default function IndustryContext({ family, activeSub }) {
  const active = family.subs.find((s) => s.name === activeSub);
  const onRings = active?.rings ?? [];

  return (
    <div data-testid="visual-context">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease }}
        className="relative mx-auto aspect-square max-w-[360px]"
      >
        {family.rings.map((ring, i) => {
          const on = onRings.includes(ring);
          return (
            <div key={ring} className={`absolute ${INSETS[i]}`}>
              <span
                className="block h-full w-full rounded-full border transition-all duration-500"
                style={{
                  borderColor: on ? family.accent[i % 2] : 'rgb(var(--border))',
                  boxShadow: on ? `0 0 24px ${family.accent[i % 2]}33 inset` : 'none',
                }}
                data-testid={`context-ring-${ring.toLowerCase()}`}
              />
              <span
                className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-t-bg px-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  on ? 'text-t-fg' : 'text-t-fg-mut'
                }`}
              >
                {ring}
              </span>
            </div>
          );
        })}

        {/* core */}
        <div className="absolute inset-[46%] flex items-center justify-center">
          <span
            className="absolute inset-0 rotate-45 transition-all duration-500"
            style={{
              background: active
                ? `linear-gradient(135deg, ${family.accent[0]}, ${family.accent[1]})`
                : 'rgb(var(--surface))',
              border: `1px solid ${active ? family.accent[0] : 'rgb(var(--border))'}`,
            }}
          />
        </div>
      </motion.div>

      <p className="mt-8 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-t-fg-mut">
        {active ? `${active.name} — requires the lit context` : 'Hover a capability to reveal its context'}
      </p>
    </div>
  );
}
