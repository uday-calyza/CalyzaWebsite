import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data/content';
import { useTheme } from './ThemeProvider';

/* Pure footer bar — closing CTAs live on the pages themselves (one per page). */
export default function SiteFooter() {
  const { theme } = useTheme();

  return (
    <footer className="relative z-10" data-testid="site-footer">
      {/* Explicit dark section — plum bar stays deep in both themes */}
      <div className="bg-t-section-dark px-6 py-10 text-calyza-ivory md:px-14">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={theme === 'dark' ? '/calyza-logo-mark-dark.png' : '/calyza-logo-mark.png'}
              alt="CalyzaTech logo"
              className="h-11 w-11 object-contain"
              data-testid="footer-logo"
            />
            <p className="text-[11px] uppercase tracking-[0.25em] text-calyza-ivory/40">
              © 2026 CalyzaTech — The Calyza Crystal
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              ...NAV_LINKS.slice(0, 2),
              { label: 'AI Factory', href: '/ai-factory' },
              ...NAV_LINKS.slice(2),
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[11px] uppercase tracking-[0.2em] text-calyza-ivory/50 transition-colors duration-300 hover:text-calyza-ivory"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/privacy"
              data-testid="footer-link-privacy"
              className="text-[11px] uppercase tracking-[0.2em] text-calyza-ivory/50 transition-colors duration-300 hover:text-calyza-ivory"
            >
              Privacy Statement
            </Link>
            <Link
              to="/contact"
              data-testid="footer-link-strategy-call"
              className="text-[11px] uppercase tracking-[0.2em] text-calyza-violetB transition-colors duration-300 hover:text-calyza-ivory"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
