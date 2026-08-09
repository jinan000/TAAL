import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, ArrowLeft, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_DATA, CONTACT_INFO } from '../utils/constants';

function FAQCard({
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
    <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.03]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-4 cursor-pointer"
      >
        <h3 className="font-display text-lg md:text-xl text-soft-ivory/90 leading-snug">
          {question}
        </h3>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'border-rose-gold/50 text-rose-gold bg-rose-gold/10' : 'border-white/[0.1] text-soft-ivory/40'
        }`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="w-full h-[1px] bg-gradient-to-r from-rose-gold/20 via-rose-gold/5 to-transparent mb-5" />
              <p className="text-soft-ivory/60 text-base leading-relaxed font-light">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-soft-ivory pt-32 pb-20">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-rose-gold/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-[#3e2723]/20 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-rose-gold/70 hover:text-rose-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-6 mb-16">
          <p className="text-rose-gold uppercase tracking-[0.3em] text-xs font-semibold">
            Support & Knowledge Base
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-soft-ivory">
            Frequently Asked <span className="text-gradient-rose">Questions</span>
          </h1>
          <p className="text-soft-ivory/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about TAAL Dance Academy, our classes, registration, schedules, and policies.
          </p>

          {/* Search Input */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-rose-gold/50 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions or keywords (e.g. trial, uniform, fees)..."
                className="w-full pl-13 pr-6 py-4 rounded-full bg-white/5 border border-rose-gold/20 text-soft-ivory placeholder-soft-ivory/30 focus:outline-none focus:border-rose-gold/60 focus:bg-white/[0.07] transition-all text-sm backdrop-blur-md"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-xs text-soft-ivory/40 hover:text-soft-ivory px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Items List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, i) => (
              <FAQCard
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))
          ) : (
            <div className="text-center py-16 glass-panel rounded-2xl">
              <p className="text-soft-ivory/60 text-lg font-light mb-2">No matching questions found</p>
              <p className="text-soft-ivory/40 text-sm">Try searching for different terms or browse all questions.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-2.5 rounded-full bg-rose-gold/20 border border-rose-gold/40 text-rose-gold text-xs uppercase tracking-wider hover:bg-rose-gold/30 transition-all cursor-pointer"
              >
                Show All Questions
              </button>
            </div>
          )}
        </div>

        {/* Contact Assistance Callout */}
        <div className="mt-20 glass-panel rounded-3xl p-8 md:p-12 text-center border border-rose-gold/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/5 via-transparent to-rose-gold/5 pointer-events-none" />
          <h3 className="font-display text-2xl md:text-3xl text-soft-ivory mb-4">
            Still Have Questions?
          </h3>
          <p className="text-soft-ivory/60 text-base max-w-xl mx-auto mb-8 font-light">
            We are always here to help you start your dance journey. Reach out to our team via phone, email, or WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-rose-gold/40 hover:bg-white/10 transition-all text-sm"
            >
              <Phone className="w-4 h-4 text-rose-gold" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-rose-gold/40 hover:bg-white/10 transition-all text-sm"
            >
              <Mail className="w-4 h-4 text-rose-gold" />
              <span>{CONTACT_INFO.email}</span>
            </a>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#contact';
              }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#cf9f72] text-black font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book A Free Trial</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

