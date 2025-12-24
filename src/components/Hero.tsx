import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const roles = ['Student', 'Data & AI Enthusiast', 'Soccer Fan'];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentWord = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.3'
    );

    tl.fromTo(
      splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Floating orb animation
    gsap.to('.glow-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#05060a' }}
    >
      {/* Background Spline - Full bleed */}
      <div
        ref={splineRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ pointerEvents: 'none' }}
      >
        <iframe
          src="https://my.spline.design/aigreymarketingbanner-gzki67C1KKwarH6YajxUeMzt/"
          frameBorder="0"
          className="absolute inset-0 w-full h-full border-0 block"
          style={{ 
            pointerEvents: 'none',
            margin: 0,
            padding: 0,
          }}
        />
      </div>

      {/* Solid black cap at top to hide seam - NO gradient */}
      <div 
        className="absolute top-0 left-0 right-0 z-[1]"
        style={{
          height: '40%',
          background: '#05060a',
        }}
      />

      {/* Solid black strip at bottom to hide seam */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          height: '10%',
          background: '#05060a',
        }}
      />

      <div className="glow-orb absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl z-[1]" />
      <div className="glow-orb absolute bottom-1/3 right-20 w-48 h-48 rounded-full bg-accent/15 blur-3xl z-[1]" style={{ animationDelay: '1s' }} />
      <div className="glow-orb absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-glow-secondary/20 blur-2xl z-[1]" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="container relative z-[2] mx-auto px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl text-center">
          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span 
              className="text-primary font-bold"
              style={{
                textShadow: '0 0 6px rgba(124,58,237,0.6), 0 0 16px rgba(124,58,237,0.35), 0 0 30px rgba(124,58,237,0.2)'
              }}
            >
              Muhammad Fahad
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 h-10"
          >
            A <span className="text-foreground font-medium">{displayText}</span>
            <span className="text-primary animate-pulse">|</span>
          </p>

          <div ref={ctaRef} className="flex justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToContact}
              className="group"
            >
              Get in Touch
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
