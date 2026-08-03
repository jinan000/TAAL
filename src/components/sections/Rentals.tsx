import rentalsBg from '../../assets/rentals.jpeg';
import SectionTitle from '../ui/SectionTitle';

export default function Rentals() {
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
      
      <div className="section-container relative z-10">
        <SectionTitle eyebrow="Rentals" className="mb-6 text-center">
          Costumes & <span className="text-gradient-rose">Studio Space</span>
        </SectionTitle>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-soft-ivory/60 text-lg leading-relaxed">
            Need a space to create or the perfect costume for your next performance? Taal Dance Academy offers affordable rental services to support dancers, performers, and the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="glass-panel p-10 rounded-2xl flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
            <h3 className="font-display text-2xl text-rose-gold mb-4">Costume Rentals</h3>
            <p className="text-soft-ivory/60 leading-relaxed flex-grow">
              Choose from a growing collection of dance costumes for Bollywood, Bharatanatyam, Semi-Classical, and cultural performances. Perfect for stage shows, competitions, festivals, school events, and special occasions.
            </p>
          </div>
          
          <div className="glass-panel p-10 rounded-2xl flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
            <h3 className="font-display text-2xl text-rose-gold mb-4">Studio Rentals</h3>
            <p className="text-soft-ivory/60 leading-relaxed flex-grow">
              Our fully equipped dance studio is available for hourly rentals. Whether you're hosting a rehearsal, workshop, private lesson, choreography session, fitness class, or creative project, our space is designed to meet your needs.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-soft-ivory/60 mb-8 max-w-2xl mx-auto">
            Interested in renting? Contact us for availability, pricing, and booking details.
          </p>
          <a href="/#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold hover:bg-rose-gold hover:text-luxury-black transition-colors duration-300 text-xs tracking-widest uppercase font-medium">
            Contact Us for Booking
          </a>
        </div>
      </div>
    </div>
  );
}
