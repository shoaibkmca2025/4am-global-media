
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Target, BarChart3, ShieldCheck, Layers, Users, Zap } from 'lucide-react';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundTextY = useTransform(scrollYProgress, [0, 1], [100, -100]);

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

  const text = "ENGINEERING GROWTH — NOT IMPRESSIONS. We don't care about vanity metrics. We focus on the high-performance logic that drives leads, revenue, and global authority.";

  const differentiators = [
    { label: 'Data Integrity', icon: Target, detail: 'Absolute precision in tracking market signals and user intent.' },
    { label: 'ROAS Logic', icon: BarChart3, detail: 'Every deployment is engineered for a measurable financial return.' },
    { label: 'Deep Stack', icon: Layers, detail: 'Integrated systems where marketing and engineering act as one.' },
    { label: 'Transparency', icon: ShieldCheck, detail: 'Real-time dashboards that show exactly where your growth is coming from.' },
    { label: 'Elite Support', icon: Users, detail: 'Direct access to the architects building your digital future.' }
  ];

  return (
    <section ref={containerRef} className="py-64 bg-brand-dark relative overflow-hidden">
      {/* Immersive Parallax Background Text */}
      <motion.div 
        style={{ y: backgroundTextY }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
      >
        <span className="text-[30rem] font-display font-bold text-white uppercase leading-none whitespace-nowrap">4AM_CORE</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col md:flex-row md:items-center justify-between gap-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs">02 // MISSION_LOG</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">Architectural <span className="text-brand-primary">Logic.</span></h3>
            </div>
            <div className="max-w-xs">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
                We bridge the gap between technical infrastructure and market velocity. 
                Vanity metrics are discarded for real revenue signals.
              </p>
            </div>
          </motion.div>

          <div className="relative mb-64">
            <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-display font-bold leading-[0.85] text-white/5 tracking-tighter select-none uppercase">
              {text}
            </h2>
            
            <motion.h2 
              style={{
                WebkitMaskImage: useTransform(
                  [smoothX, smoothY],
                  ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, black 0%, transparent 100%)`
                ),
                maskImage: useTransform(
                  [smoothX, smoothY],
                  ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, black 0%, transparent 100%)`
                )
              }}
              className="absolute inset-0 text-5xl md:text-7xl lg:text-[9rem] font-display font-bold leading-[0.85] text-white tracking-tighter pointer-events-none uppercase glow-text"
            >
              {text}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 pt-32 border-t border-white/5">
             {differentiators.map((diff, idx) => (
               <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="space-y-8 group/stat"
               >
                 <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-primary group-hover/stat:bg-brand-primary group-hover/stat:text-white transition-all duration-700 shadow-2xl border border-white/10 group-hover/stat:scale-110">
                   <diff.icon className="w-8 h-8" />
                 </div>
                 <div className="space-y-4">
                   <h4 className="text-2xl font-display font-bold text-white uppercase tracking-tight leading-tight">{diff.label}</h4>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{diff.detail}</p>
                 </div>
                 <div className="h-[2px] w-0 group-hover/stat:w-full bg-brand-primary transition-all duration-1000 ease-out" />
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
