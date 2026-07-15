import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  className = '',
}: MarqueeProps) {
  const animDir = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: animDir,
        }}
      >
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8 ml-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
