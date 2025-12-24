import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'Analytics & Visualization', icon: '📊' },
  { name: 'Machine Learning', icon: '🤖' },
  { name: 'R', icon: '📈' },
  { name: 'SQL', icon: '🗃️' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Section fade in with blur clear
    gsap.fromTo(
      section,
      { opacity: 0, filter: 'blur(10px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Image slide in from left
    gsap.fromTo(
      image,
      { opacity: 0, x: -100, rotateY: -15 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content fade in
    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Skills stagger animation
    gsap.fromTo(
      '.skill-icon',
      { opacity: 0, scale: 0.5, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative group"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Image container */}
              <div className="relative glass rounded-3xl p-4 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                <img
                  src={profileImage}
                  alt="Muhammad Fahad"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-accent/30 rounded-2xl" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span 
                className="text-primary"
                style={{
                  textShadow: '0 0 6px rgba(124,58,237,0.6), 0 0 16px rgba(124,58,237,0.35)'
                }}
              >
                About Me
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Hi! I'm a fourth-year Business Analytics and Computer Science student at the University of Calgary with a strong interest in data and AI. I enjoy using analytics to solve real problems and turn information into meaningful insights.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I like building models, creating visualizations, and constantly learning new tools to grow my skills. I'm motivated by curiosity and the challenge of improving with every project.
            </p>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Outside of school, I love playing soccer and supporting Manchester United. Being a fan has taught me patience, resilience, and how to enjoy the journey. ⚽
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm currently looking for opportunities to learn, contribute, and start my career in data and AI. If you'd like to connect, feel free to reach out!
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Skills & Technologies</h3>
              <div className="skills-grid grid grid-cols-3 sm:grid-cols-6 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-icon glass rounded-xl p-4 text-center hover:glow-box-sm transition-all duration-300 hover:scale-110 hover:bg-card/80 cursor-default"
                  >
                    <span className="text-3xl mb-2 block">{skill.icon}</span>
                    <span className="text-xs text-muted-foreground">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
