import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Classes from '../components/sections/Classes';
import RentalsPreview from '../components/sections/RentalsPreview';

export default function ClassesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-soft-ivory pt-32 pb-20">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-rose-gold/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-[#3e2723]/20 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-8">
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-rose-gold/70 hover:text-rose-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Classes Section */}
      <Classes />

      {/* Rentals Section */}
      <div className="mt-16 border-t border-white/[0.05] pt-12">
        <RentalsPreview />
      </div>
    </div>
  );
}
