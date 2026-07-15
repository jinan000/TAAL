import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const WORDS = ['COMMUNITY', 'MOVEMENT', 'RHYTHM', 'EXPRESSION', 'CONFIDENCE', 'CULTURE', 'GRACE', 'ENERGY'];

export default function ScrollingWords() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevActiveIndex = useRef(activeIndex);

  // Automatically cycle the active index
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    prevActiveIndex.current = activeIndex;
  }, [activeIndex]);

  return (
    <div 
      className="relative w-full max-w-[100vw] overflow-hidden py-4 mt-2 mb-6 h-20 flex items-center justify-center"
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
    >
      {WORDS.map((word, i) => {
        // Calculate shortest distance in a circular array
        let offset = i - activeIndex;
        const half = WORDS.length / 2;
        if (offset < -half) offset += WORDS.length;
        if (offset > half) offset -= WORDS.length;

        // Calculate previous offset to detect wrapping jumps
        let prevOffset = i - prevActiveIndex.current;
        if (prevOffset < -half) prevOffset += WORDS.length;
        if (prevOffset > half) prevOffset -= WORDS.length;

        // If it moved by more than 1 position, it wrapped around
        const isJumping = Math.abs(offset - prevOffset) > 1;
        const isActive = offset === 0;

        return (
          <motion.div
            key={word}
            className="absolute flex items-center justify-center top-1/2"
            style={{ left: "50%", y: "-50%" }}
            initial={false}
            animate={{ 
              x: `calc(-50% + ${offset} * clamp(240px, 25vw, 360px))`,
              scale: isActive ? 1.05 : 1,
              opacity: Math.abs(offset) >= 3 ? 0 : isActive ? 1 : 0.3
            }}
            transition={
              isJumping 
                ? { duration: 0 } // Snap instantly to the other side
                : { type: "spring", damping: 40, stiffness: 200, mass: 1 }
            }
          >
            <span
              className={`font-display tracking-widest uppercase transition-colors duration-700 whitespace-nowrap ${
                isActive 
                  ? 'text-2xl md:text-4xl text-gradient-rose drop-shadow-[0_0_20px_rgba(216,167,160,0.5)]' 
                  : 'text-base md:text-lg text-soft-ivory'
              }`}
            >
              {word}
            </span>

            {/* Separator mathematically placed at the exact midpoint between this word's center and the next word's center */}
            <span 
              className="absolute text-soft-ivory/20 text-xl font-light"
              style={{ 
                left: "calc(50% + clamp(120px, 12.5vw, 180px))", 
                transform: "translateX(-50%)" 
              }}
            >
              |
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
