import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const loadingPhrases = [
  "Warming up…",
  "Analyzing data…",
  "Building models…",
  "Match ready."
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Cycle through phrases
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 800);

    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    const progressBarWidth = progressBarRef.current?.offsetWidth || 300;

    // Animate progress bar and ball together
    tl.to({ value: 0 }, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: function() {
        const currentProgress = Math.round(this.targets()[0].value);
        setProgress(currentProgress);
        
        // Move ball along the progress bar
        if (ballRef.current) {
          const ballPosition = (currentProgress / 100) * (progressBarWidth - 24);
          ballRef.current.style.transform = `translateX(${ballPosition}px) rotate(${currentProgress * 7.2}deg)`;
        }
      }
    });

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    }, "+=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'hsl(222 47% 5%)' }}
    >
      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(222 47% 3% / 0.6) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-md px-8">
        {/* Name */}
        <div className="text-center">
          <h1 
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-3"
            style={{ color: 'hsl(270 100% 50%)' }}
          >
            Muhammad Fahad
          </h1>
          <p 
            className="text-xs md:text-sm tracking-[0.3em] uppercase"
            style={{ color: 'hsl(215 20% 65% / 0.6)' }}
          >
            Loading Experience
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-full">
          <div 
            ref={progressBarRef}
            className="relative h-1 rounded-full overflow-visible"
            style={{ backgroundColor: 'hsl(222 30% 15%)' }}
          >
            {/* Progress fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
              style={{ 
                width: `${progress}%`,
                backgroundColor: 'hsl(270 100% 50%)',
                boxShadow: '0 0 12px hsl(270 100% 50% / 0.4)'
              }}
            />
            
            {/* Soccer ball */}
            <div
              ref={ballRef}
              className="absolute -top-2.5 left-0 w-6 h-6 flex items-center justify-center"
              style={{ transform: 'translateX(0) rotate(0deg)' }}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5"
                fill="none"
                stroke="hsl(210 40% 98%)"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20" strokeOpacity="0.3" />
                <polygon 
                  points="12,7 15,10 14,14 10,14 9,10" 
                  fill="hsl(210 40% 98%)"
                  stroke="none"
                />
                <path d="M12 2v5M12 17v5M2 12h5M17 12h5" strokeOpacity="0.5" />
                <path d="M4.93 4.93l3.54 3.54M15.54 15.54l3.53 3.53M4.93 19.07l3.54-3.54M15.54 8.46l3.53-3.53" strokeOpacity="0.3" />
              </svg>
            </div>
          </div>
          
          {/* Percentage and dynamic text */}
          <div className="flex justify-between items-center mt-6">
            <p 
              className="text-xs tracking-wide transition-opacity duration-300"
              style={{ color: 'hsl(215 20% 65% / 0.5)' }}
            >
              {loadingPhrases[phraseIndex]}
            </p>
            <span 
              className="text-sm font-mono tabular-nums"
              style={{ color: 'hsl(210 40% 90%)' }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
