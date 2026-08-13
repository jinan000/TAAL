import { useRef, useEffect, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { CONTACT_INFO } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
    website: '', // Honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact-left > *', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
        },
      });
      gsap.from('.contact-right', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-right',
          start: 'top 85%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Frontend validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formState.message.trim().length < 5) {
      setStatus('error');
      setErrorMessage('Message must be at least 5 characters long.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
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

  const contactItems = [
    { icon: MapPin, label: 'Visit Us', value: CONTACT_INFO.address, href: 'https://maps.app.goo.gl/vVmt9q1fLPSYVJSZA?g_st=ac' },
    { icon: Phone, label: 'Call Us', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
    { icon: MessageCircle, label: 'WhatsApp', value: CONTACT_INFO.whatsapp, href: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}` },
    { icon: Mail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-spacing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #1A1414 50%, #050505 100%)' }}
    >
      {/* Warm ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #D8A7A0 0%, transparent 70%)' }} />

      <div className="section-container">
        <SectionTitle eyebrow="Get in Touch">
          Begin Your{' '}
          <span className="text-gradient-rose">Journey</span>
        </SectionTitle>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left — Contact Info + Map */}
          <div className="contact-left space-y-8">
            {/* Contact items */}
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-gold/[0.06] border border-rose-gold/[0.1] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-rose-gold" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-rose-gold/60 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-soft-ivory/70 text-sm hover:text-rose-gold transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-soft-ivory/70 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Google Maps */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/[0.06] h-[240px]">
              <iframe
                src={CONTACT_INFO.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TAAL Dance Academy Location"
              />
            </div>
          </div>

          {/* Right — Registration & Contact Form */}
          <div className="contact-right">
            <GlassCard className="p-8 md:p-10" hover={false}>
              <h3 className="font-display text-2xl text-soft-ivory mb-2">
                Send Us A Message
              </h3>
              <p className="text-soft-ivory/40 text-sm mb-6">
                Have questions about our programs, schedules, or events? Send us a message below and we'll reply within 24 hours.
              </p>

              {status === 'success' ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-rose-gold/10 border border-rose-gold/30 flex items-center justify-center mx-auto text-rose-gold">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-display text-2xl text-soft-ivory">Thank You</h4>
                  <p className="text-soft-ivory/70 text-sm max-w-sm mx-auto leading-relaxed">
                    Your request has been received. The TAAL team will get back to you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setFormState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '', website: '' });
                      }}
                      className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-soft-ivory text-xs tracking-wider uppercase hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot Spam Protection Field */}
                  <input
                    type="text"
                    name="website"
                    value={formState.website}
                    onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Error Alert */}
                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{errorMessage || 'Unable to send your request. Please try again or contact us directly.'}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-soft-ivory/40 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors placeholder:text-soft-ivory/20"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-soft-ivory/40 mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors placeholder:text-soft-ivory/20"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-soft-ivory/40 mb-2 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors placeholder:text-soft-ivory/20"
                        placeholder="+1 (587) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-soft-ivory/40 mb-2 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors placeholder:text-soft-ivory/20"
                      placeholder="e.g. Class Inquiry / Wedding Performance"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-soft-ivory/40 mb-2 font-medium">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors resize-none placeholder:text-soft-ivory/20"
                      placeholder="Tell us about your dance goals or questions..."
                    />
                  </div>

                  {/* Submit Button */}
                  <MagneticButton type="submit" variant="primary" className="w-full justify-center">
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <Send className="animate-spin w-4 h-4" /> SENDING...
                      </span>
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </MagneticButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>

        </div>
    </section>
  );
}
