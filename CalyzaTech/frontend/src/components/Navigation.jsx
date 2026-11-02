import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { NAV_LINKS, AI_FACTORY_CTA } from '../data/content';
import { useTheme } from './ThemeProvider';
import Magnetic from './Magnetic';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const darkMode = theme === 'dark';

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-t-border bg-t-bg/70 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
        data-testid="main-navigation"
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-14">
          <Link to="/" className="flex items-center gap-4" data-testid="nav-logo" aria-label="CalyzaTech home">
            <img
              src={darkMode ? '/calyza-logo-mark-dark.png' : '/calyza-logo-mark.png'}
              alt="CalyzaTech logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-body text-xs font-medium tracking-[0.3em] text-t-fg transition-colors duration-500">
              CALYZATECH
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  data-testid={link.testId}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active ? 'text-t-fg' : 'text-t-fg-sec hover:text-t-fg'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-t-acc transition-[width] duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              data-testid="theme-toggle"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              aria-pressed={darkMode}
              className="relative flex h-8 w-14 items-center rounded-full border border-t-border-strong px-1 transition-colors duration-300"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-t-acc text-t-btn-text transition-transform duration-500 ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {darkMode ? <Moon size={12} strokeWidth={1.8} /> : <Sun size={12} strokeWidth={1.8} />}
              </span>
            </button>

            <Magnetic>
              <Link
                to={AI_FACTORY_CTA.href}
                data-testid="enter-factory-btn"
                className="group relative hidden rounded-full p-[1px] transition-transform duration-[400ms] hover:scale-[1.03] sm:block"
                style={{ background: 'var(--cta-spectral)' }}
              >
                <span className="relative flex items-center gap-2 overflow-hidden rounded-full bg-t-bg px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-t-fg transition-colors duration-[450ms] group-hover:bg-transparent group-hover:text-white">
                  <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-out group-hover:left-[130%]" />
                  <span className="relative">{AI_FACTORY_CTA.label}</span>
                  <span className="relative transition-transform duration-[400ms] group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </Link>
            </Magnetic>

            <button
              onClick={() => setOpen((o) => !o)}
              data-testid="mobile-menu-button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`block h-px w-6 bg-t-fg transition-transform duration-300 ${
                  open ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-t-fg transition-transform duration-300 ${
                  open ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-t-bg px-8 transition-colors duration-500 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-2">
              {[...NAV_LINKS].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    data-testid={`mobile-${link.testId}`}
                    className={`block py-3 font-display text-4xl font-light tracking-tight ${
                      location.pathname === link.href ? 'italic text-t-acc' : 'text-t-fg'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <Link
                  to={AI_FACTORY_CTA.href}
                  data-testid="mobile-enter-factory-btn"
                  className="inline-block rounded-full bg-t-btn px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-t-btn-text"
                >
                  {AI_FACTORY_CTA.label}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
