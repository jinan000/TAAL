import AboutUs from '../components/sections/AboutUs';
import Founders from '../components/sections/Founders';
import PageTransition from '../components/ui/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutUs />
      <Founders />
    </PageTransition>
  );
}
