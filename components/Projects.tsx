import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, X, Layers, Trophy, Cpu, Code2, AlertCircle, Lightbulb } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Animation variants for the tech badges
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as any }
    }
  };

  return (
    <section id="projects" className="py-32 bg-white dark:bg-brand-obsidian transition-colors duration-500 relative border-t border-gray-100 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs"
            >
              03 // DEPLOYMENTS
            </motion.span>
            <h3 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white tracking-tighter uppercase transition-colors">CASE STUDIES</h3>
          </div>
          <p className="text-gray-500 max-w-md text-right font-medium leading-relaxed">
            Architecting digital resonance through high-velocity engineering and strategic precision. Explore our latest system deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container with Refined Zoom and Depth */}
              <div className="relative overflow-hidden rounded-sm aspect-[16/10] mb-10 shadow-2xl bg-zinc-100 dark:bg-zinc-900 border border-gray-100 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/90 via-transparent to-transparent opacity-90 z-10"></div>
                
                {/* Visual Overlay Scanlines/Grid */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-20 dark:opacity-30 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
                
                {/* Refined Image Zoom */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transform scale-100 group-hover:scale-110 group-hover:brightness-110 transition-all duration-[2000ms] ease-[0.19,1,0.22,1]"
                />
                
                {/* Center Hover Action Link */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="px-8 py-4 bg-brand-primary text-white rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                    UPLINK_VIEW
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h4 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-primary transition-colors duration-500 uppercase">
                    {project.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed line-clamp-2 mb-8 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                    {project.description}
                  </p>
                  
                  {/* Staggered Tech Stack Badges */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3"
                  >
                    {project.technologies?.map((tech) => (
                      <motion.div 
                        key={tech}
                        variants={badgeVariants}
                        whileHover={{ scale: 1.05, borderColor: 'rgba(59,130,246,0.6)' }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 rounded-sm border border-gray-200 dark:border-white/10 transition-all duration-300 group-hover:border-brand-primary/20 group-hover:text-brand-primary"
                      >
                        <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
                        {tech.toUpperCase()}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Refined Animated Glowing Category Tag */}
                <span className="text-[10px] font-mono py-2.5 px-6 border border-gray-200 dark:border-white/5 rounded-full text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] transition-all duration-700 ease-[0.19,1,0.22,1] transform scale-90 opacity-40 group-hover:opacity-100 group-hover:scale-105 group-hover:border-brand-primary group-hover:text-brand-primary group-hover:bg-brand-primary/10 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] shrink-0 flex items-center justify-center">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Terminal Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-white/95 dark:bg-brand-obsidian/98 backdrop-blur-3xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-white dark:bg-brand-obsidian border border-gray-200 dark:border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[75vh]"
            >
              {/* Media Pane */}
              <div className="w-full md:w-1/2 relative h-96 md:h-auto overflow-hidden group/modal">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover/modal:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
                
                <div className="absolute bottom-12 left-12 text-white max-w-sm">
                  <span className="px-5 py-2 rounded-sm bg-brand-primary/20 border border-brand-primary/40 text-[11px] font-mono font-bold uppercase tracking-[0.5em] mb-6 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter leading-none uppercase">{selectedProject.title}</h3>
                  <div className="w-16 h-1.5 bg-brand-primary"></div>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 p-3 bg-black/60 hover:bg-brand-primary rounded-full text-white transition-all md:hidden z-30"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Data Pane */}
              <div className="w-full md:w-1/2 p-12 md:p-20 overflow-y-auto bg-white dark:bg-brand-obsidian relative">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="hidden md:flex absolute top-12 right-12 p-2.5 hover:bg-brand-primary/10 rounded-full text-gray-400 hover:text-brand-primary transition-all duration-300"
                >
                  <X className="w-10 h-10" />
                </button>

                <div className="space-y-12">
                  {/* Challenge Section */}
                  <div className="group/section">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-rose-500/10 rounded-sm border border-rose-500/20 text-rose-500">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h4 className="text-[11px] font-mono font-bold text-rose-500 uppercase tracking-[0.5em]">
                        THE_CHALLENGE
                      </h4>
                    </div>
                    
                    <div className="p-8 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 border-l-4 border-l-rose-500 rounded-sm group-hover/section:bg-gray-100 dark:group-hover/section:bg-white/[0.04] transition-all duration-500">
                      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-light italic opacity-90">
                        "{selectedProject.challenge}"
                      </p>
                    </div>
                  </div>

                  {/* Solution Section */}
                  <div className="group/section">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-brand-primary/10 rounded-sm border border-brand-primary/20 text-brand-primary">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <h4 className="text-[11px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em]">
                        THE_SOLUTION
                      </h4>
                    </div>
                    
                    <div className="p-8 bg-brand-primary/5 dark:bg-brand-primary/[0.03] border border-brand-primary/20 dark:border-brand-primary/10 border-l-4 border-l-brand-primary rounded-sm group-hover/section:bg-brand-primary/10 dark:group-hover/section:bg-brand-primary/[0.05] transition-all duration-500">
                      <p className="text-gray-800 dark:text-white text-lg md:text-xl leading-relaxed font-medium">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8 pt-6">
                    <h4 className="flex items-center gap-3 text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.5em]">
                      <Cpu className="w-4 h-4" />
                      MODULE_STACK
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.technologies?.map((tech) => (
                        <div 
                          key={tech} 
                          className="px-5 py-3 rounded-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[12px] font-mono font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2 hover:text-brand-primary hover:border-brand-primary/30 transition-all cursor-default"
                        >
                           <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_#3B82F6]" />
                           {tech.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-16 border-t border-gray-100 dark:border-white/5">
                    <button className="group w-full py-8 bg-gray-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-[0.4em] hover:bg-brand-primary hover:text-white transition-all duration-700 text-sm shadow-2xl relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        DEPLOY_LIVE_ENVIRONMENT
                        <Code2 className="w-5 h-5" />
                      </span>
                      <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
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