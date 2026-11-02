import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Data — the pipeline. Source → Transform → Store → Understand → Act.
   Hovering a capability lights the stages it owns; signal dots flow along. */
export default function DataPipeline({ family, activeSub }) {
  const reduce = useReducedMotion();
  const active = family.subs.find((s) => s.name === activeSub);
  const onStages = active?.stages ?? [];

  return (
    <div data-testid="visual-pipeline">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease }}
        className="overflow-x-auto border border-t-border bg-t-surface px-6 py-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="relative mx-auto min-w-[560px] max-w-2xl">
          {/* connector line + signal dots */}
          <div className="absolute left-[10%] right-[10%] top-[13px] h-px bg-t-border">
            {!reduce &&
              [0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: family.accent[0] }}
                  animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4.5, delay: d * 1.5, repeat: Infinity, ease: 'linear' }}
                />
              ))}
          </div>

          <div className="relative flex justify-between">
            {family.stages.map((stage, i) => {
              const on = onStages.includes(stage);
              return (
                <div key={stage} className="flex w-14 flex-col items-center gap-4" data-testid={`pipeline-stage-${stage.toLowerCase()}`}>
                  <span
                    className="flex h-7 w-7 rotate-45 items-center justify-center border transition-all duration-500"
                    style={{
                      backgroundColor: on ? `${family.accent[0]}22` : 'rgb(var(--background))',
                      borderColor: on ? family.accent[0] : 'rgb(var(--border-strong))',
                      boxShadow: on ? `0 0 16px ${family.accent[0]}55` : 'none',
                    }}
                  >
                    <span
                      className="block h-1.5 w-1.5 transition-colors duration-500"
                      style={{ backgroundColor: on ? family.accent[0] : 'rgb(var(--border-strong))' }}
                    />
                  </span>
                  <span
                    className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] transition-colors duration-500 ${
                      on ? 'text-t-fg' : 'text-t-fg-mut'
                    }`}
                  >
                    {stage}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-t-fg-mut opacity-60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <p className="mt-6 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-t-fg-mut">
        {active ? `${active.name} — owns the lit stages` : 'Hover a capability to trace its stages'}
      </p>
    </div>
  );
}
