import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(216,167,160,0.08), transparent 60%)`;
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl glass-panel ${
        hover ? 'cursor-pointer' : ''
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={
        hover
          ? {
              y: -4,
              borderColor: 'rgba(216, 167, 160, 0.2)',
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      style={
        glow ? { boxShadow: '0 0 30px rgba(216,167,160,0.06)' } : undefined
      }
    >
      {/* Mouse-follow glow overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
      />
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
