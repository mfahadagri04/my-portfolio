import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer fade and slide up
    gsap.fromTo(
      footer,
      { opacity: 0, y: 60, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden border-t border-border/30"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      
      {/* Floating particles */}
      <div className="footer-particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full blur-sm" />
      <div className="footer-particle absolute top-1/3 right-1/4 w-3 h-3 bg-accent/20 rounded-full blur-sm" style={{ animationDelay: '1s' }} />
      <div className="footer-particle absolute bottom-1/4 left-1/3 w-2 h-2 bg-glow-secondary/30 rounded-full blur-sm" style={{ animationDelay: '2s' }} />
      <div className="footer-particle absolute top-1/2 right-1/3 w-4 h-4 bg-primary/15 rounded-full blur-md" style={{ animationDelay: '0.5s' }} />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">Muhammad Fahad</h3>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in 2024
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(`#${link.toLowerCase()}`)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:glow-text transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:glow-text transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="p-2 text-muted-foreground hover:text-foreground hover:glow-text transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Muhammad Fahad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
