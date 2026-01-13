
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, Terminal, Cpu, Box, Activity, Shield, Zap, Globe, Signal, Binary, Loader2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Magnetic from './Magnetic';

const DataStream: React.FC = () => {
  const characters = "01$#!&<>[]{}ABCDEF";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: `${i * 10}%`, opacity: 0 }}
          animate={{ y: 1000, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute text-[8px] font-mono text-brand-primary whitespace-pre leading-none"
        >
          {[...Array(50)].map(() => characters[Math.floor(Math.random() * characters.length)]).join('\n')}
        </motion.div>
      ))}
    </div>
  );
};

const LaunchButton: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [label, setLabel] = useState("Launch Strategy");
  const targetLabel = "Initialize Uplink";
  const originalLabel = "Launch Strategy";

  useEffect(() => {
    let iteration = 0;
    let interval: number;

    if (isHovered) {
      interval = window.setInterval(() => {
        setLabel(prev => 
          targetLabel.split("").map((letter, index) => {
            if (index < iteration) return targetLabel[index];
            return "01$#!&"[Math.floor(Math.random() * 6)];
          }).join("")
        );
        if (iteration >= targetLabel.length) clearInterval(interval);
        iteration += 1;
      }, 40);
    } else {
      setLabel(originalLabel);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Magnetic strength={35}>
      <motion.button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate('/contact')}
        className="relative px-12 py-7 bg-brand-primary text-white font-bold rounded-[2rem] shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-brand-primary/60 transition-all flex items-center gap-8 group overflow-hidden border border-white/10"
      >
        {/* Border Beam */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_70%,#ffffff_90%,transparent_100%)] opacity-30"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        
        <div className="relative z-10 flex items-center gap-6">
          <span className="text-xs tracking-[0.4em] uppercase font-mono min-w-[180px] text-left">{label}</span>
          <motion.div
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.button>
    </Magnetic>
  );
};

const Hero: React.FC = () => {
  const [scrambleText, setScrambleText] = useState("OUR CORE.");
  const targetText = "THE FUTURE.";
  const characters = "01$#!&*<>[]{}";
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center pt-20 pb-40 overflow-hidden bg-brand-dark">
      <DataStream />
      
      {/* Dynamic Background Spotlights */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ 
            x: useTransform(smoothMouseX, (v) => v * 0.5),
            y: useTransform(smoothMouseY, (v) => v * 0.5),
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-primary/10 blur-[140px] rounded-full pointer-events-none" 
        />
        <motion.div 
          style={{ 
            x: useTransform(smoothMouseX, (v) => v * -0.3),
            y: useTransform(smoothMouseY, (v) => v * -0.3),
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: heroOpacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9 space-y-12">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse shadow-[0_0_10px_#2563EB]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-brand-primary">SYSTEM_OPERATIONAL</span>
              </div>
              <div className="w-[1px] h-3 bg-white/10" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400">NODE_04 // GLOBAL</span>
            </motion.div>

            <div className="relative">
              <motion.h1 
                variants={itemVariants}
                className="text-7xl md:text-[10rem] 2xl:text-[13rem] font-display font-bold leading-[0.75] tracking-tighter text-white"
              >
                CRAFTING <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-signal to-brand-accent italic glow-text">
                  {scrambleText}
                </span>
              </motion.h1>
            </div>

            <motion.div
              variants={itemVariants}
              className="max-w-2xl"
            >
              <p className="text-xl md:text-3xl text-slate-400 leading-tight font-light tracking-tight italic">
                Engineering <span className="text-white font-medium border-b border-brand-primary/50">high-velocity ecosystems</span> where complex code bridges the gap to explosive market ROI.
              </p>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-3">
             <motion.div
              style={{ 
                x: useTransform(smoothMouseX, (v) => v * 0.03),
                y: useTransform(smoothMouseY, (v) => v * 0.03)
              }}
              className="space-y-6"
            >
              {[
                { icon: Shield, label: 'Integrity', value: 'ECC_ENCRYPTED', color: 'text-brand-primary' },
                { icon: Signal, label: 'Uplink', value: '1.2ms_LATENCY', color: 'text-brand-signal' },
                { icon: Activity, label: 'Engine', value: 'v4.0.2_STABLE', color: 'text-brand-accent' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} shadow-inner group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xs font-bold font-mono tracking-tight text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Futuristic Bottom Control HUD */}
      <motion.div 
        style={{ y: yOffset }}
        className="absolute bottom-12 left-6 right-6 max-w-[1440px] mx-auto z-40"
      >
        <div className="flex items-end gap-6 mb-[-24px] relative z-10 px-8">
          <LaunchButton />
          
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-5 px-10 py-6 glass rounded-[2rem] hover:bg-white/10 transition-all group"
          >
             <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-signal">
               <Binary className="w-6 h-6" />
             </div>
             <div className="text-left">
               <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Protocol_List</p>
               <p className="text-xs font-bold uppercase tracking-tight text-white">Core Modules</p>
             </div>
          </button>
        </div>

        <div className="glass rounded-[3.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-3xl border border-white/5">
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary border border-brand-primary/20">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Core_Architecture</span>
                <span className="text-xs font-display font-bold uppercase tracking-tighter text-white">4AM_NEXUS_v4</span>
              </div>
            </div>
            
            <div className="hidden lg:flex flex-col gap-2">
              <div className="flex gap-1.5 items-end h-4">
                {[...Array(24)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      height: [4, Math.random() * 16 + 4, 4]
                    }} 
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.05 
                    }} 
                    className={`w-1 rounded-full ${i % 3 === 0 ? 'bg-brand-primary' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
              <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Signal_Throughput_Active</span>
            </div>
          </div>

          <div className="flex items-center gap-12 mt-8 md:mt-0">
            <div className="text-right hidden sm:block">
              <p className="text-[8px] font-mono text-slate-500 uppercase mb-1">Global_Sync</p>
              <div className="flex items-center gap-2 justify-end">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">128_NODES_SECURE</p>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-brand-signal animate-spin-slow" />
              <div className="text-left">
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Network</p>
                <span className="text-xs font-display font-bold uppercase tracking-widest text-white">TCP/IP_V6</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
