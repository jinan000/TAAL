import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { TESTIMONIALS } from '../../utils/constants';
import voicesBg from '../../assets/voices_of_taal.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const manualScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 4x duplicated testimonials for seamless infinite horizontal scrolling
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  // GSAP animations for community counters
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

  // Set initial scroll position to start smoothly in the middle set
  useEffect(() => {
    if (scrollRef.current) {
      const oneSetWidth = scrollRef.current.scrollWidth / 4;
      scrollRef.current.scrollLeft = oneSetWidth;
    }
  }, []);

  // Continuous auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollRef.current && !isHovered && !isMouseDown && !isManualScrolling) {
        scrollRef.current.scrollLeft += 1.2; // Speed of auto scroll

        const { scrollLeft, scrollWidth } = scrollRef.current;
        const oneSetWidth = scrollWidth / 4;

        // Reset scroll position seamlessly when reaching bounds
        if (oneSetWidth > 0) {
          if (scrollLeft >= oneSetWidth * 2) {
            scrollRef.current.scrollLeft -= oneSetWidth;
          } else if (scrollLeft <= 5) {
            scrollRef.current.scrollLeft += oneSetWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current);
    };
  }, [isHovered, isMouseDown, isManualScrolling]);

  // Button manual scroll
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    // Pause auto scroll during manual arrow navigation so RAF doesn't cancel smooth scroll
    setIsManualScrolling(true);
    if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current);

    const container = scrollRef.current;
    const firstCard = container.querySelector('.flex-shrink-0') as HTMLElement;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 380;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    manualScrollTimerRef.current = setTimeout(() => {
      setIsManualScrolling(false);
    }, 1500);
  };

  // Mouse Drag to scroll logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #111111 50%, #050505 100%)' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.3] bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${voicesBg})` }}
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.4) 25%, rgba(5,5,5,0.4) 75%, #050505 100%)' }}
      />

      <div className="section-container relative z-10 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <SectionTitle eyebrow="Voices of TAAL">
            What Our Community{' '}
            <span className="text-gradient-rose">Says</span>
          </SectionTitle>
        </div>

        {/* Scroll Control Buttons */}
        <div className="flex items-center gap-3 self-end md:self-auto pb-2">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="p-3 rounded-full border border-white/10 glass backdrop-blur-md text-soft-ivory hover:bg-rose-gold/20 hover:border-rose-gold/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="p-3 rounded-full border border-white/10 glass backdrop-blur-md text-soft-ivory hover:bg-rose-gold/20 hover:border-rose-gold/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Side-Scrollable Container */}
      <div className="relative z-10 px-4 md:px-8">
        {/* Left & Right subtle gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex gap-6 py-6 overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {allTestimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.04] hover:-translate-y-1 group"
            >
              {/* Quotation mark */}
              <Quote size={32} className="text-rose-gold/30 group-hover:text-rose-gold/60 transition-colors duration-300 mb-4" />

              <p className="text-soft-ivory/70 text-sm leading-relaxed font-light mb-6">
                "{t.text}"
              </p>

              {/* Profile */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold/25 to-copper/25 border border-rose-gold/20 flex items-center justify-center">
                  <span className="text-rose-gold text-xs font-semibold">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-soft-ivory/90 text-sm font-medium group-hover:text-rose-gold transition-colors duration-300">
                    {t.name}
                  </p>
                  <p className="text-soft-ivory/40 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swipe/Drag Hint indicator */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-soft-ivory/40 z-10 relative">
        <span className="inline-block w-8 h-[1px] bg-rose-gold/30"></span>
        <span>Auto-scrolling • Drag or use arrows to navigate side to side</span>
        <span className="inline-block w-8 h-[1px] bg-rose-gold/30"></span>
      </div>

      {/* Community Counters */}
      <div className="section-container relative z-10 mt-16 md:mt-20">
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
