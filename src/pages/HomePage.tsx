import Hero from '../components/sections/Hero';
import AboutUs from '../components/sections/AboutUs';
import Introduction from '../components/sections/Introduction';
import CinematicVideo from '../components/sections/CinematicVideo';
import WhyChoose from '../components/sections/WhyChoose';
import Founders from '../components/sections/Founders';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Introduction />
      <CinematicVideo />
      <WhyChoose />
      <Founders />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}


