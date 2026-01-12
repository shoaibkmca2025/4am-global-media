
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, X, Cpu, Code2, AlertCircle, Lightbulb, ChevronRight, Share2, Plus, Target, Info } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 200, damping: 30 });

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

  // Reduced staggered margin for a tighter grid
  const staggerClass = index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-12 2xl:mt-16';

  const tagVariants = {
    initial: { scale: 0.8, opacity: 0, y: 10 },
    hover: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 25 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className={`relative group cursor-pointer w-full ${staggerClass}`}
    >
      <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary/10 via-brand-accent/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative glass rounded-[2rem] overflow-hidden border border-white/30 dark:border-white/5 transition-all duration-700 shadow-xl group-hover:shadow-2xl group-hover:border-brand-primary/30">
        {/* Adjusted aspect ratio to be shorter and more balanced */}
        <div className="relative aspect-[16/10] md:aspect-video lg:aspect-[1.4/1] overflow-hidden">
          <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-700" />
          
          <div className="absolute top-5 left-5">
            <motion.span variants={tagVariants} initial="initial" animate="initial" className="px-3 py-1 bg-brand-primary/90 backdrop-blur-xl border border-white/20 rounded-full text-[8px] font-mono font-bold text-white uppercase tracking-[0.2em] shadow-lg">
              {project.category}
            </motion.span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="space-y-2">
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold uppercase tracking-tighter leading-tight">
                {project.title}
              </h4>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="h-[1px] w-6 bg-brand-primary" />
                <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-brand-primary">Case_Log_Open</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/40 dark:bg-black/10 backdrop-blur-md">
           <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mb-5 font-medium line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <div key={tech} className="w-7 h-7 rounded-full border border-white dark:border-brand-obsidian bg-slate-100 dark:bg-white/5 flex items-center justify-center shadow-sm" title={tech}>
                  <Code2 className="w-2.5 h-2.5 text-brand-primary" />
                </div>
              ))}
              {project.technologies.length > 3 && (
                <div className="w-7 h-7 rounded-full border border-white dark:border-brand-obsidian bg-brand-primary/10 flex items-center justify-center text-[7px] font-bold text-brand-primary">
                  +{project.technologies.length - 3}
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
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
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-slate-50 dark:bg-brand-obsidian relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ y: sectionY }} className="max-w-[1440px] mx-auto">
          <div className="mb-24 flex flex-col lg:flex-row items-baseline justify-between gap-10">
            <div className="space-y-5 max-w-3xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-brand-primary" />
                <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-[9px]">03 // Deployments</span>
              </div>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.8]">
                ENGINEERED <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">OUTCOMES.</span>
              </h3>
            </div>
            <div className="lg:max-w-xs text-slate-500 space-y-4">
              <p className="text-lg font-light italic border-l border-brand-primary/20 pl-5 leading-relaxed">
                Bespoke technical solutions and growth frameworks for market leaders.
              </p>
              <div className="flex items-center gap-3 opacity-60">
                <Cpu className="w-4 h-4 text-brand-primary" />
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest">Load_Status: NOMINAL</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-0">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} className="w-full lg:mt-12 2xl:mt-16">
              <div className="h-full min-h-[320px] glass rounded-[2rem] p-10 border-2 border-dashed border-brand-primary/20 flex flex-col items-center justify-center text-center space-y-6 group hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-700">
                <Share2 className="w-8 h-8 text-brand-primary/40 group-hover:text-brand-primary transition-all duration-500" />
                <div className="space-y-1">
                  <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Merge Your Mission.</h4>
                  <p className="text-slate-400 text-[9px] font-medium max-w-[200px] mx-auto uppercase tracking-widest">Connect with our engineering core today.</p>
                </div>
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-[9px] uppercase tracking-[0.2em] transition-all"
                >
                  Start Transmission
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedProject(null)} />
            <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="relative w-full max-w-6xl glass rounded-[2.5rem] overflow-hidden shadow-3xl flex flex-col lg:flex-row max-h-[85vh] border border-white/20">
              <div className="w-full lg:w-1/2 relative h-[30vh] lg:h-auto overflow-hidden bg-slate-900 shrink-0">
                <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-[0.85]">{selectedProject.title}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="absolute top-5 right-5 p-3 bg-white/10 hover:bg-brand-primary rounded-xl text-white transition-all backdrop-blur-xl border border-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full lg:w-1/2 p-8 md:p-10 2xl:p-12 overflow-y-auto bg-white dark:bg-[#080808] transition-colors duration-500">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Mission_Brief</span>
                    <p className="text-sm 2xl:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[8px] font-mono font-bold text-brand-primary uppercase tracking-widest block">Stack_Matrix</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-lg text-[8px] font-bold text-slate-500 border border-slate-100 dark:border-white/10">{tech.toUpperCase()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-[9px]">
                      Access Data Module
                      <ChevronRight className="w-3 h-3" />
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
