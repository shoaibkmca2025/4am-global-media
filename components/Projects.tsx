import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, X, ChevronRight, Layers, Trophy, Cpu } from 'lucide-react';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-black transition-colors duration-300 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Selected Work</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">Recent Deployments</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mt-4 md:mt-0 text-right font-light">
            We build digital experiences that define categories and drive growth. Click to explore case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 shadow-xl bg-gray-100 dark:bg-zinc-900">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <div className="px-6 py-3 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border border-white/20">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-primary transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1 mb-4">{project.description}</p>
                  
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[9px] font-bold px-2 py-0.5 bg-gray-100/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200 dark:border-white/5 transition-all duration-300 group-hover:border-brand-primary/20 group-hover:text-brand-primary/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-mono py-1 px-4 border border-gray-200 dark:border-white/20 rounded-full text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-all duration-500 transform scale-95 opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:border-brand-primary group-hover:text-brand-primary group-hover:bg-brand-primary/5 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] dark:group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] shrink-0">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-gray-900/90 dark:bg-black/95 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                  <span className="px-3 py-1 rounded-full bg-brand-primary text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold mb-2">{selectedProject.title}</h3>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors md:hidden"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto bg-white dark:bg-[#0a0a0a]">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="hidden md:flex absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-8 mt-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">
                      <Layers className="w-4 h-4 text-brand-primary" />
                      The Challenge
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">
                      <Trophy className="w-4 h-4 text-brand-primary" />
                      The Solution
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
                      <Cpu className="w-4 h-4 text-brand-primary" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-200 dark:border-white/10">
                    <button className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 group">
                      Visit Live Project
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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