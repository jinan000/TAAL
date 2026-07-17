import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { FAQ_DATA } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-4"
      >
        <h3 className="font-display text-lg md:text-xl text-soft-ivory/90 leading-snug">
          {question}
        </h3>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'border-rose-gold/30 text-rose-gold rotate-0' : 'border-white/[0.1] text-soft-ivory/40 rotate-0'
        }`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="w-full h-[1px] bg-gradient-to-r from-rose-gold/10 via-rose-gold/5 to-transparent mb-5" />
              <p className="text-soft-ivory/50 text-base leading-relaxed font-light">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0808 50%, #050505 100%)' }}
    >
      <div className="section-container">
        <SectionTitle eyebrow="Common Questions">
          Frequently Asked{' '}
          <span className="text-gradient-rose">Questions</span>
        </SectionTitle>

        <div className="faq-list max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="faq-item">
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {/* Concluding text */}
        <div className="mt-16 text-center max-w-2xl mx-auto faq-item">
          <h4 className="font-display text-xl text-soft-ivory mb-3">Still have questions?</h4>
          <p className="text-soft-ivory/60 text-sm leading-relaxed">
            We're here to help! Feel free to contact us by phone, email, or social media, and our team will be happy to assist you.
          </p>
        </div>
      </div>
    </section>
  );
}
