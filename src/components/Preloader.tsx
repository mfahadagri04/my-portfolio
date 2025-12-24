import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fallback timeout in case GSAP fails
    const fallbackTimeout = setTimeout(() => {
      onComplete();
    }, 4000);

    const tl = gsap.timeline();

    // Animate progress bar
    tl.to({ value: 0 }, {
      value: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const currentProgress = Math.round(this.targets()[0].value);
        setProgress(currentProgress);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentProgress}%`;
        }
      }
    });

    // Animate text glow
    tl.to(textRef.current, {
      textShadow: "0 0 60px hsl(270 100% 50% / 0.8)",
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.5");

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        clearTimeout(fallbackTimeout);
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    return () => {
      clearTimeout(fallbackTimeout);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb w-96 h-96 top-1/4 left-1/4" />
        <div className="floating-orb w-64 h-64 bottom-1/4 right-1/4 opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      {/* Beam effect */}
      <div className="beam" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <div ref={textRef} className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text mb-2">
            Muhammad Fahad
          </h1>
          <p className="text-muted-foreground text-lg tracking-widest uppercase">
            Loading Experience
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-80 md:w-96">
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
              style={{ width: '0%' }}
            />
            {/* Glow effect */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-50"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Percentage */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-muted-foreground text-sm">Loading</span>
            <span ref={percentRef} className="text-foreground font-mono text-lg">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
