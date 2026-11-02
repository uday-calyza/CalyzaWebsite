import { motion } from 'framer-motion';

export default function FilterBar({ filters, active, onChange }) {
  return (
    <div
      className="flex gap-7 overflow-x-auto border-y border-t-border py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      data-testid="case-filter-bar"
      role="tablist"
      aria-label="Filter case studies"
    >
      {filters.map((filter) => {
        const selected = active === filter;
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            role="tab"
            aria-selected={selected}
            data-testid={`filter-${filter.toLowerCase()}`}
            className={`relative shrink-0 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
              selected ? 'text-t-fg' : 'text-t-fg-mut hover:text-t-fg'
            }`}
          >
            {filter}
            {selected && (
              <motion.span
                layoutId="case-filter-underline"
                className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-t-acc"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
