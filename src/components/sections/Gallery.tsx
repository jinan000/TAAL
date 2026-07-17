import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { GALLERY_CATEGORIES } from '../../utils/constants';
import rentalsBg from '../../assets/rentals.jpeg';

// Import AI generated gallery images
import imgBharatanatyam from '../../assets/gallery/bharatanatyam.png';
import imgBollywood from '../../assets/gallery/dance.png';
import imgPerformance from '../../assets/gallery/performance.png';
import imgCommunity from '../../assets/gallery/community.png';
import imgBts from '../../assets/gallery/bts.png';

gsap.registerPlugin(ScrollTrigger);

// Generate gallery items with category tags and images
const GALLERY_ITEMS = [
  { id: 1, category: 'Bharatanatyam', aspect: 'tall', color: '#D8A7A0', image: imgBharatanatyam },
  { id: 2, category: 'Bollywood', aspect: 'wide', color: '#E8C8B8', image: imgBollywood },
  { id: 3, category: 'Performances', aspect: 'square', color: '#B97A72', image: imgPerformance },
  { id: 4, category: 'Community', aspect: 'tall', color: '#F4DDD7', image: imgCommunity },
  { id: 5, category: 'Bollywood', aspect: 'square', color: '#D8A7A0', image: imgBollywood },
  { id: 6, category: 'Behind the Scenes', aspect: 'wide', color: '#E8C8B8', image: imgBts },
  { id: 7, category: 'Bharatanatyam', aspect: 'square', color: '#B97A72', image: imgBharatanatyam },
  { id: 8, category: 'Performances', aspect: 'tall', color: '#F4DDD7', image: imgPerformance },
  { id: 9, category: 'Community', aspect: 'wide', color: '#D8A7A0', image: imgCommunity },
  { id: 10, category: 'Behind the Scenes', aspect: 'square', color: '#E8C8B8', image: imgBts },
  { id: 11, category: 'Bollywood', aspect: 'tall', color: '#B97A72', image: imgBollywood },
  { id: 12, category: 'Performances', aspect: 'square', color: '#F4DDD7', image: imgPerformance },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<number | null>(null);

  const filtered =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0808 50%, #050505 100%)' }}
    >
      <div className="section-container">
        <SectionTitle eyebrow="Visual Stories">
          A Glimpse Into Our{' '}
          <span className="text-gradient-rose">World</span>
        </SectionTitle>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-medium border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-rose-gold/10 border-rose-gold/30 text-rose-gold'
                  : 'border-white/[0.06] text-soft-ivory/40 hover:text-soft-ivory/70 hover:border-white/[0.12]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="gallery-item break-inside-avoid cursor-pointer group"
              onClick={() => setLightboxItem(item.id)}
            >
              <div
                className={`relative rounded-xl overflow-hidden ${
                  item.aspect === 'tall' ? 'aspect-[3/4]' : item.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay gradient to keep it on-brand */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                />
                {/* Category label on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxury-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] tracking-widest uppercase text-soft-ivory/70">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-32 pt-20 relative pb-16 border-t border-white/[0.05]">
        <div 
          className="absolute inset-0 z-0 opacity-[0.35] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${rentalsBg})` }}
        />
        <div 
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.4) 15%, rgba(5,5,5,0.4) 85%, #050505 100%)' }}
        />
        
        <div className="section-container relative z-10">
          <SectionTitle eyebrow="Rentals" className="mb-6 text-center">
            Costumes & <span className="text-gradient-rose">Studio Space</span>
          </SectionTitle>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-soft-ivory/60 text-lg leading-relaxed">
              Need a space to create or the perfect costume for your next performance? Taal Dance Academy offers affordable rental services to support dancers, performers, and the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <div className="glass-panel p-10 rounded-2xl flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
              <h3 className="font-display text-2xl text-rose-gold mb-4">Costume Rentals</h3>
              <p className="text-soft-ivory/60 leading-relaxed flex-grow">
                Choose from a growing collection of dance costumes for Bollywood, Bharatanatyam, Semi-Classical, and cultural performances. Perfect for stage shows, competitions, festivals, school events, and special occasions.
              </p>
            </div>
            
            <div className="glass-panel p-10 rounded-2xl flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
              <h3 className="font-display text-2xl text-rose-gold mb-4">Studio Rentals</h3>
              <p className="text-soft-ivory/60 leading-relaxed flex-grow">
                Our fully equipped dance studio is available for hourly rentals. Whether you're hosting a rehearsal, workshop, private lesson, choreography session, fitness class, or creative project, our space is designed to meet your needs.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-soft-ivory/60 mb-8 max-w-2xl mx-auto">
              Interested in renting? Contact us for availability, pricing, and booking details.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold hover:bg-rose-gold hover:text-luxury-black transition-colors duration-300 text-xs tracking-widest uppercase font-medium">
              Contact Us for Booking
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem !== null && (
          <motion.div
            className="fixed inset-0 z-[60] bg-luxury-black/95 backdrop-blur-2xl flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center text-soft-ivory/60 hover:text-rose-gold transition-colors"
              onClick={() => setLightboxItem(null)}
            >
              <X size={20} />
            </button>
            <motion.div
              className="max-w-3xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const item = GALLERY_ITEMS.find((i) => i.id === lightboxItem);
                return (
                  <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                    <img 
                      src={item?.image} 
                      alt={item?.category} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 rounded-full border border-rose-gold/40 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm bg-black/30">
                        <span className="font-display text-4xl text-rose-gold">{item?.category[0]}</span>
                      </div>
                      <p className="text-lg tracking-widest uppercase text-soft-ivory font-medium drop-shadow-md">
                        {item?.category}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
