import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { TESTIMONIALS } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.community-counter', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.community-counters',
          start: 'top 85%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Duplicate for infinite scroll effect
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #111111 50%, #050505 100%)' }}
    >
      <div className="section-container">
        <SectionTitle eyebrow="Voices of TAAL">
          What Our Community{' '}
          <span className="text-gradient-rose">Says</span>
        </SectionTitle>
      </div>

      {/* Continuous horizontal slider */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 py-4"
          style={{
            animation: 'marquee 60s linear infinite',
            width: 'max-content',
          }}
        >
          {allTestimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex-shrink-0 w-[340px] md:w-[400px] p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
            >
              {/* Large quotation mark */}
              <Quote size={32} className="text-rose-gold/20 mb-4" />

              <p className="text-soft-ivory/60 text-sm leading-relaxed font-light mb-6">
                {t.text}
              </p>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold/20 to-copper/20 flex items-center justify-center">
                  <span className="text-rose-gold text-xs font-medium">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-soft-ivory/80 text-sm font-medium">{t.name}</p>
                  <p className="text-soft-ivory/30 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Counters */}
      <div className="section-container mt-20">
        <div className="community-counters flex flex-wrap justify-center gap-12 md:gap-20">
          {[
            { label: 'Happy Students', value: '2,500+' },
            { label: 'Google Rating', value: '4.9★' },
            { label: 'Community Events', value: '100+' },
          ].map((item) => (
            <div key={item.label} className="community-counter text-center">
              <p className="text-3xl md:text-4xl font-display text-gradient-rose mb-2">
                {item.value}
              </p>
              <p className="text-xs tracking-widest uppercase text-soft-ivory/30">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
