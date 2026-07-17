import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { TEAM_POSITIONS } from '../../utils/constants';
import bgImage from '../../assets/joinourteam.jpeg';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Performance Team (Taal Crew)': Mic,
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
      <div 
        className="absolute inset-0 z-0 opacity-[0.35] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.4) 20%, rgba(5,5,5,0.4) 80%, #050505 100%)' }}
      />
      <div className="section-container relative z-10">
        <SectionTitle eyebrow="Join Our Team">
          Join The{' '}
          <span className="text-gradient-rose">TAAL Family</span>
        </SectionTitle>

        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-soft-ivory/60 text-lg">
            Passionate about dance and making a difference? We'd love to have you as part of the Taal family!
          </p>
        </div>

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
          <p className="text-soft-ivory/60 text-lg mb-6 max-w-2xl mx-auto">
            Interested in joining us? We'd love to hear from you! Send us your resume at <a href="mailto:infoattaaldanceacademy@gmail.com" className="text-rose-gold hover:underline">infoattaaldanceacademy@gmail.com</a>
            <br/><br/>
            Or get in touch to learn about current opportunities.
          </p>
          <MagneticButton variant="secondary" href="mailto:infoattaaldanceacademy@gmail.com">
            Send Your Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
