import { useCountUp } from '../../hooks';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2.5,
}: AnimatedCounterProps) {
  const ref = useCountUp(value, duration);

  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span
          ref={ref}
          className="text-5xl md:text-7xl font-display text-gradient-rose"
        >
          0
        </span>
        {suffix && (
          <span className="text-3xl md:text-5xl font-display text-rose-gold/70">
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-medium tracking-widest uppercase text-soft-ivory/40">
        {label}
      </p>
    </div>
  );
}
