import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { FOUNDERS } from '../../utils/constants';
import visionariesBg from '../../assets/the-visionaries.jpeg';
import shreejaImg from '../../assets/shreeja.jpeg';
import lintaImg from '../../assets/linta.jpeg';

gsap.registerPlugin(ScrollTrigger);

const imageMap: Record<string, string> = {
  shreeja: shreejaImg,
  linta: lintaImg,
};

const FounderCard = ({ founder }: { founder: typeof FOUNDERS[number] }) => {
  const [expanded, setExpanded] = useState(false);
  const imageSrc = imageMap[founder.imageKey];

  return (
    <div className="founder-card group">
      <div className="relative rounded-2xl overflow-hidden glass-panel flex flex-col h-full">
        {/* Portrait */}
        <div 
          className="aspect-[3/4] relative overflow-hidden shrink-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
          }}
        >
          <div className="absolute inset-0 bg-dark-velvet">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={founder.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-2 border-rose-gold/20 flex items-center justify-center group-hover:border-rose-gold/40 transition-colors duration-500">
                  <span className="font-display text-3xl text-rose-gold/60">
                    {founder.name.split(' ')[0][0]}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
        </div>

        {/* Info */}
        <div className="px-8 pb-8 -mt-24 relative z-10 flex flex-col flex-grow">
          <h3 className="font-display text-2xl text-soft-ivory mb-1 drop-shadow-md">
            {founder.name}
          </h3>
          <p className="text-rose-gold/90 text-xs tracking-widest uppercase mb-4 drop-shadow-md font-medium">
            {founder.role}
          </p>
          <div className="text-soft-ivory/80 text-sm leading-relaxed font-light mb-4 drop-shadow-sm flex-grow space-y-3">
            <p>{founder.shortBio}</p>
            {expanded && (
              <div className="animate-fade-in space-y-3 pt-2">
                <p>{founder.longBio}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="self-start mt-2 text-rose-gold hover:text-soft-ivory transition-colors text-xs font-medium uppercase tracking-widest border-b border-rose-gold/30 hover:border-soft-ivory/50 pb-1"
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Founders() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.founder-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.founders-grid',
          start: 'top 75%',
        },
      });
      gsap.from('.founder-story', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.founder-story',
          start: 'top 85%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative section-spacing overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(180deg, rgba(5, 5, 5, 0.95) 0%, rgba(17, 14, 14, 0.3) 50%, rgba(5, 5, 5, 0.95) 100%), url(${visionariesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="section-container relative z-10">
        <SectionTitle eyebrow="Meet Our Founders">
          Built By <span className="text-gradient-rose">Passion</span>.
          <br />
          Driven By Purpose.
        </SectionTitle>

        {/* Founders Grid */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {FOUNDERS.map((founder, i) => (
            <FounderCard key={i} founder={founder} />
          ))}
        </div>

        {/* Center Story Card */}
        <div className="founder-story max-w-2xl mx-auto text-center">
          <div className="relative p-10 md:p-14 rounded-2xl border border-rose-gold/[0.08] bg-rose-gold/[0.02]">
            <div className="font-display text-5xl text-rose-gold/20 mb-4">"</div>
            <p className="text-lg md:text-xl text-soft-ivory/60 font-display italic leading-relaxed">
              Our dream was simple — to create a space where dance transforms lives. 
              A decade later, watching our students shine on stages around the world, 
              we know that dream has become a movement.
            </p>
            <div className="mt-6 w-12 h-[1px] bg-rose-gold/30 mx-auto" />
            <p className="mt-4 text-xs tracking-widest uppercase text-rose-gold/50">
              The Founders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
