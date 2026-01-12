
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const text = "In a world of noise, we engineer the signal. Impact isn't just visibility—it's resonance. We fuse data precision with human creativity to architect outcomes that don't just capture attention; they command it.";

  return (
    <section ref={containerRef} className="py-48 2xl:py-64 bg-white dark:bg-brand-obsidian relative overflow-hidden transition-colors duration-500 group/phil">
      {/* 1. Enhanced Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 flex items-center gap-10"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-brand-primary font-mono font-bold tracking-[0.4em] uppercase text-[10px]">
                01 // CORE_PRINCIPLES
              </span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest opacity-40">Operational Protocol</span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-primary/20 to-transparent" />
          </motion.div>

          {/* 2. Attractive Mask Reveal Text */}
          <div className="relative">
            <h2 className="text-5xl md:text-7xl 2xl:text-[8rem] font-display font-bold leading-[0.95] text-slate-100 dark:text-white/5 tracking-tighter select-none">
              {text}
            </h2>
            
            <motion.h2 
              style={{
                WebkitMaskImage: useTransform(
                  [smoothX, smoothY],
                  ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, black 0%, transparent 100%)`
                ),
                maskImage: useTransform(
                  [smoothX, smoothY],
                  ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, black 0%, transparent 100%)`
                )
              }}
              className="absolute inset-0 text-5xl md:text-7xl 2xl:text-[8rem] font-display font-bold leading-[0.95] text-slate-900 dark:text-white tracking-tighter pointer-events-none"
            >
              {text}
            </motion.h2>
          </div>

          {/* 3. Refined Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="mt-32 2xl:mt-48 grid grid-cols-1 md:grid-cols-3 gap-16 pt-20 border-t border-slate-100 dark:border-white/5"
          >
             {[
               { label: 'Signal_Latency', value: '< 1.4ms', detail: 'Zero-lag growth architectures engineered for hyper-scale.' },
               { label: 'Data_Integrity', value: '100%', detail: 'Cryptographic result verification across all marketing nodes.' },
               { label: 'Network_Scale', value: 'Infinity', detail: 'Stateless node scalability for global market penetration.' }
             ].map((stat, idx) => (
               <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                className="space-y-6 group/stat"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-[1px] bg-brand-primary/40 group-hover/stat:w-16 transition-all duration-500" />
                   <p className="text-[9px] font-mono text-brand-primary uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                 </div>
                 <p className="text-6xl md:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tighter group-hover/stat:text-brand-primary transition-colors duration-500">{stat.value}</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">{stat.detail}</p>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
