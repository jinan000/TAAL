import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import bgImage from '../../assets/taalcares.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function TaalCares() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.cares-content > *', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cares-content',
          start: 'top 80%',
        },
      });
      gsap.from('.cares-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cares-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const initiatives = [
    {
      title: 'Charity Performances',
      description: 'Using the power of dance to support meaningful causes, our performances aim to bring awareness, joy, and encouragement to charitable initiatives and community organizations.',
    },
    {
      title: 'Free Workshops',
      description: 'We offer free dance workshops to make dance more accessible and introduce people of all ages to the joy, confidence, and creativity that comes with learning a new art form.',
    },
    {
      title: 'Cultural Events',
      description: 'Celebrating diversity through dance, we participate in and organize cultural events that bring communities together while showcasing the richness of Indian and global traditions.',
    },
    {
      title: 'Community Outreach',
      description: 'Through Taal Cares, we connect with the community by creating inclusive dance experiences, supporting local initiatives, and using our passion for dance to bring people together.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="taal-cares"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #1A1414 50%, #050505 100%)' }}
    >
      <div 
        className="absolute inset-0 z-0 opacity-[0.35] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.4) 20%, rgba(5,5,5,0.4) 80%, #050505 100%)' }}
      />

      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E8C8B8 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <SectionTitle eyebrow="TAAL CARES">
          Our Give Back to{' '}
          <span className="text-gradient-rose">Community</span> Initiative
        </SectionTitle>

        {/* Main content */}
        <div className="cares-content max-w-3xl mx-auto text-center mb-20">
          <p className="text-lg md:text-xl text-soft-ivory/60 font-light leading-relaxed mb-8">
            At Taal, we believe dance is more than just movement — it is a way to connect, inspire, and give back to the community. Through <em className="text-soft-ivory">Taal Cares</em>, we create opportunities to spread joy, celebrate culture, and make a positive impact through dance.
          </p>
        </div>

        {/* Initiative Cards */}
        <div className="cares-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {initiatives.map((item) => (
            <div
              key={item.title}
              className="cares-card glass-panel p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-rose-gold/[0.08] border border-rose-gold/[0.12] flex items-center justify-center mb-5 shrink-0">
                <Heart size={18} className="text-rose-gold" />
              </div>
              <h3 className="font-display text-xl text-soft-ivory mb-3">
                {item.title}
              </h3>
              <p className="text-soft-ivory/60 text-sm leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
