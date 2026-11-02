import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICE_FAMILIES } from '../../data/services';

const ease = [0.16, 1, 0.3, 1];

export default function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const family = SERVICE_FAMILIES[active];

  return (
    <section
      className="cv-auto relative z-10 bg-t-bg px-6 py-20 transition-colors duration-500 md:px-14 md:py-24"
      data-testid="what-we-build"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-t-acc">What we build</p>
            <h2 className="max-w-xl font-display text-3xl font-light leading-[1.05] tracking-tight text-t-fg sm:text-4xl">
              Six capability families. <span className="italic text-t-acc">One standard of finish.</span>
            </h2>
          </div>
          <Link
            to="/services"
            data-testid="what-we-build-explore"
            className="group relative self-start text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 hover:text-t-fg md:self-auto"
          >
            Explore Services
            <span className="absolute -bottom-1 left-0 h-px w-full bg-t-border-strong" />
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-t-acc transition-transform duration-300 group-hover:scale-x-100" />
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Editorial readout — follows the hovered family */}
          <div className="lg:col-span-5">
            <motion.div
              key={family.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="border-l-2 py-1 pl-6"
              style={{ borderColor: family.accent[0] }}
              data-testid="what-we-build-readout"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">{family.number}</p>
              <p className="mt-2 font-display text-3xl font-light tracking-tight text-t-fg sm:text-4xl">
                {family.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-t-fg-sec">{family.tagline}</p>
              <span
                className="mt-5 block h-[2px] w-16"
                style={{ background: `linear-gradient(90deg, ${family.accent[0]}, ${family.accent[1]})` }}
              />
            </motion.div>
          </div>

          {/* Interactive index */}
          <div className="lg:col-span-7" onMouseLeave={() => {}}>
            {SERVICE_FAMILIES.map((f, i) => {
              const isActive = i === active;
              return (
                <Link
                  key={f.id}
                  to="/services"
                  data-testid={`what-we-build-${f.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline justify-between gap-6 border-t border-t-border py-5 transition-colors duration-300 last:border-b"
                >
                  <span className="flex items-baseline gap-5">
                    <span
                      className="block h-1.5 w-1.5 shrink-0 rotate-45 transition-transform duration-300"
                      style={{
                        backgroundColor: f.accent[0],
                        transform: isActive ? 'rotate(45deg) scale(1.5)' : 'rotate(45deg)',
                        opacity: isActive ? 1 : 0.35,
                      }}
                    />
                    <span
                      className={`font-display text-xl font-light tracking-tight transition-all duration-300 sm:text-2xl ${
                        isActive ? 'translate-x-1 text-t-fg' : 'text-t-fg-sec'
                      }`}
                    >
                      {f.name}
                    </span>
                  </span>
                  <span className="hidden max-w-[240px] text-right text-xs leading-relaxed text-t-fg-mut sm:block">
                    {f.tagline}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
