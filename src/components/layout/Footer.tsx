import { CONTACT_INFO } from '../../utils/constants';
import logoImage from '../../assets/Taal-Logopng.png';

// Custom social SVG icons
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.24 8.24 0 005.58 2.17V11.7a4.85 4.85 0 01-2.68-.81 4.83 4.83 0 01-1.32-1.4V6.69z" />
    </svg>
  );
}

const socials = [
  { icon: InstagramIcon, href: CONTACT_INFO.socials.instagram, label: 'Instagram' },
  { icon: FacebookIcon, href: CONTACT_INFO.socials.facebook, label: 'Facebook' },
  { icon: TikTokIcon, href: CONTACT_INFO.socials.tiktok, label: 'TikTok' },
  { icon: YoutubeIcon, href: CONTACT_INFO.socials.youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-luxury-black via-charcoal/50 to-luxury-black border-t border-white/[0.04]">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />

      <div className="section-container flex flex-col items-center text-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <img src={logoImage} alt="TAAL Logo" className="w-10 h-10 object-contain" />
          <span className="font-display text-2xl text-soft-ivory tracking-wide">
            TAAL
          </span>
        </div>

        {/* Tagline */}
        <p className="text-soft-ivory/40 text-sm font-light tracking-widest uppercase mb-8">
          Creating Dancers. Inspiring Lives.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-10">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-soft-ivory/50 transition-all duration-300 hover:text-rose-gold hover:border-rose-gold/40 hover:shadow-[0_0_20px_rgba(216,167,160,0.2)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-soft-ivory/20 text-xs tracking-wider">
          © {new Date().getFullYear()} TAAL Dance Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
