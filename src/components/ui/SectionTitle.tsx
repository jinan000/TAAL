import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  eyebrow?: string;
  children: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  children,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const els = containerRef.current!.querySelectorAll('.st-animate');
      gsap.from(els, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mb-16 md:mb-24 ${
        align === 'center' ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <h3 className="st-animate font-display text-rose-gold/90 text-3xl md:text-5xl font-medium leading-tight mb-4">
          {eyebrow}
        </h3>
      )}
      <h2 className="st-animate font-body text-xs md:text-base text-soft-ivory/80 uppercase tracking-[0.25em] leading-relaxed mb-6">
        {children}
      </h2>
      {subtitle && (
        <p className="st-animate mt-4 max-w-2xl text-xs md:text-sm text-soft-ivory/60 font-light mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
