import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Marquee from '../ui/Marquee';
import { CLASSES } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Classes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 380;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.class-card', {
        opacity: 0,
        x: 60,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.classes-carousel',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="classes"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0d0909 50%, #050505 100%)' }}
    >
      {/* Top Marquee */}
      <Marquee speed={40} className="mb-16 opacity-[0.06]">
        {CLASSES.map((c) => (
          <span key={c.title} className="font-display text-6xl md:text-8xl text-soft-ivory whitespace-nowrap mx-8">
            {c.title}
          </span>
        ))}
      </Marquee>

      <div className="section-container">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle eyebrow="Our Programs" className="mb-0 text-left">
            Explore Our{' '}
            <span className="text-gradient-rose">Classes</span>
          </SectionTitle>

          {/* Nav arrows — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-rose-gold/30 text-rose-gold hover:bg-rose-gold/10'
                  : 'border-white/[0.06] text-white/20 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-rose-gold/30 text-rose-gold hover:bg-rose-gold/10'
                  : 'border-white/[0.06] text-white/20 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="classes-carousel flex gap-6 overflow-x-auto pb-8 px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CLASSES.map((cls, i) => (
          <motion.div
            key={cls.title}
            className="class-card flex-shrink-0 w-[320px] md:w-[360px] snap-start"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm group cursor-pointer">
              {/* Background gradient unique per card */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  background: `radial-gradient(ellipse at ${30 + (i % 3) * 20}% ${40 + (i % 2) * 20}%, ${cls.color}22 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {/* Top */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium border mb-6"
                    style={{ color: cls.color, borderColor: `${cls.color}30` }}>
                    {cls.subtitle}
                  </span>
                  <h3 className="font-display text-2xl text-soft-ivory leading-tight mb-3">
                    {cls.title}
                  </h3>
                  <p className="text-soft-ivory/40 text-sm leading-relaxed font-light">
                    {cls.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="flex items-center gap-2 text-xs tracking-widest uppercase group-hover:text-rose-gold transition-colors duration-300 text-soft-ivory/30">
                  <span>Learn More</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  border: `1px solid ${cls.color}25`,
                  boxShadow: `inset 0 0 30px ${cls.color}08`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
