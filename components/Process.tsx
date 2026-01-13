
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, PenTool, Rocket, Cpu, ArrowRight, Zap, Target, Layers, FileText, Activity } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Discovery & Audit',
    description: 'A deep architectural analysis of your current business, goals, audience, and market landscape to identify core friction points.',
    icon: Search,
    color: 'text-brand-primary',
    border: 'group-hover:border-brand-primary/50'
  },
  {
    id: '02',
    title: 'Strategy & Planning',
    description: 'Engineering a clear growth roadmap aligned with measurable KPIs and ROI objectives before a single pixel is moved.',
    icon: FileText,
    color: 'text-brand-accent',
    border: 'group-hover:border-brand-accent/50'
  },
  {
    id: '03',
    title: 'Execution & Launch',
    description: 'High-performance deployment of custom software, conversion funnels, brand content, and multi-channel ad systems.',
    icon: Rocket,
    color: 'text-brand-signal',
    border: 'group-hover:border-brand-signal/50'
  },
  {
    id: '04',
    title: 'Optimization & Growth',
    description: 'Data-driven testing and continuous improvement loops to ensure long-term scalability and maximum market authority.',
    icon: Activity,
    color: 'text-emerald-500',
    border: 'group-hover:border-emerald-500/50'
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="process" ref={containerRef} className="py-48 relative overflow-hidden bg-slate-50 dark:bg-brand-obsidian transition-colors duration-500">
      {/* Background Decorative */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-brand-primary" />
              <span className="text-brand-primary font-mono font-bold tracking-[0.6em] uppercase text-xs">Proven Framework</span>
            </motion.div>
            <h3 className="text-6xl md:text-9xl font-display font-bold text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.8] mb-8">
              OUR 4-STEP <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-indigo-400 to-emerald-500">PROCESS.</span>
            </h3>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`h-full glass rounded-[2.5rem] p-10 border border-white/40 dark:border-white/5 transition-all duration-500 ${step.border} hover:shadow-2xl hover:-translate-y-2`}>
                  <div className="mb-10 flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center ${step.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-display font-bold opacity-10 group-hover:opacity-30 transition-opacity">
                      {step.id}
                    </span>
                  </div>

                  <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">
                    {step.title}
                  </h4>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                    {step.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-brand-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Protocol_{step.id}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 bg-slate-900 dark:bg-white rounded-[3rem] text-white dark:text-slate-900 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-3xl overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] pointer-events-none" />
            
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 dark:bg-slate-900/10 flex items-center justify-center border border-white/10">
                <Zap className="w-8 h-8 text-brand-primary animate-pulse" />
              </div>
              <div>
                <p className="font-display font-bold uppercase tracking-tight text-3xl">Built for Growth.</p>
                <p className="text-white/60 dark:text-slate-900/60 font-medium">Ready to build a digital system that works while you sleep?</p>
              </div>
            </div>
            
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative z-10 px-12 py-5 bg-brand-primary text-white font-bold rounded-2xl text-xs uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)] hover:scale-105 transition-all active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Book Strategy Call</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
