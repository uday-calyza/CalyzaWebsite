import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Node positions as % of the map canvas (x, y). */
const POS = {
  Applications: [14, 18],
  Compute: [50, 10],
  Data: [86, 22],
  Network: [22, 76],
  Security: [52, 88],
  Delivery: [86, 70],
};

const EDGES = [
  ['Applications', 'Compute'],
  ['Compute', 'Data'],
  ['Applications', 'Network'],
  ['Compute', 'Network'],
  ['Compute', 'Security'],
  ['Data', 'Delivery'],
  ['Network', 'Security'],
  ['Security', 'Delivery'],
  ['Applications', 'Data'],
  ['Network', 'Delivery'],
];

/* Cloud — the architecture map. Hovering a capability lights the
   infrastructure nodes it touches and the paths between them. */
export default function ArchitectureMap({ family, activeSub }) {
  const active = family.subs.find((s) => s.name === activeSub);
  const onNodes = active?.nodes ?? [];

  return (
    <div data-testid="visual-map">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease }}
        className="relative aspect-[3/2] w-full border border-t-border bg-t-surface"
      >
        {/* connection paths */}
        <svg viewBox="0 0 100 66" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {EDGES.map(([a, b]) => {
            const on = onNodes.includes(a) && onNodes.includes(b);
            return (
              <line
                key={`${a}-${b}`}
                x1={POS[a][0]}
                y1={POS[a][1] * 0.66}
                x2={POS[b][0]}
                y2={POS[b][1] * 0.66}
                stroke={on ? family.accent[0] : 'rgb(var(--border))'}
                strokeWidth={on ? 0.45 : 0.25}
                strokeOpacity={on ? 0.9 : 0.6}
                style={{ transition: 'stroke 0.5s ease, stroke-width 0.5s ease' }}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {family.nodes.map((node) => {
          const on = onNodes.includes(node);
          const [x, y] = POS[node];
          return (
            <div
              key={node}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              style={{ left: `${x}%`, top: `${y}%` }}
              data-testid={`map-node-${node.toLowerCase()}`}
            >
              <span
                className="block h-3 w-3 rotate-45 border transition-all duration-500"
                style={{
                  backgroundColor: on ? family.accent[0] : 'rgb(var(--background))',
                  borderColor: on ? family.accent[0] : 'rgb(var(--border-strong))',
                  boxShadow: on ? `0 0 18px ${family.accent[0]}66` : 'none',
                }}
              />
              <span
                className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  on ? 'text-t-fg' : 'text-t-fg-mut'
                }`}
              >
                {node}
              </span>
            </div>
          );
        })}
      </motion.div>

      <p className="mt-6 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-t-fg-mut">
        {active ? `${active.name} — touches the lit nodes` : 'Hover a capability to trace its architecture'}
      </p>
    </div>
  );
}
