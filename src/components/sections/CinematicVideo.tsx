import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import introVideo from '../../assets/intro.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!sectionRef.current || !videoContainerRef.current || !textOverlayRef.current) return;
    
    const ctx = gsap.context(() => {
      // Fade up the header text
      gsap.from('.cv-header-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cv-header',
          start: 'top 80%',
        }
      });

      // Video Parallax & Zoom effect on scroll
      gsap.fromTo(videoContainerRef.current, 
        { scale: 0.95, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top 85%',
          }
        }
      );

      // Bottom Section Reveal
      gsap.from('.cv-bottom-reveal', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cv-bottom',
          start: 'top 90%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleWatchJourney = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    videoContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050505] py-24 md:py-32"
    >
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-gold/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#3e2723]/20 rounded-full blur-[150px]" />
        {/* Soft lens flare top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-gradient-to-b from-rose-gold/10 to-transparent blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content & Writings */}
        <div className="flex flex-col space-y-16 text-left">
          
          {/* Header */}
          <div className="cv-header">
            <h3 className="cv-header-text font-display text-rose-gold/90 text-3xl md:text-5xl font-medium leading-tight mb-4">
              Our Story
            </h3>
            <h2 className="cv-header-text font-body text-xs md:text-base text-soft-ivory/80 uppercase tracking-[0.25em] leading-relaxed mb-8">
              Experience The <br/>
              <span className="text-gradient-rose">Rhythm Of TAAL.</span>
            </h2>
            <p className="cv-header-text text-lg md:text-xl text-soft-ivory/60 font-light leading-relaxed">
              Every movement tells a story. <br className="hidden md:block"/>
              Every smile creates a memory. <br className="hidden md:block"/>
              Every dancer becomes family.
            </p>
          </div>

          {/* Bottom Quote & Buttons */}
          <div className="cv-bottom space-y-12">
            <div className="cv-bottom-reveal flex gap-6 md:gap-8 z-10">
              <span className="text-7xl md:text-9xl text-rose-gold/20 font-serif leading-none mt-[-1rem] select-none">"</span>
              <div>
                <p className="font-display text-3xl md:text-4xl text-soft-ivory leading-tight mb-6">
                  We don't simply teach movement.
                </p>
                <p className="text-xl md:text-2xl text-soft-ivory/60 font-light leading-relaxed">
                  We create memories, <br/>
                  build confidence, <br/>
                  and inspire lives.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="cv-bottom-reveal flex flex-col sm:flex-row items-start gap-6 pt-8">
              <button 
                onClick={handleWatchJourney}
                className="group relative px-8 py-4 rounded-full overflow-hidden bg-white/5 backdrop-blur-md border border-rose-gold/30 hover:border-rose-gold/60 transition-colors duration-500 w-full sm:w-auto cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/0 via-rose-gold/10 to-rose-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
                <span className="relative z-10 text-soft-ivory font-medium tracking-wide uppercase text-sm flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-rose-gold" />
                  Watch Our Journey (With Sound)
                </span>
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 rounded-full overflow-hidden w-full sm:w-auto shadow-[0_0_30px_rgba(207,159,114,0.2)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#cf9f72]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 text-black font-semibold tracking-wide uppercase text-sm">
                  Book A Free Trial
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Video Container */}
        <div className="relative w-full flex justify-center lg:justify-end items-center">
          {/* Video Wrapper */}
          <div 
            ref={videoContainerRef}
            className="group relative w-[90%] max-w-[320px] md:max-w-[400px] aspect-[9/16] rounded-[2rem] p-[2px] overflow-hidden shadow-[0_0_80px_rgba(207,159,114,0.1)]"
            style={{
              background: 'linear-gradient(135deg, rgba(207,159,114,0.3) 0%, rgba(207,159,114,0.05) 50%, rgba(207,159,114,0.1) 100%)'
            }}
          >
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black/50 backdrop-blur-sm">
              <video 
                ref={videoRef}
                src={introVideo}
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              />
              
              {/* Internal Glass overlay for edges */}
              <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(5,5,5,0.8)] pointer-events-none" />

              {/* Floating Sound Toggle Control */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-rose-gold/40 text-soft-ivory hover:bg-rose-gold/20 transition-all duration-300 shadow-lg cursor-pointer group/btn"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-5 h-5 text-rose-gold animate-pulse" />
                      <span className="text-xs font-medium text-rose-gold tracking-wide">Sound Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400 tracking-wide">Sound On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Center Play/Pause & Sound Control Overlay on hover */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4 items-center">
                  <button
                    onClick={togglePlay}
                    title={isPlaying ? "Pause" : "Play"}
                    className="p-4 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:scale-110 hover:bg-rose-gold/30 transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    className="p-4 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:scale-110 hover:bg-rose-gold/30 transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6 text-rose-gold" /> : <Volume2 className="w-6 h-6 text-emerald-400" />}
                  </button>
                </div>
              </div>

              {/* Bottom Mute Badge Banner if Muted */}
              {isMuted && (
                <div 
                  onClick={toggleMute}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-rose-gold/40 text-soft-ivory text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-2xl"
                >
                  <Volume2 className="w-4 h-4 text-rose-gold animate-bounce" />
                  <span>Click to enable sound</span>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

