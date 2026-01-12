
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { Instagram, Target, Code, TrendingUp, PenTool, Bitcoin, ArrowRight, Zap, Layers } from 'lucide-react';

const iconMap: any = {
  instagram: <Instagram className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'pen-tool': <PenTool className="w-6 h-6" />,
  bitcoin: <Bitcoin className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
};

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const navigate = useNavigate();
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
      onClick={() => navigate(`/services/${service.id}`)}
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
          <div className="flex items-center gap-2 text-brand-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
            <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-48 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary" />
            <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs">Capabilities Matrix</span>
          </div>
          <h3 className="text-5xl md:text-8xl font-display font-bold text-slate-900 dark:text-white tracking-tighter uppercase">The Stack.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
