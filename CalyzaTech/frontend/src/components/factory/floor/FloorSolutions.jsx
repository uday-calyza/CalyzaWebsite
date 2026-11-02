import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SOLUTION_LABELS } from '../../../data/factory';
import MiniModel from '../MiniModel';

const ease = [0.16, 1, 0.3, 1];

function LabelChip({ label }) {
  const calyza = label === 'calyza';
  return (
    <span
      className={`inline-block px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] ${
        calyza ? 'bg-t-btn text-t-btn-text' : 'border border-t-border-strong text-t-fg-sec'
      }`}
      data-testid={calyza ? 'label-calyza-solution' : 'label-blueprint'}
    >
      {SOLUTION_LABELS[label]}
    </span>
  );
}

function BriefSection({ kicker, children, testId }) {
  return (
    <div data-testid={testId}>
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">{kicker}</p>
      {children}
    </div>
  );
}

/* FLOOR MODE 02 — READY-TO-DEPLOY. The solution rack: horizontal modules.
   Hover opens the module slightly to preview UNDERSTAND / DECIDE / DEPLOY;
   EXPLORE unfolds the full technical brief. */
export default function FloorSolutions({ industry, openSolutionId, onToggle }) {
  return (
    <div data-testid="floor-solutions">
      <div className="border-b border-t-border">
        {industry.solutions.map((sol, i) => {
          const open = openSolutionId === sol.id;
          const dimmed = openSolutionId && !open;
          return (
            <div
              key={sol.id}
              className={`group border-t border-t-border transition-opacity duration-500 ${dimmed ? 'opacity-35' : ''}`}
            >
              <div className="grid w-full grid-cols-12 items-center gap-x-4 gap-y-2 px-1 py-6 transition-colors duration-300 group-hover:bg-t-surface-hover md:px-4">
                {/* industry marker + number */}
                <span className="col-span-2 flex items-center gap-3 md:col-span-1">
                  <span className="block h-1.5 w-1.5 rotate-45" style={{ backgroundColor: industry.accent[0] }} />
                  <span className="font-mono text-xs text-t-fg-mut">{String(i + 1).padStart(2, '0')}</span>
                </span>

                {/* name + status */}
                <span className="col-span-10 md:col-span-4">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-xl font-light tracking-tight text-t-fg md:text-2xl">{sol.name}</span>
                    <LabelChip label={sol.label} />
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-t-fg-mut">
                    {industry.name} — {sol.status}
                  </span>
                </span>

                {/* one-line value */}
                <span className="col-span-10 col-start-3 md:col-span-5 md:col-start-auto">
                  <span className="block max-w-md text-sm leading-relaxed text-t-fg-sec line-clamp-2">{sol.value}</span>
                </span>

                {/* explore */}
                <span className="col-span-12 flex md:col-span-2 md:justify-end">
                  <button
                    onClick={() => onToggle(sol.id)}
                    aria-expanded={open}
                    data-testid={`explore-solution-${sol.id}`}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-t-acc"
                  >
                    {open ? 'Close brief ↑' : 'Explore →'}
                  </button>
                </span>
              </div>

              {/* hover preview — the module opens slightly, revealing U/D/D */}
              {!open && (
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div
                      className="mx-1 mb-5 grid gap-px border border-t-border bg-t-border opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:grid-cols-3 md:mx-4"
                      data-testid={`rack-preview-${sol.id}`}
                    >
                      {['understand', 'decide', 'deploy'].map((layerId, li) => (
                        <span key={layerId} className="block bg-t-bg px-4 py-3">
                          <span className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: industry.accent[li % 2] }}>
                            {layerId}
                          </span>
                          <span className="mt-1 block text-[11px] leading-snug text-t-fg-mut line-clamp-1">
                            {sol[layerId][0]}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* the full brief — unfolds vertically, siblings compress */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="brief"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-10 px-1 pb-10 pt-4 md:grid-cols-2 md:px-4" data-testid={`solution-brief-${sol.id}`}>
                      <BriefSection kicker="The problem" testId={`brief-problem-${sol.id}`}>
                        <p className="max-w-md text-sm leading-relaxed text-t-fg sm:text-base">{sol.problem}</p>
                      </BriefSection>

                      <BriefSection kicker="The intelligence — understand / decide / deploy" testId={`brief-intelligence-${sol.id}`}>
                        <MiniModel items={sol} />
                        <p className="mb-2 mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-t-fg-mut">Key capabilities</p>
                        <div className="flex flex-wrap gap-1.5">
                          {sol.useCases.map((uc) => (
                            <span key={uc} className="border border-t-border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-t-fg-sec">
                              {uc}
                            </span>
                          ))}
                        </div>
                      </BriefSection>

                      <BriefSection kicker="The workflow" testId={`brief-workflow-${sol.id}`}>
                        <ol className="space-y-2">
                          {sol.workflow.map((step, wi) => (
                            <li key={step} className="flex items-baseline gap-3 text-sm text-t-fg-sec">
                              <span className="font-mono text-[9px] tracking-[0.18em]" style={{ color: industry.accent[0] }}>
                                {String(wi + 1).padStart(2, '0')}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </BriefSection>

                      <BriefSection kicker="The deployment" testId={`brief-deployment-${sol.id}`}>
                        <ul className="space-y-2">
                          {sol.deploy.map((d) => (
                            <li key={d} className="flex items-baseline gap-3 text-sm text-t-fg-sec">
                              <span className="block h-1 w-1 shrink-0 rotate-45" style={{ backgroundColor: industry.accent[1] }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 max-w-md border-l-2 pl-4 text-[13px] leading-relaxed text-t-fg-sec" style={{ borderColor: industry.accent[0] }}>
                          {sol.outcome}
                        </p>
                        {sol.note && (
                          <p className="mt-3 max-w-md font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-t-fg-mut" data-testid={`brief-note-${sol.id}`}>
                            {sol.note}
                          </p>
                        )}
                        <Link
                          to="/contact"
                          data-testid={`brief-cta-${sol.id}`}
                          className="group/link mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-t-acc"
                        >
                          Build this with Calyza
                          <span className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">→</span>
                        </Link>
                      </BriefSection>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-t-fg-mut">
        Documented Calyza solutions and research-based blueprints — always labelled. Never the other way around.
      </p>
    </div>
  );
}
