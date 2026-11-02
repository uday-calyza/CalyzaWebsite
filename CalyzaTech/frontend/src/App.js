import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import '@/App.css';
import ThemeProvider from '@/components/ThemeProvider';
import SmoothScroll, { scrollToTop } from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import PageTransition from '@/components/PageTransition';
import ErrorBoundary from '@/components/ErrorBoundary';
import { CrystalController } from '@/components/crystal/CrystalController';
import CrystalScene from '@/components/crystal/CrystalScene';
import EcosystemOverlay from '@/components/crystal/EcosystemOverlay';
import PulseWave from '@/components/crystal/PulseWave';
import CrystalScrollProgress from '@/components/CrystalScrollProgress';
import Hero from '@/components/Hero';
import CrystalChapter from '@/components/CrystalChapter';
import AccelerationChapter from '@/components/home/AccelerationChapter';
import TransformChapter from '@/components/home/TransformChapter';
import AIFactoryPreview from '@/components/AIFactoryPreview';
import HomeClosing from '@/components/HomeClosing';
import ProofSection from '@/components/home/ProofSection';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetail from '@/pages/ServiceDetail';
import AIFactoryPage from '@/pages/AIFactoryPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import CaseStudyDetail from '@/pages/CaseStudyDetail';
import ContactPage from '@/pages/ContactPage';
import { JOURNEY } from '@/data/content';

/* Retry a failed chunk once, then degrade to nothing instead of crashing the app */
const lazyRetry = (factory) =>
  lazy(() =>
    factory().catch(() => factory()).catch(() => ({ default: () => null }))
  );

const CalyzaChat = lazyRetry(() => import('@/components/chat/CalyzaChat'));

function HomePage() {
  const journeyRef = useRef(null);

  /* Pause every CSS animation inside the crystal journey while it is offscreen */
  useEffect(() => {
    const el = journeyRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle('anim-off', !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <CrystalController targetRef={journeyRef}>
      <div id="top" className="bg-calyza-bg font-body text-calyza-ink transition-colors duration-500">
        <CrystalScrollProgress />

        <main>
          <div ref={journeyRef} className="relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden" data-testid="crystal-stage">
              <CrystalScene />
              <EcosystemOverlay />
              <PulseWave />
            </div>

            <div className="relative z-10 -mt-[100vh]">
              <Hero />
              <CrystalChapter id="opening" caption title={JOURNEY.openingCaption} minH="min-h-[70vh]" />
              <CrystalChapter {...JOURNEY.ecosystem} minH="min-h-[140vh]" dark />
              <AccelerationChapter />
              <TransformChapter />
              {/* Crystal completes → compact AI Factory invitation */}
              <AIFactoryPreview />
            </div>
          </div>

          <ProofSection />
          <HomeClosing />
        </main>
      </div>
    </CrystalController>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

function Routed({ name, children }) {
  return (
    <PageTransition>
      <ErrorBoundary name={name}>{children}</ErrorBoundary>
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Routed name="home"><HomePage /></Routed>} />
        <Route path="/services" element={<Routed name="services"><ServicesPage /></Routed>} />
        <Route path="/services/:family" element={<Routed name="service-detail"><ServiceDetail /></Routed>} />
        <Route path="/ai-factory" element={<Routed name="ai-factory"><AIFactoryPage /></Routed>} />
        <Route path="/case-studies" element={<Routed name="case-studies"><CaseStudiesPage /></Routed>} />
        <Route path="/case-studies/:slug" element={<Routed name="case-detail"><CaseStudyDetail /></Routed>} />
        <Route path="/contact" element={<Routed name="contact"><ContactPage /></Routed>} />
        {/* Legacy case-study URLs → new structure (preserves old links) */}
        <Route path="/mortage-processing" element={<Navigate to="/case-studies/ai-agent-mortgage-application-processing" replace />} />
        <Route path="/serverless-ai-powered-invoice-automation-on-aws" element={<Navigate to="/case-studies/ai-powered-invoice-automation-on-aws" replace />} />
        <Route path="/healthcare-document-processing-with-ai-powered-ocr" element={<Navigate to="/case-studies/healthcare-document-processing-ai-ocr" replace />} />
        <Route path="/nexus-ai-powered-ocr-llm-extraction-for-home-health-referral-processing" element={<Navigate to="/case-studies/careops-home-health-referral-extraction" replace />} />
        <Route path="/dasa-holidays-aws-cloud-infrastructure" element={<Navigate to="/case-studies/dasa-holidays-aws-cloud-infrastructure" replace />} />
        <Route path="/jpptech-ai-powered-chatbot" element={<Navigate to="/case-studies/jpp-tech-ai-powered-chatbot" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [chatReady, setChatReady] = useState(false);

  useEffect(() => {
    const start = () => setChatReady(true);
    let id;
    if ('requestIdleCallback' in window) id = window.requestIdleCallback(start, { timeout: 1500 });
    else id = setTimeout(start, 300);
    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <SmoothScroll>
            <ScrollToTop />
            <Navigation />
            <AnimatedRoutes />
            <SiteFooter />
            <Toaster position="bottom-center" />
          </SmoothScroll>
          {chatReady && (
            <ErrorBoundary name="chat" fallback={null}>
              <Suspense fallback={null}>
                <CalyzaChat />
              </Suspense>
            </ErrorBoundary>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
