import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

import { FreeTrialModalProvider } from './context/FreeTrialModalContext';
import FreeTrialModal from './components/ui/FreeTrialModal';

gsap.registerPlugin(ScrollTrigger);

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

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <FreeTrialModalProvider>
      <BrowserRouter>
        <div className="relative">
          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Header */}
          <Header />

          {/* Main Routes */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/taal-cares" element={<TaalCaresPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Global Free Trial Modal */}
          <FreeTrialModal />
        </div>
      </BrowserRouter>
    </FreeTrialModalProvider>
  );
}


