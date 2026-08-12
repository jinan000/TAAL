import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import MagneticButton from '../ui/MagneticButton';
import logoImage from '../../assets/Taal-Logopng.png';

import { useFreeTrialModal } from '../../context/FreeTrialModalContext';
import { useTransition, type TransitionType } from '../../context/TransitionContext';

const toTitleCase = (str: string) => {
  if (str.toUpperCase().includes('TAAL') || str === 'FAQ') return str;
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

const TRANSITION_OPTIONS: { value: TransitionType; label: string; icon: string }[] = [
  { value: 'fade', label: 'Fade', icon: '◐' },
  { value: 'slide', label: 'Slide', icon: '◫' },
  { value: 'zoom', label: 'Zoom', icon: '◎' },
  { value: 'flip', label: 'Flip', icon: '◇' },
];

export default function Header() {
  const { openModal } = useFreeTrialModal();
  const { transition, setTransition } = useTransition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showTransitionPicker, setShowTransitionPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for shrink effect and visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update isScrolled
      setIsScrolled(currentScrollY > 50);

      // Determine scroll direction to hide/show header
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMobileOpen) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobileOpen]);

  // Active section observer (only on home page)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close transition picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowTransitionPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    document.body.style.overflow = '';

    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = href;
          }
        }, 100);
      }
    }
  };

  const isLinkActive = (href: string) => {
    if (href.startsWith('/')) {
      return location.pathname === href;
    }
    if (location.pathname !== '/') {
      return false;
    }
    return href.startsWith('#') && activeSection === href.slice(1);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-3 px-4 pointer-events-none">
        <motion.header
          className={`w-full max-w-[1400px] rounded-[3rem] border border-rose-gold/20 shadow-[0_0_40px_rgba(216,167,160,0.08)] transition-all duration-500 flex items-center justify-between px-5 md:px-6 py-2 pointer-events-auto ${
            isScrolled
              ? 'bg-luxury-black/80 backdrop-blur-2xl'
              : 'bg-luxury-black/50 backdrop-blur-xl'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center group relative z-10 flex-shrink-0 cursor-pointer"
          >
            <img 
              src={logoImage} 
              alt="TAAL Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-2 py-2 text-[15px] font-body whitespace-nowrap transition-colors duration-300 ${
                    active
                      ? 'text-rose-gold font-medium'
                      : 'text-soft-ivory/70 hover:text-soft-ivory'
                  }`}
                >
                  {toTitleCase(link.label)}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-rose-gold to-transparent shadow-[0_0_10px_rgba(216,167,160,0.8)]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA + Transition Picker + Mobile Toggle */}
          <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
            {/* Transition Animation Picker */}
            <div ref={pickerRef} className="relative hidden md:block">
              <button
                onClick={() => setShowTransitionPicker(!showTransitionPicker)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  showTransitionPicker
                    ? 'border-rose-gold/50 text-rose-gold bg-rose-gold/10 shadow-[0_0_15px_rgba(216,167,160,0.2)]'
                    : 'border-white/10 text-soft-ivory/50 hover:text-rose-gold hover:border-rose-gold/30'
                }`}
                aria-label="Choose page transition animation"
                title="Page transition style"
              >
                <Sparkles size={14} />
              </button>

              {/* Picker Dropdown */}
              <AnimatePresence>
                {showTransitionPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-3 w-44 rounded-2xl border border-rose-gold/15 bg-luxury-black/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
                  >
                    <div className="p-1.5">
                      <p className="px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-rose-gold/60 font-medium">
                        Transition
                      </p>
                      {TRANSITION_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTransition(option.value);
                            setShowTransitionPicker(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                            transition === option.value
                              ? 'bg-rose-gold/10 text-rose-gold'
                              : 'text-soft-ivory/60 hover:text-soft-ivory hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="text-base leading-none">{option.icon}</span>
                          <span className="text-xs tracking-widest uppercase font-medium">{option.label}</span>
                          {transition === option.value && (
                            <motion.div
                              layoutId="activeTransition"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-gold shadow-[0_0_8px_rgba(216,167,160,0.6)]"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <MagneticButton
                variant="primary"
                onClick={() => openModal()}
                className="!py-[14px] !px-8 !text-[13px] !tracking-widest !uppercase"
              >
                Book A Free Trial
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-soft-ivory p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-luxury-black/95 backdrop-blur-3xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-2xl font-display text-soft-ivory/80 hover:text-rose-gold transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  {toTitleCase(link.label)}
                </motion.a>
              ))}

              {/* Mobile Transition Picker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.4 }}
                className="flex items-center gap-2 mt-2"
              >
                {TRANSITION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTransition(option.value)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      transition === option.value
                        ? 'border-rose-gold/50 text-rose-gold bg-rose-gold/10 shadow-[0_0_12px_rgba(216,167,160,0.3)]'
                        : 'border-white/10 text-soft-ivory/40 hover:text-soft-ivory/70'
                    }`}
                    title={option.label}
                  >
                    <span className="text-sm">{option.icon}</span>
                  </button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (NAV_LINKS.length + 1) * 0.05, duration: 0.4 }}
                className="mt-4"
              >
                <MagneticButton
                  variant="primary"
                  onClick={() => { setIsMobileOpen(false); openModal(); }}
                  className="!py-4 !px-8 !tracking-widest !uppercase"
                >
                  Book A Free Trial
                </MagneticButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
