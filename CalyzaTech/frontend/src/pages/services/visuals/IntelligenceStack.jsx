import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* AI — the intelligence stack. Four layers assemble around the core on scroll;
   hovering a capability lights the layers it draws on. */
export default function IntelligenceStack({ family, activeSub }) {
  const active = family.subs.find((s) => s.name === activeSub);
  const layers = family.stack;

  return (
    <div data-testid="visual-stack">
      {/* core */}
      <div className="mb-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="relative flex h-20 w-20 items-center justify-center"
        >
          <span
            className="absolute inset-0 border transition-colors duration-500"
            style={{ borderColor: active ? family.accent[0] : 'rgb(var(--border))' }}
          />
          <span
            className="absolute inset-3 transition-all duration-500"
            style={{
              background: active
                ? `linear-gradient(135deg, ${family.accent[0]}, ${family.accent[1]})`
                : 'rgb(var(--surface))',
            }}
          />
        </motion.div>
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">
          Intelligence core
        </p>
      </div>

      {/* layers, top (Experience) → bottom (Foundation) */}
      <div className="space-y-2.5">
        {layers.map((layer, i) => {
          const on = active?.stack?.includes(layer);
          return (
            <motion.div
              key={layer}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-8% 0px' }}
              transition={{ duration: 0.6, delay: (layers.length - i) * 0.1, ease }}
              className="relative flex items-center justify-between border px-5 py-4 transition-colors duration-500"
              style={{
                borderColor: on ? family.accent[0] : 'rgb(var(--border))',
                backgroundColor: on ? `${family.accent[0]}14` : 'rgb(var(--surface))',
              }}
              data-testid={`stack-layer-${layer.toLowerCase()}`}
            >
              <span className="flex items-center gap-3">
                <span
                  className="block h-1.5 w-1.5 rotate-45 transition-colors duration-500"
                  style={{ backgroundColor: on ? family.accent[1] : 'rgb(var(--border-strong))' }}
                />
                <span className={`text-sm transition-colors duration-500 ${on ? 'text-t-fg' : 'text-t-fg-sec'}`}>
                  {layer}
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-t-fg-mut">
                {String(layers.length - i).padStart(2, '0')}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-t-fg-mut">
        {active ? `${active.name} — draws on the lit layers` : 'Hover a capability to trace its layers'}
      </p>
    </div>
  );
}
