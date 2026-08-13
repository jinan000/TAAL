import { Link } from 'react-router-dom';
import rentalsBg from '../../assets/rentals.jpeg';
import SectionTitle from '../ui/SectionTitle';

export default function RentalsPreview() {
  return (
    <div className="relative py-16 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-[0.35] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${rentalsBg})` }}
      />
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.4) 15%, rgba(5,5,5,0.4) 85%, #050505 100%)' }}
      />
      
      <div className="section-container relative z-10 flex flex-col items-center">
        <SectionTitle eyebrow="Rentals" className="mb-6 text-center">
          Costumes & <span className="text-gradient-rose">Studio Space</span>
        </SectionTitle>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-soft-ivory/60 text-lg leading-relaxed">
            Need a space to create or the perfect costume for your next performance? Taal Dance Academy offers affordable rental services to support dancers, performers, and the community.
          </p>
        </div>

        <Link
          to="/rentals"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold hover:bg-rose-gold hover:text-luxury-black transition-colors duration-300 text-xs tracking-widest uppercase font-medium"
        >
          Explore Our Rentals
        </Link>
      </div>
    </div>
  );
}
