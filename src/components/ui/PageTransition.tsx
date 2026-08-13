import { motion, type TargetAndTransition } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransition, type TransitionType } from '../../context/TransitionContext';
import type { ReactNode } from 'react';

const transitionVariants: Record<TransitionType, {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.06 },
  },
  flip: {
    initial: { opacity: 0, rotateY: 90, transformPerspective: 1200 },
    animate: { opacity: 1, rotateY: 0, transformPerspective: 1200 },
    exit: { opacity: 0, rotateY: -90, transformPerspective: 1200 },
  },
};

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const { transition } = useTransition();
  const variants = transitionVariants[transition];

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      onAnimationComplete={() => {
        // Refresh ScrollTrigger after page transition completes
        ScrollTrigger.refresh();
        // Also refresh Lenis scroll bounds
        if ((window as any).lenis) {
          (window as any).lenis.resize();
        }
      }}
    >
      {children}
    </motion.div>
  );
}
