import Hero from '../components/sections/Hero';
import Introduction from '../components/sections/Introduction';
import CinematicVideo from '../components/sections/CinematicVideo';
import WhyChoose from '../components/sections/WhyChoose';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <CinematicVideo />
      <WhyChoose />
      <Testimonials />
      <Contact />
    </>
  );
}


