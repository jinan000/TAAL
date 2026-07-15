import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// UI
import ScrollProgress from './components/ui/ScrollProgress';

// Sections
import Hero from './components/sections/Hero';
import AboutUs from './components/sections/AboutUs';
import Introduction from './components/sections/Introduction';
import CinematicVideo from './components/sections/CinematicVideo';
import WhyChoose from './components/sections/WhyChoose';
import Classes from './components/sections/Classes';
import Founders from './components/sections/Founders';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import TaalCares from './components/sections/TaalCares';
import FAQ from './components/sections/FAQ';
import JoinTeam from './components/sections/JoinTeam';
import Contact from './components/sections/Contact';

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
    <div className="relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Header */}
      <Header />

      {/* Main Content — Single Page Storytelling */}
      <main>
        <Hero />
        <AboutUs />
        <Introduction />
        <CinematicVideo />
        <WhyChoose />
        <Classes />
        <Founders />
        <Gallery />
        <Testimonials />
        <TaalCares />
        <FAQ />
        <JoinTeam />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
