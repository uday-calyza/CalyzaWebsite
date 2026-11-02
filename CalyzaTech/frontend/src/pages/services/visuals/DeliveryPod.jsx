import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from '../../../components/Magnetic';

const ease = [0.16, 1, 0.3, 1];
const MAX_POD = 4;

/* Pod slots: top / right / bottom / left around the mission core. */
const SLOTS = [
  { left: '50%', top: '0%', x2: 50, y2: 6 },
  { left: '100%', top: '50%', x2: 94, y2: 50 },
  { left: '50%', top: '100%', x2: 50, y2: 94 },
  { left: '0%', top: '50%', x2: 6, y2: 50 },
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/* Ready-to-Deploy — compose a delivery pod. Pick up to four roles;
   they lock into orbit around the mission. */
export default function DeliveryPod({ family, activeSub }) {
  const [pod, setPod] = useState([]);

  const toggle = (name) =>
    setPod((p) => (p.includes(name) ? p.filter((n) => n !== name) : p.length >= MAX_POD ? p : [...p, name]));

  return (
    <div data-testid="visual-pod">
      {/* pod composition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto h-60 w-60 sm:h-72 sm:w-72"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {SLOTS.map((slot, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={slot.x2}
              y2={slot.y2}
              stroke={pod[i] ? family.accent[0] : 'rgb(var(--border))'}
              strokeWidth="0.4"
              strokeDasharray={pod[i] ? 'none' : '2 2'}
              style={{ transition: 'stroke 0.5s ease' }}
            />
          ))}
        </svg>

        {/* mission core */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span
            className="block h-10 w-10 rotate-45 border transition-all duration-500"
            style={{
              borderColor: pod.length ? family.accent[0] : 'rgb(var(--border-strong))',
              backgroundColor: pod.length ? `${family.accent[0]}22` : 'rgb(var(--surface))',
            }}
          />
          <span className="mt-3 font-mono text-[8px] uppercase tracking-[0.22em] text-t-fg-mut">Mission</span>
        </div>

        {/* role slots */}
        {SLOTS.map((slot, i) => (
          <div
            key={i}
            className="absolute flex w-20 -translate-x-1/2 -translate-y-1/2 justify-center"
            style={{ left: slot.left, top: slot.top }}
            data-testid={`pod-slot-${i}`}
          >
            {pod[i] ? (
              <span
                className="border px-2 py-1.5 text-center font-mono text-[8px] uppercase leading-tight tracking-[0.12em] text-t-fg"
                style={{ borderColor: family.accent[0], backgroundColor: `${family.accent[0]}14` }}
              >
                {pod[i]}
              </span>
            ) : (
              <span className="block h-2.5 w-2.5 rotate-45 border border-t-border-strong bg-t-bg" />
            )}
          </div>
        ))}
      </motion.div>

      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut" data-testid="pod-count">
        {pod.length} / {MAX_POD} roles composed
      </p>

      {/* role picker */}
      <div className="mt-8 flex flex-wrap justify-center gap-2" data-testid="pod-picker">
        {family.subs.map((sub) => {
          const selected = pod.includes(sub.name);
          const hovered = activeSub === sub.name;
          const full = pod.length >= MAX_POD && !selected;
          return (
            <button
              key={sub.name}
              onClick={() => toggle(sub.name)}
              disabled={full}
              data-testid={`pod-chip-${slug(sub.name)}`}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition-all duration-300 ${
                full ? 'cursor-not-allowed opacity-30' : 'hover:-translate-y-0.5'
              } ${hovered && !selected ? 'border-t-border-strong text-t-fg' : ''}`}
              style={
                selected
                  ? { borderColor: family.accent[0], backgroundColor: family.accent[0], color: '#fff' }
                  : { borderColor: 'rgb(var(--border))', color: hovered ? undefined : 'rgb(var(--text-secondary))' }
              }
            >
              {sub.name}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-6 max-w-sm text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-t-fg-mut">
        {family.podNote}
      </p>

      <div className="mt-8 flex justify-center">
        <Magnetic>
          <Link
            to="/contact"
            data-testid="pod-cta"
            className={`rounded-full px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
              pod.length
                ? 'bg-t-btn text-t-btn-text hover:bg-t-btn-hover'
                : 'pointer-events-none border border-t-border text-t-fg-mut opacity-50'
            }`}
          >
            {pod.length ? 'Start with this pod' : 'Compose a pod first'}
          </Link>
        </Magnetic>
      </div>
    </div>
  );
}
