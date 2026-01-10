import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { Instagram, Target, Code, TrendingUp, PenTool, Bitcoin, X, ArrowRight, Check, Terminal, Shield, Zap, Activity } from 'lucide-react';

const iconMap: any = {
  instagram: <Instagram className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'pen-tool': <PenTool className="w-6 h-6" />,
  bitcoin: <Bitcoin className="w-6 h-6" />,
};

const ServiceCard: React.FC<{ service: Service; index: number; onSelect: (s: Service) => void }> = ({ service, index, onSelect }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(200); mouseY.set(200); }}
      onClick={() => onSelect(service)}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative glass rounded-3xl p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 border border-white/40 dark:border-white/5"
    >
      <div className="relative z-10">
        <div className="w-14 h-14 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-slate-100 dark:border-white/5">
          {iconMap[service.icon]}
        </div>
        
        <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-brand-primary transition-colors">
          {service.title}
        </h4>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10">
          {service.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Active_Module</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleInquiry = () => {
    if (!selectedService) return;
    setSelectedService(null);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('contact-name');
        if (nameInput) setTimeout(() => nameInput.focus(), 800);
      }
    }, 400);
  };

  return (
    <section id="services" className="py-48 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary" />
            <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs">Capabilities Matrix</span>
          </div>
          <h3 className="text-5xl md:text-8xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">THE STACK.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onSelect={setSelectedService} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedService(null)}
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" 
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-4xl glass rounded-[2.5rem] p-12 md:p-16 shadow-3xl overflow-hidden border border-white/50"
             >
                <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-slate-400 hover:text-brand-primary transition-colors">
                  <X className="w-8 h-8" />
                </button>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                  <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center text-brand-primary border border-white/50">
                    {iconMap[selectedService.icon]}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white">{selectedService.title}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <p className="text-slate-500 dark:text-slate-400 text-xl font-light leading-relaxed italic">
                    {selectedService.longDescription}
                  </p>
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">Sub-Modules</h4>
                    {selectedService.features?.map((f) => (
                      <div key={f} className="flex items-center gap-4 p-4 glass rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300">
                        <Zap className="w-4 h-4 text-brand-primary" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleInquiry}
                  className="w-full mt-16 py-8 bg-brand-primary text-white font-bold rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all uppercase tracking-[0.3em] text-sm"
                >
                  Initialize Protocol Inquiry
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;