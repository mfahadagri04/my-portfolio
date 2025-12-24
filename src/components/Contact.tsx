import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const title = titleRef.current;

    if (!section || !form || !title) return;

    // Title animation
    gsap.fromTo(
      title,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Form inputs fade in from left
    gsap.fromTo(
      '.contact-input',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Social icons animation
    gsap.fromTo(
      '.social-icon',
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.social-icons',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Animate button
    gsap.fromTo(
      '.submit-btn',
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    );

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span 
              className="text-primary"
              style={{
                textShadow: '0 0 6px rgba(124,58,237,0.6), 0 0 16px rgba(124,58,237,0.35)'
              }}
            >
              Get in Touch
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="contact-input">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass rounded-xl border border-border/50 bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-box-sm transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="contact-input">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass rounded-xl border border-border/50 bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-box-sm transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div className="contact-input">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 glass rounded-xl border border-border/50 bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-box-sm transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="contact-input pt-4">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="submit-btn w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Social Links */}
          <div className="social-icons flex justify-center gap-4 mt-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-4 glass rounded-xl hover:glow-box-sm hover:bg-card/80 hover:scale-110 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-foreground" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-4 glass rounded-xl hover:glow-box-sm hover:bg-card/80 hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-foreground" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="social-icon p-4 glass rounded-xl hover:glow-box-sm hover:bg-card/80 hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
