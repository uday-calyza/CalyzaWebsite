import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Vertical workflow sequence — stays readable on mobile, sequences in on scroll */
export default function WorkflowDiagram({ steps }) {
  return (
    <ol className="relative" data-testid="case-workflow-diagram">
      <span className="absolute bottom-6 left-[13px] top-6 w-px bg-t-border" aria-hidden="true" />
      {steps.map((item, i) => (
        <motion.li
          key={item.step}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: '-12% 0px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease }}
          className="relative flex items-center gap-6 py-5"
          data-testid={`workflow-step-${item.step}`}
        >
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center border border-t-border-strong bg-t-bg font-mono text-[9px] tracking-widest text-t-acc">
            {item.step}
          </span>
          <span className="text-sm font-medium text-t-fg sm:text-base">{item.label}</span>
          {i < steps.length - 1 && (
            <span className="absolute -bottom-1 left-[13px] text-[9px] text-t-acc" aria-hidden="true">
              ↓
            </span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
