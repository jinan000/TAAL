import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '../ui/MagneticButton';
import ScrollingWords from '../ui/ScrollingWords';
import heroImage from '../../assets/hero.jpeg';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP hero entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
        .from('.hero-heading', { opacity: 0, y: 40, duration: 1 }, '-=0.4')
        .from('.hero-word-container', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
        .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.3');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image full view */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      {/* Just a very subtle gradient at the bottom to blend into the next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
      
      {/* Cinematic ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large ambient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #D8A7A0 0%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #E8C8B8 0%, transparent 70%)',
            animation: 'breathe 10s ease-in-out infinite 2s',
          }}
        />
        {/* Decorative circles — inspired by TAAL logo */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-rose-gold/[0.04] opacity-40" />
        <div className="absolute bottom-32 left-16 w-40 h-40 rounded-full border border-champagne/[0.05] opacity-30" />
      </div>

      {/* Volumetric light rays */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[60vh] opacity-[0.06] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #D8A7A0 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center w-full max-w-7xl mx-auto px-4">
        {/* Eyebrow */}
        <p className="hero-eyebrow label-text mb-4">TAAL Dance Academy</p>

        {/* Main Heading */}
        <h1 className="hero-heading font-display text-soft-ivory leading-[1.1] mb-2 flex flex-col items-center justify-center text-[clamp(2rem,5vw,4.5rem)]">
          <span>Discover Your</span>
        </h1>
        
        <ScrollingWords />
        
        {/* Subheading */}
        <p className="hero-word-container text-soft-ivory/80 text-base md:text-lg font-light tracking-wide max-w-3xl mx-auto mb-10 leading-relaxed">
          Dance is more than movement. At TAAL, we inspire confidence, creativity, culture and community through the power of dance.
        </p>

        {/* Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton variant="primary" href="#contact">
            Book A Free Trial
          </MagneticButton>
          <MagneticButton variant="secondary" href="#classes">
            Explore Classes
          </MagneticButton>
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-luxury-black to-transparent" />
    </section>
  );
}
