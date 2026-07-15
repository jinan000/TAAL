import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';
import MagneticButton from '../ui/MagneticButton';

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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

  // Active section observer
  useEffect(() => {
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
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
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
            className="flex items-center group relative z-10 flex-shrink-0"
          >
            <img 
              src="/src/assets/Taal-Logopng.png" 
              alt="TAAL Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative px-2 py-2 text-[15px] font-body transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-rose-gold'
                    : 'text-soft-ivory/70 hover:text-soft-ivory'
                }`}
              >
                {toTitleCase(link.label)}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-rose-gold to-transparent shadow-[0_0_10px_rgba(216,167,160,0.8)]"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-10 flex-shrink-0">
            <div className="hidden md:block">
              <MagneticButton
                variant="primary"
                onClick={() => handleNavClick('#contact')}
                className="!py-[14px] !px-8 !text-[13px] !tracking-widest !uppercase"
              >
                Book A Free Trial
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-soft-ivory p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.4 }}
                className="mt-4"
              >
                <MagneticButton
                  variant="primary"
                  onClick={() => handleNavClick('#contact')}
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
