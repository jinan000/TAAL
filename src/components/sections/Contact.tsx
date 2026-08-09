import { useRef, useEffect, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
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
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const [lastSubmittedData, setLastSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    interest: string;
    message: string;
    mailtoUrl: string;
  } | null>(null);

  const buildMailtoLink = (data: typeof formState) => {
    const subject = `Free Trial Booking - ${data.name}`;
    const body = `Hello TAAL Dance Academy,

I would like to book a free trial class! Here are my details:

Full Name: ${data.name}
Email Address: ${data.email}
Phone Number: ${data.phone || 'Not provided'}
Interested Program: ${data.interest || 'General Inquiry'}

Message:
${data.message || 'No additional details provided.'}

Sent via TAAL Dance Academy Website`;

    return `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoUrl = buildMailtoLink(formState);
    setLastSubmittedData({ ...formState, mailtoUrl });
    setSubmitted(true);
    
    // Automatically trigger mail client
    window.location.href = mailtoUrl;
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

          {/* Right — Registration Form */}
          <div className="contact-right">
            <GlassCard className="p-8 md:p-10" hover={false}>
              <h3 className="font-display text-2xl text-soft-ivory mb-2">
                Book Your Free Trial
              </h3>
              <p className="text-soft-ivory/40 text-sm mb-6">
                Fill in the form below and we'll get back to you within 24 hours. You can also directly <a href="https://forms.gle/3WJBQKB3EsRbsPmNA" target="_blank" rel="noreferrer" className="text-rose-gold hover:underline">register here</a>.
              </p>

              {submitted ? (
                <div className="py-6 text-left space-y-5">
                  <div className="flex items-center gap-3 bg-rose-gold/10 border border-rose-gold/30 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-full bg-rose-gold/20 flex items-center justify-center flex-shrink-0">
                      <Send size={20} className="text-rose-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-soft-ivory">Email Ready to Send!</h4>
                      <p className="text-xs text-soft-ivory/60">
                        Recipient: <span className="text-rose-gold font-mono font-medium">{CONTACT_INFO.email}</span>
                      </p>
                    </div>
                  </div>

                  {lastSubmittedData && (
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-xs font-mono space-y-2 text-soft-ivory/80">
                      <p className="text-rose-gold/80 font-sans text-xs font-semibold uppercase tracking-wider mb-2">Form Template Preview</p>
                      <p><span className="text-soft-ivory/40">To:</span> {CONTACT_INFO.email}</p>
                      <p><span className="text-soft-ivory/40">Subject:</span> Free Trial Booking - {lastSubmittedData.name}</p>
                      <div className="border-t border-white/10 pt-2 mt-2 space-y-1 text-soft-ivory/70">
                        <p><span className="text-soft-ivory/40">Name:</span> {lastSubmittedData.name}</p>
                        <p><span className="text-soft-ivory/40">Email:</span> {lastSubmittedData.email}</p>
                        <p><span className="text-soft-ivory/40">Phone:</span> {lastSubmittedData.phone || 'N/A'}</p>
                        <p><span className="text-soft-ivory/40">Program:</span> {lastSubmittedData.interest || 'General'}</p>
                        <p><span className="text-soft-ivory/40">Message:</span> {lastSubmittedData.message || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {lastSubmittedData && (
                      <a
                        href={lastSubmittedData.mailtoUrl}
                        className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#cf9f72] text-black font-semibold text-xs tracking-wider uppercase text-center hover:opacity-90 transition-opacity"
                      >
                        Open Email App Again
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', phone: '', interest: '', message: '' });
                      }}
                      className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-soft-ivory text-xs tracking-wider uppercase hover:bg-white/10 transition-colors"
                    >
                      Book Another Trial
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-soft-ivory/30 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors placeholder:text-soft-ivory/20"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-soft-ivory/30 mb-2">
                        Email
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
                      <label className="block text-xs tracking-widest uppercase text-soft-ivory/30 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors placeholder:text-soft-ivory/20"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-soft-ivory/30 mb-2">
                      Interested In
                    </label>
                    <select
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors appearance-none"
                    >
                      <option value="" className="bg-charcoal">Select a program</option>
                      <option value="bollywood" className="bg-charcoal">Bollywood</option>
                      <option value="bharatanatyam" className="bg-charcoal">Bharatanatyam</option>
                      <option value="semi-classical" className="bg-charcoal">Semi Classical</option>
                      <option value="fitness" className="bg-charcoal">Dance Fitness</option>
                      <option value="private" className="bg-charcoal">Private Lessons</option>
                      <option value="wedding" className="bg-charcoal">Wedding Choreography</option>
                      <option value="corporate" className="bg-charcoal">Corporate Events</option>
                      <option value="online" className="bg-charcoal">Online Classes</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-soft-ivory/30 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-soft-ivory text-sm focus:outline-none focus:border-rose-gold/30 transition-colors resize-none placeholder:text-soft-ivory/20"
                      placeholder="Tell us about your dance goals..."
                    />
                  </div>

                  <MagneticButton variant="primary" className="w-full justify-center">
                    Book My Free Trial
                  </MagneticButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Special Offers & Discounts */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl text-soft-ivory mb-4">Special Offers & Discounts</h3>
            <p className="text-soft-ivory/60">Join the Taal family and take advantage of our exclusive offers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-l-4 border-l-rose-gold border-y-white/[0.06] border-r-white/[0.06] hover:bg-white/[0.05]">
              <h4 className="text-rose-gold font-medium mb-2 tracking-wide uppercase text-sm">Sibling Discount</h4>
              <p className="text-soft-ivory/70 text-sm">Receive 15% OFF for each additional sibling enrolled.</p>
            </GlassCard>
            <GlassCard className="p-6 border-l-4 border-l-rose-gold border-y-white/[0.06] border-r-white/[0.06] hover:bg-white/[0.05]">
              <h4 className="text-rose-gold font-medium mb-2 tracking-wide uppercase text-sm">Referral Rewards</h4>
              <p className="text-soft-ivory/70 text-sm">Love dancing with Taal? Refer a friend, and when they register, you both get 10% off for 3 months after 6 consecutive months of subscription.</p>
            </GlassCard>
            <GlassCard className="p-6 border-l-4 border-l-rose-gold border-y-white/[0.06] border-r-white/[0.06] hover:bg-white/[0.05]">
              <h4 className="text-rose-gold font-medium mb-2 tracking-wide uppercase text-sm">Multi-Class Discount</h4>
              <p className="text-soft-ivory/70 text-sm">Enroll in more than one class and receive 20% OFF on all classes.</p>
            </GlassCard>
            <GlassCard className="p-6 border-l-4 border-l-rose-gold border-y-white/[0.06] border-r-white/[0.06] hover:bg-white/[0.05]">
              <h4 className="text-rose-gold font-medium mb-2 tracking-wide uppercase text-sm">Seasonal Promotions</h4>
              <p className="text-soft-ivory/70 text-sm">Keep an eye on our website and social media for special offers, holiday promotions, and limited-time discounts throughout the year.</p>
            </GlassCard>
          </div>
          <p className="text-center text-soft-ivory/40 text-xs mt-8 italic">
            * Terms & conditions apply. Discounts cannot be combined unless otherwise stated.
          </p>
        </div>
      </div>
    </section>
  );
}
