
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { Share2, Search, Code, Zap, Palette, ArrowRight, BarChart3, Binary, Radio, Cpu, Fingerprint } from 'lucide-react';

const iconMap: any = {
  'share-2': <Share2 className="w-6 h-6" />,
  'search': <Search className="w-6 h-6" />,
  'code': <Code className="w-6 h-6" />,
  'zap': <Zap className="w-6 h-6" />,
  'palette': <Palette className="w-6 h-6" />,
};

// Unique animation components for each service type
const ServiceVisualizer: React.FC<{ id: string; isHovered: boolean }> = ({ id, isHovered }) => {
  switch (id) {
    case 'development':
      return (
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100 }}
              animate={{ y: 400 }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
              className="text-[10px] font-mono font-bold text-brand-primary whitespace-nowrap absolute"
              style={{ left: `${i * 20}%` }}
            >
              {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('\n')}
            </motion.div>
          ))}
        </div>
      );
    case 'social':
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, delay: i * 1.3, repeat: Infinity }}
              className="absolute w-64 h-64 border border-brand-primary rounded-full"
            />
          ))}
        </div>
      );
    case 'ads':
      return (
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-around px-8 opacity-[0.05] pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isHovered ? [20, Math.random() * 80 + 40, 20] : [10, Math.random() * 40 + 10, 10]
              }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
              className="w-2 bg-brand-primary rounded-t-lg"
            />
          ))}
        </div>
      );
    case 'seo':
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border-2 border-dashed border-brand-primary rounded-full relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-primary rounded-full blur-sm" />
          </motion.div>
          <motion.div
             animate={{ scale: [0.8, 1, 0.8] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute w-32 h-32 border border-brand-primary rounded-full"
          />
        </div>
      );
    case 'creative':
      return (
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
          <motion.div
            animate={{ 
              x: isHovered ? [0, 40, -40, 0] : [0, 20, -20, 0],
              y: isHovered ? [0, -30, 30, 0] : [0, -15, 15, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-brand-primary to-brand-accent blur-[100px] rounded-full"
          />
        </div>
      );
    default:
      return null;
  }
};

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-5, 5]), { stiffness: 100, damping: 20 });

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { 
        setIsHovered(false);
        mouseX.set(200); 
        mouseY.set(200); 
      }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/services/${service.id}`)}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="group relative glass rounded-[2.5rem] p-10 cursor-pointer transition-all duration-700 hover:shadow-3xl hover:border-brand-primary/30 border border-white/40 dark:border-white/5 h-full flex flex-col overflow-hidden"
    >
      {/* Dynamic Background Visualizer */}
      <ServiceVisualizer id={service.id} isHovered={isHovered} />

      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0 
          }}
          className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-xl mb-10 transition-colors border border-slate-100 dark:border-white/5 group-hover:bg-brand-primary group-hover:text-white"
        >
          {iconMap[service.icon]}
        </motion.div>
        
        <div className="space-y-4 mb-10">
          <h4 className="text-3xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-none group-hover:text-brand-primary transition-colors">
            {service.title}
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
            {service.description}
          </p>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isHovered ? 'bg-brand-primary scale-125 shadow-[0_0_10px_#2563EB]' : 'bg-slate-300 dark:bg-white/20'}`} />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              {isHovered ? 'SYNCHRONIZING' : 'ACTIVE_LINK'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-brand-primary translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">Protocol</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-48 relative overflow-hidden bg-white dark:bg-brand-dark transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-brand-primary" />
            <span className="text-brand-primary font-mono font-bold tracking-[0.6em] uppercase text-xs">Capabilities Matrix</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-9xl font-display font-bold text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.8]"
            >
              OUR CORE <br/> <span className="text-brand-primary">ENGINE.</span>
            </motion.h3>
            
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-md leading-relaxed italic border-l border-slate-200 dark:border-white/10 pl-8 pb-4">
              "We don't just provide services. We build integrated growth ecosystems where code and content drive revenue."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
          
          {/* Custom CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 p-10 rounded-[2.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col justify-between group shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Cpu className="w-32 h-32 animate-spin-slow" />
             </div>
             <div className="relative z-10">
               <h4 className="text-3xl font-display font-bold uppercase tracking-tight mb-4">Custom Protocol?</h4>
               <p className="text-white/60 dark:text-slate-500 font-medium text-sm leading-relaxed mb-12">
                 Need a bespoke engineering solution that doesn't fit standard modules? We architect custom nodes for high-complexity missions.
               </p>
             </div>
             <button 
               onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="relative z-10 w-full py-5 bg-brand-primary text-white font-bold rounded-2xl text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-xl shadow-brand-primary/20"
             >
               Initialize Briefing
               <ArrowRight className="w-4 h-4" />
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
