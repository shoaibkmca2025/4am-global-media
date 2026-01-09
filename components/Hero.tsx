import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, LayoutDashboard } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [scrambleText, setScrambleText] = useState("Our Mission.");
  const targetText = "OUR MISSION.";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
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
      iteration += 1 / 3;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-brand-dark dark:via-transparent dark:to-brand-dark z-10" />
        <div className="cyber-grid w-[200vw] h-[200vh] absolute top-[-50%] left-[-50%] origin-center opacity-50 dark:opacity-100"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20">
        <motion.div style={{ y: y1 }} className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className="text-xs font-mono text-brand-primary tracking-widest uppercase font-semibold">System Online // 2025</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-[7rem] font-display font-bold leading-[0.9] mb-8 tracking-tighter text-gray-900 dark:text-white"
          >
            YOUR GROWTH, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-gray-800 to-brand-accent dark:via-white text-glow">
              {scrambleText}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Architects of the digital future. We fuse data-driven strategy with high-velocity engineering to build brands that dominate the signal.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {user ? (
              <Link 
                to="/dashboard" 
                className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand-primary/25 hover:scale-105 active:scale-95"
              >
                <LayoutDashboard className="w-4 h-4" />
                Enter Dashboard
              </Link>
            ) : (
              <button 
                type="button"
                onClick={(e) => handleScroll(e, '#services')}
                className="w-full sm:w-auto px-10 py-5 bg-brand-dark dark:bg-white text-white dark:text-black font-bold rounded-full transition-all flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              >
                Initialize Protocol
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <button 
              type="button"
              onClick={(e) => handleScroll(e, '#clients')}
              className="w-full sm:w-auto px-10 py-5 border border-gray-200 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white font-medium rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
            >
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Access Network
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;