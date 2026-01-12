
import React, { useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Zap } from 'lucide-react';

const MonkeyThemeToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pullControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction values for the "swing" effect
  const mouseX = useMotionValue(0);
  const smoothRotation = useSpring(useTransform(mouseX, [-50, 50], [-15, 15]), {
    stiffness: 100,
    damping: 10
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isPulling) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    // Calculate offset from center (-50 to 50 roughly)
    const offset = e.clientX - centerX;
    mouseX.set(offset);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
  };

  const handlePull = async () => {
    if (isPulling) return;
    setIsPulling(true);

    // Pull down animation for the rope and handle
    await pullControls.start({
      y: 40,
      transition: { duration: 0.15, ease: "easeOut" }
    });

    // Toggle theme at the peak of the pull
    toggleTheme();

    // Snap back animation with bouncy spring
    await pullControls.start({
      y: 0,
      transition: { type: "spring", stiffness: 600, damping: 10 }
    });

    setIsPulling(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center select-none ${compact ? 'scale-75' : 'scale-100'}`}
      style={{ height: '120px', width: '80px' }}
    >
      {/* HUD Telemetry (Shows on hover) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          x: isHovered ? 45 : 20 
        }}
        className="absolute top-0 right-[-100px] pointer-events-none hidden lg:block z-50"
      >
        <div className="glass px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 flex flex-col gap-0.5 shadow-2xl">
           <span className="text-[7px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none">LUMINANCE_NODE</span>
           <span className={`text-[9px] font-mono font-bold uppercase ${theme === 'dark' ? 'text-brand-signal' : 'text-amber-500'}`}>
             {theme === 'dark' ? 'MIDNIGHT' : 'DAYLIGHT'}
           </span>
        </div>
      </motion.div>

      {/* The Swinging Assembly (Arm + Monkey + Rope) */}
      <motion.div
        style={{ 
          rotate: smoothRotation,
          originY: "-40px" // Swing from the ceiling point
        }}
        className="relative cursor-pointer flex flex-col items-center"
        onClick={handlePull}
      >
        {/* Support Rope from "Ceiling" */}
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-gradient-to-b from-transparent via-slate-400/30 to-slate-400/60" />

        {/* Monkey Head - Sitting at the Anchor Point */}
        <div className="relative group">
          <svg width="64" height="64" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            {/* Main Body/Face Shape */}
            <circle cx="30" cy="30" r="22" fill={theme === 'dark' ? '#1E293B' : '#e2e8f0'} stroke={theme === 'dark' ? '#334155' : '#cbd5e1'} strokeWidth="1.5"/>
            {/* Face Inner Area */}
            <path d="M30 46C38.8366 46 46 38.8366 46 30C46 21.1634 38.8366 14 30 14C21.1634 14 14 21.1634 14 30C14 38.8366 21.1634 46 30 46Z" fill={theme === 'dark' ? '#0F172A' : '#f8fafc'} />
            
            {/* Interactive Eyes */}
            <motion.circle 
              animate={{ 
                fill: theme === 'dark' ? '#00F0FF' : '#3B82F6',
                r: isHovered ? 2.5 : 2,
                boxShadow: theme === 'dark' ? '0 0 10px #00F0FF' : 'none'
              }}
              cx="22" cy="28" r="2" 
            />
            <motion.circle 
              animate={{ 
                fill: theme === 'dark' ? '#00F0FF' : '#3B82F6',
                r: isHovered ? 2.5 : 2
              }}
              cx="38" cy="28" r="2" 
            />
            
            {/* Mouth */}
            <motion.path 
              animate={{ d: isHovered ? "M25 38 Q30 42 35 38" : "M26 38 Q30 39 34 38" }}
              stroke={theme === 'dark' ? '#334155' : '#94a3b8'} 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round" 
            />
            
            {/* Ears */}
            <circle cx="10" cy="30" r="6" fill={theme === 'dark' ? '#1E293B' : '#cbd5e1'} />
            <circle cx="50" cy="30" r="6" fill={theme === 'dark' ? '#1E293B' : '#cbd5e1'} />
          </svg>
        </div>

        {/* The Vertical Pull Cord hanging from monkey */}
        <motion.div
          animate={pullControls}
          className="absolute left-1/2 -translate-x-1/2 top-[50px] flex flex-col items-center"
        >
          {/* Rope Cord Line */}
          <motion.div 
            style={{ originY: 0 }}
            animate={{ height: isPulling ? 60 : 45 }}
            className="w-[1.5px] bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 dark:from-slate-600 dark:via-slate-700 dark:to-slate-900 shadow-[0_0_8px_rgba(0,0,0,0.1)]" 
          />
          
          {/* Decorative Pull Handle (Bulbous base) */}
          <div className="relative">
            <motion.div 
              animate={{ 
                scale: isPulling ? 0.8 : 1,
                backgroundColor: theme === 'dark' ? '#00F0FF' : '#3B82F6',
                boxShadow: theme === 'dark' ? '0 0 20px #00F0FF' : '0 0 15px rgba(59,130,246,0.3)'
              }}
              className="w-5 h-9 rounded-[1rem] border border-white/30 flex items-center justify-center transition-colors shadow-xl"
            >
              <Zap className="w-2.5 h-2.5 text-white fill-white" />
            </motion.div>
            
            {/* Holographic Signal Ring */}
            <motion.div 
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute inset-[-6px] rounded-full border border-dashed ${theme === 'dark' ? 'border-brand-signal' : 'border-brand-primary'}`}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Global Flare Effect during transition */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-primary/5 dark:bg-brand-signal/5 pointer-events-none z-[200] mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonkeyThemeToggle;
