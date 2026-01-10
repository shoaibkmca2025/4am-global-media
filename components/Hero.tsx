import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Terminal, Cpu, Box, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const [scrambleText, setScrambleText] = useState("OUR CORE.");
  const targetText = "THE ENGINE.";
  const characters = "01$#!&*<>[]{}";
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, 150]);
  const { user } = useAuth();

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
    <section id="hero" className="relative min-h-[110vh] flex items-center pt-32 pb-48 overflow-hidden transition-colors duration-500">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/40 mb-12 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_#3B82F6]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-brand-primary">SYSTEM_READY // V4.0</span>
          </motion.div>

          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="text-6xl md:text-[9rem] font-display font-bold leading-[0.85] tracking-tighter text-slate-900 dark:text-white mb-12"
            >
              ENGINEERING <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-indigo-500 to-brand-accent">
                {scrambleText}
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-12 -right-12 hidden lg:block"
            >
               <div className="w-24 h-24 border border-brand-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                  <Sparkles className="w-8 h-8 text-brand-primary/40" />
               </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-20">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-light max-w-xl"
            >
              The world’s most ambitious startups run on 4AM. We combine elite software engineering with multi-channel digital growth strategies.
            </motion.p>

            <div className="flex flex-wrap gap-6 md:justify-end">
              <Magnetic strength={20}>
                {user ? (
                  <Link 
                    to="/dashboard" 
                    className="group px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full transition-all flex items-center gap-3 hover:shadow-2xl hover:scale-105"
                  >
                    ACCESS TERMINAL
                    <Terminal className="w-4 h-4" />
                  </Link>
                ) : (
                  <button 
                    onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group px-12 py-6 bg-brand-primary text-white font-bold rounded-full transition-all flex items-center gap-4 hover:shadow-xl hover:shadow-brand-primary/30 hover:scale-105"
                  >
                    INITIALIZE DEPLOY
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Meta Bar */}
      <motion.div 
        style={{ y: yOffset }}
        className="absolute bottom-12 left-6 right-6 glass rounded-3xl p-6 hidden md:flex items-center justify-between shadow-2xl border border-white/20"
      >
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-3">
             <Cpu className="w-4 h-4 text-brand-primary" />
             <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Compute: Nominal</span>
           </div>
           <div className="flex items-center gap-3">
             <Box className="w-4 h-4 text-brand-accent" />
             <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Nodes: 128 Active</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white uppercase tracking-widest">Status: Fully Operational</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;