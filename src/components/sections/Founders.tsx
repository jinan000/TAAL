import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { FOUNDERS } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Founders() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.founder-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.founders-grid',
          start: 'top 75%',
        },
      });
      gsap.from('.founder-story', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.founder-story',
          start: 'top 85%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #110e0e 50%, #050505 100%)' }}
    >
      <div className="section-container">
        <SectionTitle eyebrow="The Visionaries">
          Built By <span className="text-gradient-rose">Passion</span>.
          <br />
          Driven By Purpose.
        </SectionTitle>

        {/* Founders Grid */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {FOUNDERS.map((founder, i) => (
            <div key={i} className="founder-card group">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                {/* Portrait placeholder */}
                <div className="aspect-[3/4] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-velvet via-charcoal to-dark-velvet">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full border-2 border-rose-gold/20 flex items-center justify-center group-hover:border-rose-gold/40 transition-colors duration-500">
                        <span className="font-display text-3xl text-rose-gold/60">
                          {founder.name.split(' ')[0][0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-8 -mt-20 relative z-10">
                  <h3 className="font-display text-2xl text-soft-ivory mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-rose-gold/70 text-xs tracking-widest uppercase mb-4">
                    {founder.role}
                  </p>
                  <p className="text-soft-ivory/40 text-sm leading-relaxed font-light">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Story Card */}
        <div className="founder-story max-w-2xl mx-auto text-center">
          <div className="relative p-10 md:p-14 rounded-2xl border border-rose-gold/[0.08] bg-rose-gold/[0.02]">
            <div className="font-display text-5xl text-rose-gold/20 mb-4">"</div>
            <p className="text-lg md:text-xl text-soft-ivory/60 font-display italic leading-relaxed">
              Our dream was simple — to create a space where dance transforms lives. 
              A decade later, watching our students shine on stages around the world, 
              we know that dream has become a movement.
            </p>
            <div className="mt-6 w-12 h-[1px] bg-rose-gold/30 mx-auto" />
            <p className="mt-4 text-xs tracking-widest uppercase text-rose-gold/50">
              The Founders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
