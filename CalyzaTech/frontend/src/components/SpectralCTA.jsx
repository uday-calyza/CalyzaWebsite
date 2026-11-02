import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

/* The signature action — violet → electric blue → cyan spectral frame,
   quiet light sweep, arrow drift, max 1.025 scale. */
export default function SpectralCTA({ href, label = 'Enter AI Factory', dark = false, testId = 'spectral-cta' }) {
  return (
    <Magnetic>
      <Link
        to={href}
        data-testid={testId}
        className="group relative inline-flex rounded-full p-[1.5px] transition-transform duration-[400ms] hover:scale-[1.025]"
        style={{ background: 'var(--cta-spectral)' }}
      >
        <span
          className={`relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-[450ms] ${
            dark ? 'bg-calyza-plum text-calyza-ivory' : 'bg-t-bg text-t-fg'
          } group-hover:bg-transparent group-hover:text-white`}
        >
          <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-out group-hover:left-[130%]" />
          <span className="relative">{label}</span>
          <span className="relative transition-transform duration-[400ms] group-hover:translate-x-1.5" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </Magnetic>
  );
}
