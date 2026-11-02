import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Module placement on the application canvas grid (4 columns). */
const AREA = {
  Experience: 'col-span-4 min-h-[104px]',
  API: 'col-span-2 min-h-[68px]',
  Auth: 'col-span-1 min-h-[68px]',
  Data: 'col-span-1 min-h-[68px]',
  Search: 'col-span-1 min-h-[68px]',
  Notify: 'col-span-1 min-h-[68px]',
  Admin: 'col-span-1 min-h-[68px]',
  Integrations: 'col-span-1 min-h-[68px]',
};

/* Custom Software — the application canvas. Hovering a capability composes
   the modules it needs into a living application frame. */
export default function AppCanvas({ family, activeSub }) {
  const active = family.subs.find((s) => s.name === activeSub);
  const onModules = active?.modules ?? [];

  return (
    <div data-testid="visual-canvas">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease }}
        className="overflow-hidden rounded-lg border border-t-border bg-t-surface"
      >
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-t-border px-4 py-3">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((d) => (
              <span key={d} className="block h-2 w-2 rounded-full bg-t-border-strong opacity-60" />
            ))}
          </span>
          <span className="mx-auto rounded-full border border-t-border px-4 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-t-fg-mut">
            {active ? active.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'application'}
          </span>
          <span className="w-8" />
        </div>

        {/* module grid */}
        <div className="grid grid-cols-4 gap-1.5 p-3">
          {family.modules.map((mod) => {
            const on = onModules.includes(mod);
            return (
              <div
                key={mod}
                className={`flex flex-col justify-between border p-3 transition-all duration-500 ${AREA[mod]}`}
                style={{
                  borderColor: on ? family.accent[0] : 'rgb(var(--border))',
                  backgroundColor: on ? `${family.accent[0]}14` : 'transparent',
                }}
                data-testid={`canvas-module-${mod.toLowerCase()}`}
              >
                {mod === 'Experience' && (
                  <span className="mb-2 space-y-1.5">
                    <span
                      className="block h-1 w-2/3 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: on ? family.accent[0] : 'rgb(var(--border))' }}
                    />
                    <span
                      className="block h-1 w-1/3 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: on ? family.accent[1] : 'rgb(var(--border))' }}
                    />
                  </span>
                )}
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.16em] transition-colors duration-500 ${
                    on ? 'text-t-fg' : 'text-t-fg-mut'
                  }`}
                >
                  {mod}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <p className="mt-6 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-t-fg-mut">
        {active ? `${active.name} — composes the lit modules` : 'Hover a capability to compose its application'}
      </p>
    </div>
  );
}
