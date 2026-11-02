import { useEffect, useRef, useState } from 'react';
import { useCrystal } from './CrystalController';
import { PARTNERS } from '../../data/content';

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function EcosystemOverlay() {
  const { progress, hoverTone, stageInView } = useCrystal();
  const [hovered, setHovered] = useState(null);
  const hoveredRef = useRef(null);
  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const chipRefs = useRef([]);
  const lineRefs = useRef([]);
  const rotRef = useRef(0);

  useEffect(() => {
    hoveredRef.current = hovered;
    hoverTone.current = hovered !== null ? PARTNERS.companies[hovered].tone : null;
  }, [hovered, hoverTone]);

  useEffect(() => {
    if (!stageInView) return undefined;
    let raf;
    let last = performance.now();
    let speed = 2.4;
    let size = { w: 0, h: 0 };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = hoveredRef.current !== null ? 0.45 : 2.4;
      speed += (target - speed) * 0.05;
      rotRef.current = (rotRef.current + speed * dt) % 360;

      const el = rootRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width !== size.w || rect.height !== size.h) {
          size = { w: rect.width, h: rect.height };
          svgRef.current?.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
        }
        const cx = rect.width / 2 + (rect.width > 1024 ? Math.min(rect.width * 0.13, 260) : 0);
        const cy = rect.height / 2;
        const base = Math.min(rect.width, rect.height);
        const rx = base * 0.33;
        const ry = base * 0.27;

        const p = progress.get();
        const ecoIn = smooth(0.26, 0.33, p);
        const ecoOut = 1 - smooth(0.48, 0.56, p);

        PARTNERS.companies.forEach((c, i) => {
          const reveal = smooth(0.27 + i * 0.022, 0.33 + i * 0.022, p) * ecoOut;
          const a = ((i * 90 + rotRef.current) * Math.PI) / 180;
          const x = cx + Math.cos(a) * rx;
          const y = cy + Math.sin(a) * ry;
          const chip = chipRefs.current[i];
          if (chip) {
            const s = (0.5 + 0.5 * reveal) * (hoveredRef.current === i ? 1.15 : 1);
            chip.style.transform = `translate(-50%, -50%) translate(${x - rect.width / 2}px, ${y - rect.height / 2}px) scale(${s})`;
            chip.style.opacity = reveal;
            chip.style.pointerEvents = reveal > 0.6 ? 'auto' : 'none';
          }
          const line = lineRefs.current[i];
          if (line) {
            line.setAttribute('x1', cx);
            line.setAttribute('y1', cy);
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            line.style.opacity = (reveal * (hoveredRef.current === i ? 0.8 : 0.18) * ecoIn).toFixed(3);
          }
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progress, stageInView]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0" data-testid="ecosystem-overlay">
      <svg ref={svgRef} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {PARTNERS.companies.map((c, i) => (
          <line key={c.id} ref={(el) => (lineRefs.current[i] = el)} stroke={c.tone} strokeWidth="1" opacity="0" />
        ))}
      </svg>
      {PARTNERS.companies.map((c, i) => (
        <button
          key={c.id}
          ref={(el) => (chipRefs.current[i] = el)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
          aria-label={c.name}
          data-testid={`ecosystem-chip-${c.id}`}
          className="absolute left-1/2 top-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-t-chip opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.18)] md:h-14 md:w-14"
          style={{ transform: 'translate(-50%, -50%) scale(0.5)' }}
        >
          <img src={c.logo} alt="" className="h-5 w-auto max-w-[68%] object-contain md:h-6" loading="lazy" />
        </button>
      ))}
    </div>
  );
}
