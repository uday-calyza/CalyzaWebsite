import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* THE SYSTEM LINE — the signature visual language of the factory floor.
   INPUT → INTELLIGENCE → OUTCOME. On industry/mode change, the industry
   color travels the line once, left to right, lighting each node in turn. */
export default function SystemLine({ labels, sublabels, accent, pulseKey, caption }) {
  const reduced = useReducedMotion();
  const keys = ['input', 'intelligence', 'outcome'];

  return (
    <div className="border border-t-border px-6 py-8 md:px-10" data-testid="system-line">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">Factory floor — system line</p>
        {caption && (
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-t-fg-mut" data-testid="system-line-caption">
            Now routing — {caption}
          </p>
        )}
      </div>

      <div className="relative mt-10">
        {/* the track */}
        <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-t-border" aria-hidden="true" />

        {/* the travelling pulse — runs once per industry/mode change */}
        {!reduced && (
          <motion.span
            key={pulseKey}
            className="absolute top-1/2 h-[3px] w-16 -translate-y-1/2 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent[0]}, ${accent[1]})`,
              boxShadow: `0 0 12px ${accent[0]}66`,
            }}
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.12, 0.88, 1], ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        {/* the three nodes */}
        <div className="relative flex items-start justify-between">
          {keys.map((key, i) => (
            <div key={key} className={`flex flex-col gap-3 ${i === 1 ? 'items-center text-center' : i === 2 ? 'items-end text-right' : ''} max-w-[30%]`} data-testid={`system-node-${key}`}>
              <span
                className="relative block h-2.5 w-2.5 rotate-45 border bg-t-bg"
                style={{ borderColor: 'rgb(var(--border-strong))' }}
              >
                <motion.span
                  key={`${pulseKey}-${key}`}
                  className="absolute inset-0 border"
                  style={{ backgroundColor: `${accent[0]}33`, borderColor: accent[0] }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduced ? 0.3 : 0.5, delay: reduced ? 0 : 0.25 + i * 0.45 }}
                />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg">
                  {labels[key]}
                </span>
                {sublabels?.[key] && (
                  <span className="mt-1.5 block text-[11px] leading-snug text-t-fg-mut">{sublabels[key]}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
