import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Music, Users, Star, Award, Heart } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { WHY_CHOOSE_FEATURES } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Music, Users, Star, Award, Heart,
};

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Manifesto text reveal
      gsap.from('.manifesto-text', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.manifesto-text',
          start: 'top 85%',
        },
      });

      // Cards stagger
      gsap.from('.feature-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
      });

      // Bottom quote
      gsap.from('.bottom-quote', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bottom-quote',
          start: 'top 90%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #111111 50%, #050505 100%)' }}
    >
      <div className="section-container">
        <SectionTitle eyebrow="Why Choose Us">
          Where Dance Becomes{' '}
          <span className="text-gradient-rose">Destiny</span>
        </SectionTitle>

        {/* Manifesto */}
        <div className="manifesto-text max-w-3xl mx-auto text-center mb-20">
          <p className="text-xl md:text-2xl text-soft-ivory/60 font-light leading-relaxed font-display italic">
            "We don't just teach dance. We ignite passion, build confidence, and create a 
            community where every soul finds their rhythm."
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.title} className="feature-card">
                <GlassCard className="p-8 md:p-10 h-full" glow>
                  <div className="w-12 h-12 rounded-xl bg-rose-gold/[0.08] border border-rose-gold/[0.12] flex items-center justify-center mb-6">
                    <Icon size={22} className="text-rose-gold" />
                  </div>
                  <h3 className="font-display text-xl text-soft-ivory mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-soft-ivory/50 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="bottom-quote mt-24 text-center">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent mx-auto mb-8" />
          <p className="text-base text-soft-ivory/30 tracking-widest uppercase font-light">
            Every great dancer was once a beginner
          </p>
        </div>
      </div>
    </section>
  );
}
