
import React, { useEffect, useState } from 'react';
import { ArrowRight, Terminal, Cpu, Box, Activity, Shield, Zap, Globe } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const [scrambleText, setScrambleText] = useState("OUR CORE.");
  const targetText = "THE ENGINE.";
  const characters = "01$#!&*<>[]{}";
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, 100]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - window.innerWidth / 2);
      mouseY.set(clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambleText(prev => 
        targetText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return targetText[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      if (iteration >= targetText.length) clearInterval(interval);
      iteration += 1 / 4;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[95vh] 2xl:min-h-screen flex items-center pt-24 pb-48 overflow-hidden transition-colors duration-500">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
        <motion.div 
          style={{ 
            x: useTransform(smoothMouseX, (v) => v * -0.02),
            y: useTransform(smoothMouseY, (v) => v * -0.02)
          }}
          className="absolute inset-0 opacity-20 dark:opacity-40"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F6_1px,transparent_1px),linear-gradient(to_bottom,#3B82F6_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full glass border border-white/20 shadow-lg"
            >
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping" />
                <div className="relative w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_8px_#3B82F6]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-primary">4AM_ENGINE_ACTIVE // v4.0</span>
            </motion.div>

            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] 2xl:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter text-slate-900 dark:text-white"
              >
                ENGINEERING <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-indigo-400 to-brand-accent">
                  {scrambleText}
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-10 max-w-2xl"
            >
              <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 leading-[1.3] font-light tracking-tight">
                We synthesize <span className="text-slate-900 dark:text-white font-medium italic underline decoration-brand-primary/30 underline-offset-8">elite architecture</span> with aggressive growth.
              </p>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-4 relative h-full">
            <motion.div
              style={{ 
                x: useTransform(smoothMouseX, (v) => v * 0.05),
                y: useTransform(smoothMouseY, (v) => v * 0.05)
              }}
              className="absolute inset-0 flex flex-col gap-6 justify-center"
            >
              {[
                { icon: Shield, label: 'Security', value: 'AES_256_ACTIVE', color: 'text-brand-primary' },
                { icon: Zap, label: 'Performance', value: '0.8ms_LATENCY', color: 'text-brand-signal' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="glass p-6 rounded-[2rem] border border-white/20 shadow-2xl flex items-center gap-6 group hover:border-brand-primary/40 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center ${item.color} shadow-inner group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold font-mono tracking-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corrected Integrated Control Deck - Bottom Bar */}
      <motion.div 
        style={{ y: yOffset }}
        className="absolute bottom-10 left-6 right-6 max-w-[1440px] mx-auto z-40"
      >
        {/* Buttons that sit "on top" of the bar */}
        <div className="flex items-end gap-4 px-8 mb-[-24px] relative z-10">
          <Magnetic strength={20}>
            <button 
              onClick={() => navigate('/services')}
              className="px-10 py-6 bg-brand-primary text-white font-bold rounded-2xl shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:shadow-brand-primary/50 transition-all flex items-center gap-6 group overflow-hidden"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase">Deploy Strategy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>

          <button className="flex items-center gap-4 px-8 py-5 glass rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all group border border-white/20 shadow-xl">
             <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
               <Terminal className="w-5 h-5" />
             </div>
             <div className="text-left">
               <p className="text-[7px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Explore_Logs</p>
               <p className="text-[10px] font-bold uppercase tracking-tight text-slate-900 dark:text-white">Terminal Access</p>
             </div>
          </button>

          <div className="mb-4 ml-2">
            <div className="w-8 h-8 rounded-full border border-brand-primary/30 flex items-center justify-center relative">
               <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
               <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                 <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-brand-primary/20" />
               </svg>
            </div>
          </div>
        </div>

        {/* Main Metrics Bar */}
        <div className="glass rounded-[2.5rem] p-8 md:flex items-center justify-between shadow-2xl border border-white/40 dark:border-white/10 backdrop-blur-[40px]">
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-5 group cursor-default">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg text-brand-primary">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Hardware_Tier</span>
                <span className="text-xs font-display font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tighter">Quantum_01</span>
              </div>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10" />

            {/* Network Stability - Matching the bars in the screenshot */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex gap-1.5">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ 
                        opacity: [0.3, 1, 0.3],
                        scaleY: [1, 1.2, 1]
                      }} 
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }} 
                      className={`w-1.5 h-4 rounded-full ${i < 4 ? 'bg-brand-primary/80 shadow-[0_0_8px_#3B82F6]' : 'bg-slate-200 dark:bg-white/10'}`} 
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Network_Stability</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-1">Compute_Sync</p>
              <p className="text-xs font-bold text-brand-primary uppercase">Optimized // 100%</p>
            </div>
            
            <div className="bg-emerald-500/10 px-6 py-3 rounded-full flex items-center gap-3 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]" />
              <span className="text-[10px] font-display font-bold text-emerald-600 uppercase tracking-widest">Uplink_Established</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
