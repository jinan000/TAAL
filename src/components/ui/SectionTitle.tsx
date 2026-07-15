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
        <p className="st-animate label-text mb-4 md:mb-6">{eyebrow}</p>
      )}
      <h2 className="st-animate font-display text-soft-ivory leading-[1.1]">
        {children}
      </h2>
      {subtitle && (
        <p className="st-animate mt-6 max-w-2xl text-lg text-soft-ivory/50 font-light mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
