import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { TEAM_POSITIONS } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Performance Team': Mic,
  'Instructor Team': GraduationCap,
  'Admin Team': Briefcase,
};

export default function JoinTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join-team"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #111111 50%, #050505 100%)' }}
    >
      <div className="section-container">
        <SectionTitle eyebrow="Careers">
          Join The{' '}
          <span className="text-gradient-rose">TAAL Family</span>
        </SectionTitle>

        <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TEAM_POSITIONS.map((pos) => {
            const Icon = iconMap[pos.title];
            return (
              <div key={pos.title} className="team-card">
                <GlassCard className="p-8 md:p-10 h-full flex flex-col" glow>
                  <div className="w-14 h-14 rounded-xl bg-rose-gold/[0.08] border border-rose-gold/[0.12] flex items-center justify-center mb-6">
                    <Icon size={24} className="text-rose-gold" />
                  </div>

                  <h3 className="font-display text-xl text-soft-ivory mb-3">
                    {pos.title}
                  </h3>
                  <p className="text-soft-ivory/40 text-sm leading-relaxed font-light mb-6 flex-grow">
                    {pos.description}
                  </p>

                  {/* Requirements */}
                  <div className="space-y-2 mb-8">
                    {pos.requirements.map((req) => (
                      <div key={req} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
                        <span className="text-xs text-soft-ivory/30">{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-rose-gold/70 text-xs tracking-widest uppercase group cursor-pointer hover:text-rose-gold transition-colors">
                    <span>Apply Now</span>
                    <ArrowRight size={14} />
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Resume CTA */}
        <div className="mt-16 text-center">
          <p className="text-soft-ivory/30 text-sm mb-6">
            Don't see a role that fits? Send us your resume anyway.
          </p>
          <MagneticButton variant="secondary" href={`mailto:${encodeURIComponent('info@taaldanceacademy.com')}`}>
            Send Your Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
