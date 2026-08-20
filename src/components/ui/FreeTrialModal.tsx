import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';
import { useFreeTrialModal } from '../../context/FreeTrialModalContext';
import MagneticButton from './MagneticButton';
import { API_URL } from '../../utils/config';

const DANCE_STYLES = [
  'Bollywood',
  'Bharatanatyam',
  'Semi-Classical',
  'Dance Fitness',
  'Contemporary',
  'Other',
] as const;

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function FreeTrialModal() {
  const { isOpen, initialData, closeModal } = useFreeTrialModal();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    danceStyle: 'Bollywood',
    experienceLevel: 'Beginner',
    preferredClass: '',
    message: '',
    website: '', // Honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update initial data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormState((prev) => ({
        ...prev,
        danceStyle: initialData.danceStyle || 'Bollywood',
        preferredClass: initialData.preferredClass || '',
      }));
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen, initialData]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Frontend Basic Validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/free-trial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to send your request. Please try again or contact us directly.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Unable to send your request. Please check your network connection or try again directly.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-luxury-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-2xl bg-[#0F0A0A] border border-rose-gold/20 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(216,167,160,0.12)] z-10 overflow-hidden my-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 text-soft-ivory/60 hover:text-rose-gold hover:border-rose-gold/40 hover:bg-white/5 transition-all cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-rose-gold/10 to-transparent blur-xl pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-gold/10 border border-rose-gold/20 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles size={13} />
                <span>Begin Your Journey</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-soft-ivory">
                Book A Free <span className="text-gradient-rose">Trial Class</span>
              </h2>
              <p className="text-soft-ivory/60 text-xs sm:text-sm max-w-md mx-auto mt-2 font-light">
                Experience the magic of TAAL Dance Academy. Fill out your details below and our team will get in touch to schedule your session.
              </p>
            </div>

            {/* Content Body */}
            {status === 'success' ? (
              <motion.div
                className="text-center py-10 space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-rose-gold/10 border border-rose-gold/30 flex items-center justify-center mx-auto text-rose-gold">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-2xl text-soft-ivory">Thank You</h3>
                <p className="text-soft-ivory/70 text-sm max-w-md mx-auto leading-relaxed">
                  Your trial request has been received. The TAAL team will get back to you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-gold via-champagne to-copper text-luxury-black font-medium text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Spam Field */}
                <input
                  type="text"
                  name="website"
                  value={formState.website}
                  onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span>{errorMessage || 'Unable to send your request. Please try again or contact us directly.'}</span>
                  </div>
                )}

                {/* Grid 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors placeholder:text-soft-ivory/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="ananya@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors placeholder:text-soft-ivory/20"
                    />
                  </div>
                </div>

                {/* Grid 2: Phone + Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+1 (587) 000-0000"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors placeholder:text-soft-ivory/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                      Age / Age Group
                    </label>
                    <input
                      type="text"
                      value={formState.age}
                      onChange={(e) => setFormState({ ...formState, age: e.target.value })}
                      placeholder="e.g. 12 yrs / Adult"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors placeholder:text-soft-ivory/20"
                    />
                  </div>
                </div>

                {/* Grid 3: Dance Style + Experience Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                      Dance Style *
                    </label>
                    <select
                      value={formState.danceStyle}
                      onChange={(e) => setFormState({ ...formState, danceStyle: e.target.value })}
                      className="w-full bg-[#1A1414] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors appearance-none"
                    >
                      {DANCE_STYLES.map((style) => (
                        <option key={style} value={style} className="bg-[#1A1414]">
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                      Experience Level *
                    </label>
                    <select
                      value={formState.experienceLevel}
                      onChange={(e) => setFormState({ ...formState, experienceLevel: e.target.value })}
                      className="w-full bg-[#1A1414] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors appearance-none"
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <option key={level} value={level} className="bg-[#1A1414]">
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Class */}
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                    Preferred Class / Batch
                  </label>
                  <input
                    type="text"
                    value={formState.preferredClass}
                    onChange={(e) => setFormState({ ...formState, preferredClass: e.target.value })}
                    placeholder="e.g. Minions Bollywood / Weekend Batch"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors placeholder:text-soft-ivory/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-soft-ivory/50 mb-1.5 font-medium">
                    Message / Additional Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your goals or preferred schedule..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/50 transition-colors resize-none placeholder:text-soft-ivory/20"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    className="w-full justify-center !py-3.5"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <Send className="animate-spin w-4 h-4" /> SENDING...
                      </span>
                    ) : (
                      'BOOK MY FREE TRIAL'
                    )}
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
