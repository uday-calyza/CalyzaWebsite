import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES_PAGE, familyNav, getFamily } from '../data/services';
import Magnetic from '../components/Magnetic';
import useSeo from '../hooks/useSeo';
import IntelligenceStack from './services/visuals/IntelligenceStack';
import ArchitectureMap from './services/visuals/ArchitectureMap';
import DataPipeline from './services/visuals/DataPipeline';
import AppCanvas from './services/visuals/AppCanvas';
import IndustryContext from './services/visuals/IndustryContext';
import DeliveryPod from './services/visuals/DeliveryPod';

const ease = [0.16, 1, 0.3, 1];

const VISUALS = {
  stack: IntelligenceStack,
  map: ArchitectureMap,
  pipeline: DataPipeline,
  canvas: AppCanvas,
  context: IndustryContext,
  pod: DeliveryPod,
};

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function SubServiceRow({ sub, family, active, onActivate }) {
  return (
    <div
      className="group border-t border-t-border transition-colors duration-300 last:border-b hover:bg-t-surface-hover"
      data-testid={`sub-row-${slug(sub.name)}`}
      onMouseEnter={() => onActivate(sub.name)}
      onMouseLeave={() => onActivate(null)}
      onClick={() => onActivate(active ? null : sub.name)}
    >
      <div className="flex cursor-pointer items-center justify-between gap-6 py-5 pr-2">
        <span className="flex items-baseline gap-4">
          <span
            className="block h-1.5 w-1.5 shrink-0 rotate-45 transition-opacity duration-300"
            style={{ backgroundColor: family.accent[0], opacity: active ? 1 : 0.4 }}
          />
          <span className={`text-base font-medium transition-colors duration-300 ${active ? 'text-t-fg' : 'text-t-fg-sec group-hover:text-t-fg'}`}>
            {sub.name}
          </span>
        </span>
        <span
          className={`transition-all duration-300 ${active ? 'translate-x-1.5 text-t-acc' : 'text-t-fg-mut group-hover:translate-x-1.5 group-hover:text-t-acc'}`}
          aria-hidden="true"
        >
          →
        </span>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`max-w-xl pb-5 pl-7 text-sm leading-relaxed text-t-fg-sec transition-opacity duration-300 ${
              active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            {sub.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetail() {
  const { family: familyId } = useParams();
  const family = getFamily(familyId);
  const [activeSub, setActiveSub] = useState(null);

  useSeo({
    title: family ? `${family.name} — Services — Calyza Tech` : 'Services — Calyza Tech',
    description: family ? family.description : SERVICES_PAGE.sub,
  });

  if (!family) return <Navigate to="/services" replace />;

  const Visual = VISUALS[family.visual];
  const { prev, next } = familyNav(family.id);

  return (
    <div className="bg-t-bg px-6 pb-28 pt-36 transition-colors duration-500 md:px-14 md:pt-44" data-testid="service-detail-page">
      <div className="mx-auto max-w-[1600px]">
        {/* ---- Hero ---- */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl"
        >
          <p className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            <Link to="/services" className="transition-colors hover:text-t-fg" data-testid="service-breadcrumb">
              Services
            </Link>
            <span className="mx-3 text-t-fg-mut">/</span>
            {family.number}
          </p>
          <h1 className="font-display text-5xl font-light leading-[0.98] tracking-tighter text-t-fg sm:text-6xl lg:text-7xl">
            {family.name}
          </h1>
          <p className="mt-4 font-display text-xl font-light italic text-t-acc sm:text-2xl">{family.tagline}</p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-t-fg-sec sm:text-base">{family.hero}</p>
          <span
            className="mt-8 block h-[2px] w-24"
            style={{ background: `linear-gradient(90deg, ${family.accent[0]}, ${family.accent[1]})` }}
          />
        </motion.header>

        {/* ---- Visual + capabilities ---- */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-6">
            <div className="min-w-0 lg:sticky lg:top-28">
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">
                {family.visualLabel}
              </p>
              {Visual && <Visual family={family} activeSub={activeSub} />}
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="mb-6 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">
              <span>Capabilities</span>
              <span>{family.subs.length}</span>
            </p>
            <div data-testid="service-sub-list">
              {family.subs.map((sub) => (
                <SubServiceRow
                  key={sub.name}
                  sub={sub}
                  family={family}
                  active={activeSub === sub.name}
                  onActivate={setActiveSub}
                />
              ))}
            </div>

            {family.note && (
              <p className="mt-8 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-t-fg-mut">
                {family.note}{' '}
                <Link to="/ai-factory" className="text-t-acc underline-offset-4 hover:underline" data-testid="service-factory-link">
                  Enter AI Factory →
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* ---- Prev / Next ---- */}
        <div className="mt-28 grid gap-px overflow-hidden border border-t-border bg-t-border sm:grid-cols-2" data-testid="service-family-nav">
          <Link
            to={`/services/${prev.id}`}
            data-testid="service-prev"
            className="group bg-t-bg p-8 transition-colors duration-500 hover:bg-t-surface-hover"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">← Prev — {prev.number}</span>
            <span className="mt-3 block font-display text-2xl font-light tracking-tight text-t-fg-sec transition-colors duration-300 group-hover:text-t-fg sm:text-3xl">
              {prev.name}
            </span>
          </Link>
          <Link
            to={`/services/${next.id}`}
            data-testid="service-next"
            className="group bg-t-bg p-8 text-right transition-colors duration-500 hover:bg-t-surface-hover"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">Next — {next.number} →</span>
            <span className="mt-3 block font-display text-2xl font-light tracking-tight text-t-fg-sec transition-colors duration-300 group-hover:text-t-fg sm:text-3xl">
              {next.name}
            </span>
          </Link>
        </div>

        {/* ---- CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="mt-28 border-t border-t-border pt-16"
          data-testid="service-cta"
        >
          <h2 className="max-w-2xl font-display text-3xl font-light leading-tight tracking-tight text-t-fg sm:text-5xl">
            What should we build <span className="italic text-t-acc">together?</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-t-fg-sec">{SERVICES_PAGE.ctaSub}</p>
          <div className="mt-10 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
            <Magnetic>
              <Link
                to="/contact"
                data-testid="service-cta-primary"
                className="rounded-full bg-t-btn px-8 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text transition-colors duration-300 hover:bg-t-btn-hover"
              >
                Book an AI strategy call
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/ai-factory"
                data-testid="service-cta-secondary"
                className="group relative rounded-full border border-t-border-strong px-8 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-t-fg-sec transition-colors duration-300 hover:border-t-acc hover:text-t-fg"
              >
                Enter AI Factory
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
