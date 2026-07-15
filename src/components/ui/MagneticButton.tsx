import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    // Only enable magnetic on desktop (pointer: fine)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1,0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1,0.4)' });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * 0.25);
      yTo((e.clientY - rect.top - rect.height / 2) * 0.25);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMove as EventListener);
    el.addEventListener('mouseleave', handleLeave as EventListener);
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener);
      el.removeEventListener('mouseleave', handleLeave as EventListener);
    };
  }, []);

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide text-xs uppercase transition-all duration-300 will-change-transform';

  const variants = {
    primary:
      'px-6 py-3 bg-gradient-to-r from-rose-gold via-champagne to-copper text-luxury-black rounded-full hover:shadow-[0_0_40px_rgba(216,167,160,0.3)] hover:scale-[1.02]',
    secondary:
      'px-6 py-3 border border-rose-gold/30 text-rose-gold rounded-full hover:bg-rose-gold/10 hover:border-rose-gold/50 hover:shadow-[0_0_30px_rgba(216,167,160,0.15)]',
    ghost:
      'px-6 py-3 text-soft-ivory/70 hover:text-rose-gold',
  };

  const Tag = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={btnRef as any}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
