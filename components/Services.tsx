
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
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -200 }}
              animate={{ y: 500 }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              className="text-[10px] font-mono font-bold text-brand-primary whitespace-nowrap absolute"
              style={{ left: `${i * 15}%` }}
            >
              {Array(30).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('\n')}
            </motion.div>
          ))}
        </div>
      );
    case 'social':
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] dark:opacity-10 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: isHovered ? [1, 1.6, 1] : [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 6, delay: i * 1.5, repeat: Infinity }}
              className={`absolute w-72 h-72 border ${i % 2 === 0 ? 'border-brand-primary' : 'border-brand-accent'} rounded-[3rem]`}
            />
          ))}
        </div>
      );
    case 'ads':
      return (
        <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-around px-10 opacity-[0.07] dark:opacity-[0.1] pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isHovered ? [10, Math.random() * 100 + 50, 10] : [5, Math.random() * 40 + 5, 5]
              }}
              transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity }}
              className="w-2.5 bg-gradient-to-t from-brand-primary to-brand-signal rounded-t-xl"
            />
          ))}
        </div>
      );
    case 'seo':
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] dark:opacity-[0.12] pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-80 h-80 border-2 border-dashed border-brand-primary rounded-full relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-brand-primary rounded-full blur-[2px]" />
          </motion.div>
          <motion.div
             animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 5, repeat: Infinity }}
             className="absolute w-40 h-40 border-4 border-brand-signal/30 rounded-full"
          />
        </div>
      );
    case 'creative':
      return (
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none">
          <motion.div
            animate={{ 
              x: isHovered ? [0, 60, -60, 0] : [0, 30, -30, 0],
              y: isHovered ? [0, -40, 40, 0] : [0, -20, 20, 0],
              scale: [1, 1.3, 0.85, 1],
              rotate: [0, 45, -45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-brand-primary via-brand-accent to-brand-signal blur-[120px] rounded-full"
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

  const rotateX = useSpring(useTransform(mouseY, [0, 400], [6, -6]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-6, 6]), { stiffness: 100, damping: 20 });

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
      style={{ rotateX, rotateY, perspective: 1500 }}
      className="group relative glass rounded-[3rem] p-12 cursor-pointer transition-all duration-700 hover:shadow-4xl border border-slate-200 dark:border-white/5 h-full flex flex-col overflow-hidden"
    >
      {/* Dynamic Background Visualizer */}
      <ServiceVisualizer id={service.id} isHovered={isHovered} />

      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            boxShadow: isHovered ? '0 0 30px rgba(37, 99, 235, 0.3)' : '0 0 0px rgba(0,0,0,0)'
          }}
          className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shadow-xl mb-12 transition-all border border-slate-100 dark:border-white/5 group-hover:bg-brand-primary group-hover:text-white"
        >
          {iconMap[service.icon]}
        </motion.div>
        
        <div className="space-y-6 mb-12">
          <h4 className="text-3xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-none group-hover:text-brand-primary transition-colors">
            {service.title}
          </h4>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium line-clamp-3">
            {service.description}
          </p>
        </div>

        <div className="mt-auto pt-10 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${isHovered ? 'bg-brand-primary scale-125 shadow-[0_0_12px_#2563EB]' : 'bg-slate-300 dark:bg-white/20'}`} />
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {isHovered ? 'PROTOCOL_LOCKED' : 'READY_TO_DEPLOY'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-brand-primary translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Deploy</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Glossy Overlay for tactile depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-48 relative overflow-hidden bg-slate-50 dark:bg-brand-dark transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-brand-primary" />
            <span className="text-brand-primary font-mono font-bold tracking-[0.6em] uppercase text-xs">Architectural Nodes</span>
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
            
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-md leading-relaxed italic border-l border-slate-200 dark:border-white/10 pl-8 pb-4">
              "We provide the technical infrastructure and market logic required for undisputed category dominance."
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
            className="lg:col-span-1 p-12 rounded-[3rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col justify-between group shadow-3xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-10 opacity-15">
                <Cpu className="w-40 h-40 animate-spin-slow text-brand-primary" />
             </div>
             <div className="relative z-10">
               <h4 className="text-3xl font-display font-bold uppercase tracking-tight mb-6">Custom Protocol?</h4>
               <p className="text-slate-400 dark:text-slate-500 font-medium text-base leading-relaxed mb-16">
                 Need a bespoke engineering solution that transcends standard modules? We architect high-tier custom clusters for high-stakes missions.
               </p>
             </div>
             <button 
               onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="relative z-10 w-full py-6 bg-brand-primary text-white font-bold rounded-2xl text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-brand-primary/40 active:scale-95"
             >
               Initialize Uplink
               <ArrowRight className="w-4 h-4" />
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
