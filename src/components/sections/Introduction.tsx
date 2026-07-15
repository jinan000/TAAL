import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCounter from '../ui/AnimatedCounter';
import { STATS } from '../../utils/constants';
import introBg from '../../assets/introduction.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.intro-text', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.intro-content',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative section-spacing overflow-hidden"
      style={{
        backgroundImage: `url(${introBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/10 to-transparent z-10" />

      <div className="section-container relative z-10">
        <SectionTitle eyebrow="Who We Are">
          More Than A{' '}
          <span className="text-gradient-rose">Dance Academy</span>.
        </SectionTitle>

        {/* Text Layout */}
        <div className="intro-content max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <p className="intro-text text-lg md:text-xl text-soft-ivory/90 leading-relaxed font-light">
              At TAAL, we believe dance is more than movement — it's a language of the soul. 
              Founded with a vision to make Indian dance accessible to everyone, we've grown 
              into a vibrant community of passionate dancers.
            </p>
            <p className="intro-text text-base md:text-lg text-soft-ivory/80 leading-relaxed font-light">
              Our academy bridges the gap between tradition and modernity, offering 
              everything from classical Bharatanatyam to high-energy Bollywood. Every class 
              is designed to nurture not just technical skill, but confidence, creativity, 
              and cultural connection.
            </p>
            <p className="intro-text text-base md:text-lg text-soft-ivory/80 leading-relaxed font-light">
              Whether you're a tiny tot taking your first steps or an adult rediscovering 
              the joy of dance, TAAL is where your story begins.
            </p>
            {/* Decorative line */}
            <div className="intro-text pt-8 flex justify-center">
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-gold to-transparent" />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-24 pt-16 border-t border-white/[0.04]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
