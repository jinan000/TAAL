import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// UI
import ScrollProgress from './components/ui/ScrollProgress';

// Pages
import HomePage from './pages/HomePage';
import FaqPage from './pages/FaqPage';
import TaalCaresPage from './pages/TaalCaresPage';
import ClassesPage from './pages/ClassesPage';
import AboutPage from './pages/AboutPage';
import FoundersPage from './pages/FoundersPage';
import GalleryPage from './pages/GalleryPage';
import RentalsPage from './pages/RentalsPage';

import { FreeTrialModalProvider } from './context/FreeTrialModalContext';
import { TransitionProvider } from './context/TransitionContext';
import FreeTrialModal from './components/ui/FreeTrialModal';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh Lenis and ScrollTrigger after route change
    const timer = setTimeout(() => {
      if ((window as any).lenis) {
        (window as any).lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/rentals" element={<RentalsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/taal-cares" element={<TaalCaresPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll + sync with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      delete (window as any).lenis;
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <TransitionProvider>
      <FreeTrialModalProvider>
        <BrowserRouter>
          <div className="relative w-full max-w-[100vw] overflow-x-hidden">
            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Header */}
            <Header />

            {/* Main Routes */}
            <main>
              <AnimatedRoutes />
            </main>

            {/* Footer */}
            <Footer />

            {/* Global Free Trial Modal */}
            <FreeTrialModal />
          </div>
        </BrowserRouter>
      </FreeTrialModalProvider>
    </TransitionProvider>
  );
}
