// ═══════════════════════════════════════════
// TAAL DANCE ACADEMY — ALL CONTENT DATA
// ═══════════════════════════════════════════

import imgKids from '../assets/classes/kids.png';
import imgTeens from '../assets/classes/teens.png';
import imgElite from '../assets/classes/elite.png';
import imgSemiClassical from '../assets/classes/semiclassical.png';
import imgWedding from '../assets/classes/wedding.png';
import imgOnline from '../assets/classes/online.png';
import imgBharatanatyam from '../assets/gallery/bharatanatyam.png';
import imgDance from '../assets/gallery/dance.png';
import imgPerformance from '../assets/gallery/performance.png';
import imgBts from '../assets/gallery/bts.png';
import imgCommunity from '../assets/gallery/community.png';

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#introduction' },
  { label: 'Classes', href: '#classes' },
  { label: 'Founders', href: '#founders' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

export const ROTATING_WORDS = [
  'Rhythm',
  'Movement',
  'Expression',
  'Confidence',
  'Culture',
  'Community',
] as const;

export const STATS = [
  { value: 2500, suffix: '+', label: 'Students Trained' },
  { value: 11, suffix: '+', label: 'Dance Styles' },
  { value: 10, suffix: '+', label: 'Years of Excellence' },
  { value: 200, suffix: '+', label: 'Performances' },
] as const;

export const WHY_CHOOSE_FEATURES = [
  {
    title: 'Expert Guidance',
    description: 'Learn from experienced instructors dedicated to helping every student succeed.',
    icon: 'Award',
  },
  {
    title: 'Diverse Dance Training',
    description: 'Explore Bharatanatyam, Bollywood, fitness, and contemporary styles in one academy.',
    icon: 'Music',
  },
  {
    title: 'A Supportive Community',
    description: 'Grow in a welcoming, inclusive environment where everyone feels valued.',
    icon: 'Users',
  },
  {
    title: 'Building Confidence',
    description: 'Develop confidence, discipline, creativity, and teamwork through dance.',
    icon: 'Star',
  },
  {
    title: 'Performance Opportunities',
    description: 'Gain stage experience through recitals, community events, and special productions.',
    icon: 'Mic',
  },
  {
    title: 'Personalized Learning',
    description: 'Receive individual attention and progress at a pace that suits you.',
    icon: 'Heart',
  },
  {
    title: 'Learning Through Joy',
    description: 'Enjoy energetic, engaging classes that make learning fun and rewarding.',
    icon: 'Smile',
  },
  {
    title: 'Tradition Meets Innovation',
    description: 'Experience the perfect balance of cultural heritage and modern creativity.',
    icon: 'Sparkles',
  },
  {
    title: 'More Than a Dance Academy',
    description: 'Become part of a supportive dance family that grows and celebrates together.',
    icon: 'Home',
  },
] as const;

export const CLASSES = [
  {
    title: 'Minions Bollywood',
    subtitle: 'Ages 4–8',
    price: '$60/month',
    dropIn: '$20/class',
    description: 'A playful Bollywood class that builds rhythm, confidence, and coordination through dance.',
    color: '#F4DDD7',
    image: imgKids,
  },
  {
    title: 'Titans Bollywood',
    subtitle: 'Ages 9–15',
    price: '$60/month',
    dropIn: '$20/class',
    description: 'A dynamic Bollywood program focused on technique, performance, and self-expression.',
    color: '#D8A7A0',
    image: imgTeens,
  },
  {
    title: 'Elite Bollywood',
    subtitle: 'Ages 16–25',
    price: '$60/month',
    dropIn: '$20/class',
    description: 'Advanced Bollywood and fusion training designed to refine technique, versatility, and stage presence.',
    color: '#E8C8B8',
    image: imgElite,
  },
  {
    title: 'Adult Bollywood',
    subtitle: 'Above 25 yrs',
    price: '$60/month',
    dropIn: '$20/class',
    description: 'Fun and energetic Bollywood classes for adults of all experience levels.',
    color: '#B97A72',
    image: imgDance,
  },
  {
    title: 'Semi-Classical',
    subtitle: 'Above 25 yrs',
    price: '$55/month',
    dropIn: '$20/class',
    description: 'Experience the beauty of Indian classical dance through a graceful blend of traditional styles and contemporary expression.',
    color: '#E8C8B8',
    image: imgSemiClassical,
  },
  {
    title: 'Bharatanatyam',
    subtitle: 'All age group',
    price: '$65/month',
    description: 'Learn the grace, discipline, and artistry of India\'s classical dance tradition.',
    color: '#D8A7A0',
    image: imgBharatanatyam,
  },
  {
    title: 'Dance Fitness',
    subtitle: 'All age group',
    price: '$50/month',
    dropIn: '$18/class',
    description: 'Stay active and energized with Bollywood-inspired dance workouts.',
    color: '#F4DDD7',
    image: imgTeens,
  },
  {
    title: 'Private Lessons',
    subtitle: 'One-on-One',
    description: 'One-on-one coaching tailored to your goals and learning pace.',
    color: '#B97A72',
    image: imgBts,
  },
  {
    title: 'Event & Program Choreography',
    subtitle: 'Special Events',
    description: 'Custom choreography for cultural events, stage performances, and special programs.',
    color: '#D8A7A0',
    image: imgPerformance,
  },
  {
    title: 'Wedding Choreography',
    subtitle: 'Special Events',
    description: 'Create memorable wedding performances with personalized dance routines.',
    color: '#E8C8B8',
    image: imgWedding,
  },
  {
    title: 'Corporate Workshops & Events',
    subtitle: 'Team Building',
    description: 'Interactive dance sessions that bring energy, teamwork, and fun to the workplace.',
    color: '#F4DDD7',
    image: imgCommunity,
  },
  {
    title: 'Online Classes',
    subtitle: 'Virtual',
    description: 'Learn from anywhere with live, interactive dance classes led by our instructors.',
    color: '#B97A72',
    image: imgOnline,
  },
];

export const FOUNDERS = [
  {
    name: 'Shreeja Sudhakaran',
    role: 'Co-Founder & Director',
    shortBio: 'With over 15 years of teaching experience, Shreeja is a passionate dance educator trained in Bharatanatyam, Kuchipudi, Kathak, Bollywood, Contemporary, Jazz, Salsa, and more. She believes dance is a powerful tool for building confidence, creativity, and self-expression while creating a welcoming space where every student can thrive.',
    longBio: 'Shreeja holds a Diploma in Bharatanatyam and has trained extensively across both classical and contemporary dance styles. In 2014, she was part of the Limca Book of Records for India\'s largest Salsa performance, serving as both a lead performer and instructor. She also appeared on the television show Entertainment Ke Liye Kuch Bhi Karega in 2013. At Taal Dance Academy, she combines technical excellence with an encouraging teaching approach, helping students grow as confident dancers and individuals.',
    imageKey: 'shreeja'
  },
  {
    name: 'Linta Kurian Kumbattu',
    role: 'Co-Founder & Director',
    shortBio: 'Linta is a dancer, choreographer, and mentor with over a decade of teaching and choreography experience. Trained in Bharatanatyam, Kuchipudi, Kerala Nadanam, and Kerala Folk Dance, she is passionate about helping students develop confidence, discipline, and a lifelong love for dance.',
    longBio: 'Linta has represented her district at the Kerala State Youth Festival and has choreographed stage productions since 2007 across semi-classical, Bollywood, cinematic, and fusion styles. She served as Lead Dance Coordinator for the Brandon Malayali Association (2014–2022) before co-founding Dance Capital in Edmonton in 2023, where the team performed at major multicultural events, including the Shaan Rahman Live Show in 2024. At Taal Dance Academy, she brings her experience in performance, choreography, and mentorship to create inspiring classes that nurture technique, creativity, and stage confidence.',
    imageKey: 'linta'
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Priya M.',
    role: 'Student • Bharatanatyam',
    text: 'TAAL transformed my relationship with dance. The instructors don\'t just teach steps — they teach you to feel the music in your soul.',
  },
  {
    name: 'Ananya S.',
    role: 'Parent • Minions Bollywood',
    text: 'My daughter\'s confidence has skyrocketed since joining TAAL. She performs with such joy and grace. We\'re so grateful for this community.',
  },
  {
    name: 'Rahul K.',
    role: 'Student • Adult Bollywood',
    text: 'I joined as a complete beginner at 35 and found a second home. The energy, the people, the culture — TAAL is magic.',
  },
  {
    name: 'Meera D.',
    role: 'Student • Semi Classical',
    text: 'The attention to detail in every class is remarkable. TAAL doesn\'t just create dancers, they create artists.',
  },
  {
    name: 'Vikram P.',
    role: 'Corporate Client',
    text: 'TAAL\'s corporate workshop was the highlight of our team retreat. Professional, energetic, and unforgettable.',
  },
  {
    name: 'Sanya R.',
    role: 'Student • Elite Bollywood',
    text: 'Competing with TAAL has been the most empowering experience. They prepare you not just technically, but mentally.',
  },
  {
    name: 'Deepika L.',
    role: 'Wedding Client',
    text: 'Our sangeet choreography was absolutely breathtaking. Guests are still talking about it months later!',
  },
  {
    name: 'Arjun T.',
    role: 'Student • Dance Fitness',
    text: 'Best workout of my life. I never thought I\'d enjoy fitness this much. The instructors make every session electric.',
  },
] as const;

export const IMPACT_STATS = [
  { value: 2500, suffix: '+', label: 'Dancers Trained' },
  { value: 200, suffix: '+', label: 'Performances' },
  { value: 50, suffix: '+', label: 'Awards Won' },
  { value: 15, suffix: '+', label: 'Charity Events' },
] as const;

export const TIMELINE = [
  { year: '2015', title: 'The Beginning', description: 'TAAL Dance Academy was founded with a vision to make Indian dance accessible to everyone.' },
  { year: '2018', title: 'Growing Community', description: 'Expanded to multiple dance styles and reached 500+ students in the community.' },
  { year: '2021', title: 'Digital Evolution', description: 'Launched online classes during the pandemic, reaching students across the globe.' },
  { year: '2024', title: 'National Recognition', description: 'Won national dance competitions and established TAAL Cares charity initiative.' },
  { year: '2026', title: 'The Movement', description: '2500+ dancers strong. TAAL is no longer just an academy — it\'s a movement.' },
] as const;

export const FAQ_DATA = [
  {
    question: 'Do I need prior dance experience?',
    answer: 'Not at all! We welcome dancers of all skill levels. Whether you\'re a complete beginner or have years of experience, our classes are designed to help you learn and grow at your own pace.',
  },
  {
    question: 'What should I wear to class?',
    answer: 'Wear comfortable clothing that allows you to move freely. Carry a clean indoor shoe (outside shoes are not permitted in the studio). Please bring a water bottle and a positive attitude!',
  },
  {
    question: 'Can I join mid-session?',
    answer: 'Yes! Depending on the class and available spots, students can join after a session has started. Our instructors will help you settle in and catch up on what you\'ve missed.',
  },
  {
    question: 'What if I miss a class?',
    answer: 'If you miss a class, please let us know in advance whenever possible. Monthly membership fees are non-refundable, and missed classes cannot be refunded or carried forward. However, if you\'ve booked a drop-in class and notify us in advance, we\'ll be happy to work with you to reschedule or provide a refund.',
  },
  {
    question: 'Are trial classes available?',
    answer: 'Yes! We offer trial classes so you can experience our teaching style and studio environment before committing to a program. Contact us to book your trial.',
  },
  {
    question: 'How do I register?',
    answer: 'You can register by contacting us via phone or email, or by sending us a message on our social media platforms.',
  },
  {
    question: 'What age groups do you offer classes for?',
    answer: 'We offer classes for children, teens, and adults. Our programs are designed to suit different age groups and skill levels.',
  },
  {
    question: 'Do you offer private lessons?',
    answer: 'Yes! We offer one-on-one and small group private lessons for students looking for personalized instruction, competition preparation, or faster progress.',
  },
  {
    question: 'Do you provide wedding choreography?',
    answer: 'Absolutely! We create customized choreography for couples, families, and bridal parties to make your special day unforgettable.',
  },
  {
    question: 'Can Taal perform at our event?',
    answer: 'Yes! We perform at cultural festivals, corporate events, school functions, weddings, private celebrations, and community events. Contact us to discuss your event and performance requirements.',
  },
  {
    question: 'Do you offer community or volunteer programs?',
    answer: 'Yes! Through Taal Cares, our community initiative, we support local events, volunteer programs, and outreach activities that use dance to bring people together and make a positive impact.',
  },
  {
    question: 'How are payments made?',
    answer: 'Fees can be paid by interac. You can send interac to: infoattaaldanceacademy@gmail.com',
  },
  {
    question: 'What\'s your refund policy?',
    answer: 'Fees are generally non-refundable once a program has started. If a class is cancelled by Taal Dance Academy, a make-up class or credit will be provided where applicable. Please contact us if you have any concerns—we\'re always happy to help.',
  },
] as const;

export const TEAM_POSITIONS = [
  {
    title: 'Performance Team (Taal Crew)',
    description: 'Love performing on stage? Join our Taal Crew and represent Taal at cultural events, community programs, competitions, and special showcases.',
  },
  {
    title: 'Instructor Team',
    description: 'Inspire the next generation of dancers! We\'re always looking for passionate and dedicated instructors with strong dance training and a love for teaching.',
  },
  {
    title: 'Admin Team',
    description: 'Help us keep Taal running smoothly behind the scenes. From student support and event coordination to social media and operations, our Admin Team plays a vital role in creating an exceptional experience for our community.',
  },
] as const;

export const CONTACT_INFO = {
  address: '3673 Allan Drive SW, Edmonton, Alberta Canada T6W2K3',
  phone: '+1 (587) 377-3370',
  whatsapp: '+1 (587) 377-3370',
  email: 'info@taaldanceacademy.com',
  mapEmbed: 'https://maps.google.com/maps?q=3673%20Allan%20Drive%20SW,%20Edmonton,%20Alberta%20Canada%20T6W2K3&t=&z=13&ie=UTF8&iwloc=&output=embed',
  socials: {
    instagram: 'https://www.instagram.com/taaldanceacademy_yeg/',
    facebook: 'https://www.facebook.com/taaldanceacademyyeg/',
    tiktok: 'https://tiktok.com/@taaldanceacademy_yeg',
    youtube: 'https://www.youtube.com/@TaalDanceAcademy_yeg',
  },
} as const;

export const GALLERY_CATEGORIES = [
  'All',
  'Bharatanatyam',
  'Bollywood',
  'Performances',
  'Community',
  'Behind the Scenes',
] as const;
