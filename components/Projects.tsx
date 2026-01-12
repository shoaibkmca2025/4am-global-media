
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, X, Cpu, Code2, ChevronRight, Share2, Sparkles } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-3, 3]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Minimized staggered offset for a more compact grid
  const staggerClass = index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-20px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={`relative group cursor-pointer w-full ${staggerClass}`}
    >
      <div className="absolute -inset-2 bg-brand-primary/10 rounded-[1.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative glass rounded-[1.5rem] overflow-hidden border border-white/30 dark:border-white/5 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:border-brand-primary/20">
        {/* Cinematic wide aspect ratio to minimize vertical space */}
        <div className="relative aspect-[2.2/1] overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-90 transition-opacity duration-500" />
          
          <div className="absolute top-4 left-4">
            <span className="px-2 py-0.5 bg-brand-primary/80 backdrop-blur-md border border-white/10 rounded-full text-[7px] font-mono font-bold text-white uppercase tracking-[0.2em] shadow-lg">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h4 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight leading-none mb-1">
              {project.title}
            </h4>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[6px] font-mono font-bold uppercase tracking-widest text-brand-primary">View_Case</span>
              <ArrowUpRight className="w-2 h-2 text-brand-primary" />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 bg-white/40 dark:bg-black/10 backdrop-blur-md flex items-center justify-between">
           <p className="text-slate-500 dark:text-slate-400 text-[10px] leading-tight font-medium line-clamp-1 max-w-[70%]">
            {project.description}
          </p>

          <div className="flex -space-x-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <div key={tech} className="w-6 h-6 rounded-full border border-white dark:border-brand-obsidian bg-slate-100 dark:bg-white/10 flex items-center justify-center shadow-sm" title={tech}>
                <Code2 className="w-2.5 h-2.5 text-brand-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="projects" ref={containerRef} className="py-24 bg-slate-50 dark:bg-brand-obsidian relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ y: sectionY }} className="max-w-[1200px] mx-auto">
          <div className="mb-16 flex flex-col lg:flex-row items-baseline justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-brand-primary" />
                <span className="text-brand-primary font-mono font-bold tracking-[0.4em] uppercase text-[8px]">03 // Projects</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                CASE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">STUDIES.</span>
              </h3>
            </div>
            <p className="text-sm font-light italic border-l border-brand-primary/20 pl-4 text-slate-500 leading-snug max-w-xs">
              Refined technical deployments and strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-full lg:mt-8">
              <div className="h-full min-h-[160px] glass rounded-[1.5rem] px-8 py-6 border-2 border-dashed border-brand-primary/20 flex items-center justify-between group hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-500">
                <div className="space-y-1 text-left">
                  <h4 className="text-xl font-display font-bold uppercase tracking-tight">Your Mission?</h4>
                  <p className="text-slate-400 text-[8px] font-medium uppercase tracking-widest">Connect with our core team.</p>
                </div>
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-[8px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  Initiate
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setSelectedProject(null)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-4xl glass rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 max-h-[80vh]">
              <div className="w-full md:w-5/12 relative h-48 md:h-auto overflow-hidden bg-slate-900 shrink-0">
                <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter leading-tight text-white">{selectedProject.title}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-brand-primary rounded-lg text-white transition-all backdrop-blur-md">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full md:w-7/12 p-8 overflow-y-auto bg-white dark:bg-[#050505]">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[7px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Summary</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[7px] font-mono font-bold text-brand-primary uppercase tracking-widest block">Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-[7px] font-bold text-slate-500 border border-slate-200 dark:border-white/10">{tech.toUpperCase()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl text-[8px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                      Full Project Specs <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
