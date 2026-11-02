import { FACTORY_LAYERS, MINI_MODEL } from '../../data/factory';

/* The small internal model — Understand → Decide → Deploy explains HOW Calyza
   approaches a solution. Nested inside briefs and use cases, never navigation. */
export default function MiniModel({ items }) {
  const content = items || MINI_MODEL;

  return (
    <div className="grid gap-px border border-t-border bg-t-border sm:grid-cols-3" data-testid="mini-model">
      {FACTORY_LAYERS.map((layer, i) => {
        const val = content[layer.id];
        const list = Array.isArray(val) ? val : [val];
        return (
          <div key={layer.id} className="relative bg-t-bg p-4" data-testid={`mini-model-${layer.id}`}>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-t-fg-mut">
              <span className="text-t-acc">{layer.number}</span>
              <span className="mx-1.5 opacity-40">—</span>
              {layer.label}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {list.map((it) => (
                <li key={it} className="text-xs leading-relaxed text-t-fg-sec">
                  {it}
                </li>
              ))}
            </ul>
            {i < 2 && (
              <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 bg-t-bg px-0.5 text-xs text-t-fg-mut sm:block" aria-hidden="true">
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
