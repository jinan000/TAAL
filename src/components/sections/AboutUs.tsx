import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LotusSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M12 22c0-5 3-8 3-8s1-4 4-4c-2 0-5 1-6 2-1 2-1 3-1 3s0-1-1-3c-1-1-4-2-6-2 3 0 4 4 4 4s3 3 3 8z" />
    <path d="M12 22c0-8 6-12 6-12s3-4 6-4c-3 0-6 2-8 3-2 3-2 5-2 5s0-2-2-5c-2-1-5-3-8-3 3 0 6 4 6 4s6 4 6 12z" />
  </svg>
);

const TargetSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CommunitySVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ExpandableBlock = ({ preview, full }: { preview: React.ReactNode; full: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="text-soft-ivory/60 font-light leading-relaxed text-sm md:text-base space-y-4">
        {expanded ? full : preview}
      </div>
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="mt-4 text-rose-gold hover:text-soft-ivory transition-colors text-xs font-medium uppercase tracking-widest border-b border-rose-gold/30 pb-1"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

const CORE_VALUES = [
  {
    title: 'Passion',
    desc: 'We teach with heart and inspire a genuine love for dance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  },
  {
    title: 'Inclusivity',
    desc: 'Everyone belongs at Taal, regardless of age, experience, or background.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    title: 'Growth',
    desc: 'We encourage continuous learning, self-discovery, and personal development.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  },
  {
    title: 'Excellence',
    desc: 'We are committed to delivering high-quality training while nurturing every student\'s unique potential.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    title: 'Community',
    desc: 'We foster a supportive environment where friendships are built, achievements are celebrated, and everyone grows together.',
    icon: <CommunitySVG className="w-8 h-8" />
  },
  {
    title: 'Creativity',
    desc: 'We embrace innovation, versatility, and artistic expression through every movement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    )
  },
  {
    title: 'Impact',
    desc: 'We believe dance can uplift lives, strengthen communities, and create lasting positive change.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    )
  }
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Fade up reveals
      const reveals = document.querySelectorAll('.au-reveal');
      reveals.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });

      // Split text columns animation
      gsap.from('.au-col', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.au-grid',
          start: 'top 80%',
        }
      });

      // Values stagger
      gsap.from('.au-value', {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.au-values',
          start: 'top 85%',
        }
      });

      // Mouse parallax for side decorations
      const floaters = document.querySelectorAll('.au-float');
      sectionRef.current?.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(floaters, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: 'power2.out'
        });
      });

      // Line drawing for dividers
      gsap.from('.au-divider', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.au-grid',
          start: 'top 75%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] py-24 md:py-32 overflow-x-hidden"
    >
      {/* --- Ambient Background Layers --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Velvet brown gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#3e2723]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-gold/5 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Glowing Embers */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-rose-gold/40 rounded-full blur-[2px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/40 rounded-full blur-[1px]" />
        
        {/* Silk light ribbons */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-tr from-[#3e2723]/20 via-transparent to-transparent opacity-50 blur-[50px]" />
        <div className="absolute bottom-0 right-0 w-full h-[40vh] bg-gradient-to-tl from-rose-gold/10 via-transparent to-transparent opacity-50 blur-[60px]" />
        
        {/* Soft lens flares */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[150px] bg-gradient-to-b from-rose-gold/10 to-transparent blur-[50px]" />
      </div>

      {/* --- Side Decorations (Parallax) --- */}
      <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 au-float opacity-20 pointer-events-none z-0 hidden lg:block">
        <div className="relative w-[400px] h-[400px] rounded-full border border-rose-gold/20 flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full border border-rose-gold/10 flex items-center justify-center">
            {/* Abstract Silhouette Placeholder */}
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-48 h-48 text-rose-gold/40 stroke-[0.5]">
              <path d="M50 20 Q60 10 70 30 Q80 50 60 70 Q50 90 40 70 Q20 50 30 30 Q40 10 50 20 Z" />
              <circle cx="50" cy="50" r="15" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute right-[-5%] top-1/3 au-float opacity-20 pointer-events-none z-0 hidden lg:block">
        <div className="relative w-[300px] h-[300px] rounded-full border border-rose-gold/20 flex items-center justify-center">
          <LotusSVG className="w-32 h-32 text-rose-gold/40" />
        </div>
      </div>


      {/* --- Main Content Container --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        
        {/* Top Section */}
        <div className="au-reveal flex flex-col items-center text-center mb-16">
          <p className="text-rose-gold/60 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4">
            About Us
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-rose-gold/40" />
            <LotusSVG className="w-4 h-4 text-rose-gold/60" />
            <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-rose-gold/40" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl text-soft-ivory leading-tight mb-8">
            More Than Dance. <br/>
            <span className="text-gradient-rose">A Way Of Life.</span>
          </h2>
        </div>


        {/* Main Content Grid (3 Columns) */}
        <div className="au-grid relative w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 text-center">
          
          {/* Vertical dividers for desktop */}
          <div className="hidden md:block au-divider absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-rose-gold/20 to-transparent" />
          <div className="hidden md:block au-divider absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-rose-gold/20 to-transparent" />

          {/* Col 1 */}
          <div className="au-col flex flex-col items-center px-4">
            <LotusSVG className="w-10 h-10 text-rose-gold mb-6" />
            <h3 className="text-soft-ivory tracking-widest uppercase text-sm mb-4">Our Vision</h3>
            <p className="text-soft-ivory/60 font-light leading-relaxed text-sm md:text-base">
              To become Edmonton's most inspiring dance community, where people of every age and background discover confidence, creativity, and a lifelong love for dance while celebrating the richness of diverse cultures and artistic expression.
            </p>
          </div>

          {/* Col 2 */}
          <div className="au-col flex flex-col items-center px-4">
            <TargetSVG className="w-10 h-10 text-rose-gold mb-6" />
            <h3 className="text-soft-ivory tracking-widest uppercase text-sm mb-4">Our Mission</h3>
            <ExpandableBlock 
              preview={<p>At Taal Dance Academy, our mission is to create a welcoming and empowering space where dance is accessible to everyone. Through high-quality instruction, diverse dance styles, and a supportive community...</p>}
              full={
                <>
                  <p>At Taal Dance Academy, our mission is to create a welcoming and empowering space where dance is accessible to everyone.</p>
                  <p>Through high-quality instruction, diverse dance styles, and a supportive community, we help our students grow in skill, confidence, discipline, and self-expression—both on and off the dance floor. We strive to inspire meaningful connections, celebrate individuality, and use dance as a force for positive impact within our community.</p>
                </>
              }
            />
          </div>

          {/* Col 3 */}
          <div className="au-col flex flex-col items-center px-4">
            <CommunitySVG className="w-10 h-10 text-rose-gold mb-6" />
            <h3 className="text-soft-ivory tracking-widest uppercase text-sm mb-4">About Taal</h3>
            <ExpandableBlock 
              preview={<p>Founded in Edmonton, by two passionate dancers - Shreeja and Linta, Taal was built on a shared dream of creating a space where people of all ages and backgrounds feel inspired to move, learn, and grow together...</p>}
              full={
                <>
                  <p>Founded in Edmonton, by two passionate dancers - Shreeja and Linta, Taal was built on a shared dream of creating a space where people of all ages and backgrounds feel inspired to move, learn, and grow together. Our approach goes beyond teaching choreography. We encourage every student to explore different dance styles, challenge their limits, and uncover the unique artist within.</p>
                  <p>Whether you're joining us for Bollywood, Bharatanatyam, dance fitness, workshops, or performance training, every class is designed to be engaging, empowering, and filled with positive energy. Our instructors focus on building strong technique while nurturing confidence, discipline, and a genuine love for dance.</p>
                  <p>At Taal, community is at the heart of everything we do. We celebrate every milestone, support every journey, and believe that everyone deserves a place where they feel seen, encouraged, and inspired.</p>
                </>
              }
            />
            <p className="text-[#cf9f72] font-medium leading-relaxed text-sm italic mt-4">
              We are more than a dance academy—<br/>
              we are a community united by rhythm, passion, and purpose.
            </p>
          </div>
        </div>


        {/* Core Values Section */}
        <div className="w-full flex flex-col items-center mb-16">
          <div className="au-reveal flex items-center justify-center w-full mb-8">
            <div className="w-full max-w-[100px] h-[1px] bg-gradient-to-r from-transparent to-rose-gold/20" />
            <h3 className="px-6 text-soft-ivory tracking-[0.2em] uppercase text-xs">Our Core Values</h3>
            <div className="w-full max-w-[100px] h-[1px] bg-gradient-to-l from-transparent to-rose-gold/20" />
          </div>

          <div className="au-values w-full flex flex-wrap justify-center gap-6 md:gap-10">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="au-value flex flex-col items-center group">
                <div className="text-rose-gold/60 group-hover:text-rose-gold transition-colors duration-500 mb-3 drop-shadow-[0_0_8px_rgba(207,159,114,0)] group-hover:drop-shadow-[0_0_12px_rgba(207,159,114,0.4)]">
                  {value.icon}
                </div>
                <h4 className="text-soft-ivory text-xs uppercase tracking-wider mb-2">{value.title}</h4>
                <p className="text-soft-ivory/50 text-[10px] tracking-wide text-center uppercase max-w-[160px] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom Statement */}
        <div className="au-reveal text-center mt-auto">
          <h2 className="font-display text-2xl md:text-4xl text-soft-ivory leading-tight mb-4">
            Discover your rhythm.<br/>
            Find your confidence.
          </h2>
          <p className="text-gradient-rose text-2xl md:text-3xl font-serif italic mb-6">
            Become part of the Taal family.
          </p>
          <LotusSVG className="w-6 h-6 text-rose-gold/40 mx-auto" />
        </div>

      </div>
    </section>
  );
}
