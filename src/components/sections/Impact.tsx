import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCounter from '../ui/AnimatedCounter';
import { IMPACT_STATS, TIMELINE } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Impact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Timeline items
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0d0909 50%, #050505 100%)' }}
    >
      {/* Parallax background accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]"
        style={{ background: 'radial-gradient(circle, #D8A7A0 0%, transparent 70%)' }} />

      <div className="section-container">
        <SectionTitle eyebrow="Our Journey">
          A Decade of{' '}
          <span className="text-gradient-rose">Impact</span>
        </SectionTitle>

        {/* Large Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-28">
          {IMPACT_STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={3}
            />
          ))}
        </div>

        {/* Timeline */}
        <div className="timeline-container max-w-3xl mx-auto">
          <h3 className="text-center font-display text-2xl text-soft-ivory/80 mb-16">
            Our Story
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-rose-gold/30 via-rose-gold/10 to-transparent" />

            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item relative flex items-start gap-8 mb-16 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose-gold/60 border-2 border-luxury-black z-10 mt-2" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="inline-block font-display text-3xl text-gradient-rose mb-2">
                    {item.year}
                  </span>
                  <h4 className="font-display text-lg text-soft-ivory mb-2">
                    {item.title}
                  </h4>
                  <p className="text-soft-ivory/40 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
