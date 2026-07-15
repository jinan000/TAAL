import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

export default function TaalCares() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.cares-content > *', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cares-content',
          start: 'top 80%',
        },
      });
      gsap.from('.cares-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cares-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const initiatives = [
    {
      title: 'Free Community Workshops',
      description: 'Monthly free dance workshops for underserved communities, bringing the joy of movement to everyone.',
    },
    {
      title: 'Charity Performances',
      description: 'Fundraising shows and cultural events that use dance to support local causes and organizations.',
    },
    {
      title: 'Youth Empowerment',
      description: 'Scholarship programs for talented young dancers who need financial support to pursue their passion.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="taal-cares"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #1A1414 50%, #050505 100%)' }}
    >
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #E8C8B8 0%, transparent 70%)' }} />

      <div className="section-container">
        <SectionTitle eyebrow="Giving Back">
          Dance For A{' '}
          <span className="text-gradient-rose">Cause</span>
        </SectionTitle>

        {/* Main content */}
        <div className="cares-content max-w-3xl mx-auto text-center mb-20">
          <p className="text-lg md:text-xl text-soft-ivory/60 font-light leading-relaxed mb-8">
            TAAL Cares is our commitment to using the transformative power of dance 
            to uplift communities. We believe every person deserves to experience 
            the joy, confidence, and connection that dance brings.
          </p>

          {/* Large emotional quote */}
          <div className="relative py-12 px-8 md:px-16 rounded-2xl border border-rose-gold/[0.08] bg-rose-gold/[0.02] my-12">
            <Heart size={28} className="text-rose-gold/30 mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-display italic text-soft-ivory/70 leading-relaxed">
              "When you dance with your heart, you heal the world. 
              Every step we take together creates a ripple of change."
            </p>
            <div className="mt-6 w-8 h-[1px] bg-rose-gold/30 mx-auto" />
          </div>
        </div>

        {/* Initiative Cards */}
        <div className="cares-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {initiatives.map((item) => (
            <div
              key={item.title}
              className="cares-card p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-gold/[0.08] border border-rose-gold/[0.12] flex items-center justify-center mx-auto mb-5">
                <Heart size={18} className="text-rose-gold" />
              </div>
              <h3 className="font-display text-lg text-soft-ivory mb-3">
                {item.title}
              </h3>
              <p className="text-soft-ivory/40 text-sm leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
