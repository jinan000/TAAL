import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { GALLERY_CATEGORIES } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

// Generate gallery items with category tags
const GALLERY_ITEMS = [
  { id: 1, category: 'Bharatanatyam', aspect: 'tall', color: '#D8A7A0' },
  { id: 2, category: 'Bollywood', aspect: 'wide', color: '#E8C8B8' },
  { id: 3, category: 'Performances', aspect: 'square', color: '#B97A72' },
  { id: 4, category: 'Community', aspect: 'tall', color: '#F4DDD7' },
  { id: 5, category: 'Bollywood', aspect: 'square', color: '#D8A7A0' },
  { id: 6, category: 'Behind the Scenes', aspect: 'wide', color: '#E8C8B8' },
  { id: 7, category: 'Bharatanatyam', aspect: 'square', color: '#B97A72' },
  { id: 8, category: 'Performances', aspect: 'tall', color: '#F4DDD7' },
  { id: 9, category: 'Community', aspect: 'wide', color: '#D8A7A0' },
  { id: 10, category: 'Behind the Scenes', aspect: 'square', color: '#E8C8B8' },
  { id: 11, category: 'Bollywood', aspect: 'tall', color: '#B97A72' },
  { id: 12, category: 'Performances', aspect: 'square', color: '#F4DDD7' },
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
                {/* Gradient placeholder */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}18 0%, #11111180 50%, ${item.color}10 100%)`,
                  }}
                />
                {/* Decorative dance element */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full border border-current" style={{ color: item.color }} />
                </div>
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
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${item?.color}25 0%, #111111 50%, ${item?.color}15 100%)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border border-rose-gold/20 flex items-center justify-center mx-auto mb-4">
                        <span className="font-display text-2xl text-rose-gold/40">{item?.category[0]}</span>
                      </div>
                      <p className="text-xs tracking-widest uppercase text-soft-ivory/40">
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
