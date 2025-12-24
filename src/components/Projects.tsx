import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import project1Image from '@/assets/project-1.png';
import project2Image from '@/assets/project-2.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Log in/Sign up System',
    description: 'My first CS50P Python project using core concepts to build a simple system for storing and managing user information.',
    image: project1Image,
    tech: ['Python'],
    liveUrl: 'https://youtu.be/uEujwh09fyQ',
    githubUrl: null,
  },
  {
    title: 'Calgary Crime Analytics',
    description: 'An interactive data visualization dashboard displaying crime statistics with charts, maps, and real-time trend analysis.',
    image: project2Image,
    tech: ['Tableau', 'Microsoft Excel', 'SQL'],
    liveUrl: 'https://public.tableau.com/views/CrimeAnalysisFinalProjectSubmission/Dashboard2CrimebyLocation?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    liveLabel: 'Dashboard',
    githubUrl: null,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

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

    // Cards stagger animation
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-1/3 left-0 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-40 md:w-80 h-40 md:h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span 
              className="text-primary"
              style={{
                textShadow: '0 0 6px rgba(124,58,237,0.6), 0 0 16px rgba(124,58,237,0.35)'
              }}
            >
              Featured Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A selection of projects showcasing my skills in software development and applied data science and analytics.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card group relative glass rounded-xl md:rounded-2xl overflow-hidden hover:glow-box transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-150 ${index === 0 ? 'scale-[1.4]' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 md:mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">
                  <Button variant="glow" size="sm" className="flex-1 text-xs sm:text-sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      {project.liveLabel || 'Live Demo'}
                    </a>
                  </Button>
                  {project.githubUrl && (
                    <Button variant="glass" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
