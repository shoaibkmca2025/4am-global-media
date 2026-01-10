
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Core movement values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High-performance spring configurations
  const coreSpring = { stiffness: 1000, damping: 50, mass: 0.1 };
  const ringSpring = { stiffness: 350, damping: 25, mass: 0.5 };
  const ghostSpring = { stiffness: 150, damping: 20, mass: 0.8 };
  
  const smoothX = useSpring(mouseX, ringSpring);
  const smoothY = useSpring(mouseY, ringSpring);
  
  const coreX = useSpring(mouseX, coreSpring);
  const coreY = useSpring(mouseY, coreSpring);

  const ghostX = useSpring(mouseX, ghostSpring);
  const ghostY = useSpring(mouseY, ghostSpring);

  // Velocity tracking for prismatic shift
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      // Velocity calculation for "Spectral Stretching"
      const now = Date.now();
      const dt = now - lastPos.current.time;
      if (dt > 0) {
        const dx = clientX - lastPos.current.x;
        const dy = clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setVelocity(dist / dt);
      }
      lastPos.current = { x: clientX, y: clientY, time: now };

      // Element detection
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], .cursor-pointer');
      const textable = target.closest('p, h1, h2, h3, h4, span, input, textarea');

      if (clickable) {
        setCursorState('pointer');
        setTargetRect(clickable.getBoundingClientRect());
      } else if (textable) {
        setCursorState('text');
        setTargetRect(null);
      } else {
        setCursorState('default');
        setTargetRect(null);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [isVisible]);

  // Derived visuals
  const spectralBlur = useTransform(smoothX, () => Math.min(velocity * 2, 8));
  const spectralScale = useTransform(smoothX, () => 1 + Math.min(velocity * 0.05, 0.4));

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* 1. The Ghost Aura (Bokeh Trail) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-brand-primary/10 blur-[20px]"
        style={{
          x: ghostX,
          y: ghostY,
          translateX: '-50%',
          translateY: '-50%',
          width: 80,
          height: 80,
        }}
        animate={{
          opacity: velocity > 1 ? 0.3 : 0,
          scale: 0.5 + velocity * 0.2
        }}
      />

      {/* 2. The Spectral Prism Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-white/40 mix-blend-difference backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          scale: spectralScale,
        }}
        animate={{
          width: cursorState === 'pointer' ? 60 : cursorState === 'text' ? 4 : 32,
          height: cursorState === 'pointer' ? 60 : cursorState === 'text' ? 40 : 32,
          borderRadius: cursorState === 'pointer' ? '12px' : cursorState === 'text' ? '2px' : '50%',
          rotate: cursorState === 'pointer' ? 45 : 0,
          borderColor: cursorState === 'pointer' ? '#00F0FF' : 'rgba(255,255,255,0.4)',
          backgroundColor: isMouseDown ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {/* Prism Corner Detail */}
        <AnimatePresence>
          {cursorState === 'pointer' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[150%] h-[1px] bg-brand-signal/20 rotate-45" />
              <div className="w-[150%] h-[1px] bg-brand-signal/20 -rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. Precision Core Point */}
      <motion.div
        className="fixed top-0 left-0 bg-white z-20"
        style={{
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255,255,255,0.8)'
        }}
        animate={{
          scale: isMouseDown ? 0.6 : cursorState === 'pointer' ? 1.5 : 1,
          opacity: cursorState === 'text' ? 0 : 1,
          backgroundColor: cursorState === 'pointer' ? '#00F0FF' : '#FFFFFF'
        }}
      />

      {/* 4. Floating Node Status Ticker */}
      <AnimatePresence>
        {cursorState === 'pointer' && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 40, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 10 }}
            className="fixed top-0 left-0 flex items-start gap-2"
            style={{ x: coreX, y: coreY }}
          >
            <div className="flex flex-col">
              <span className="text-[7px] font-mono text-brand-signal font-bold tracking-[0.4em] uppercase">
                TARGET_LOCK
              </span>
              <div className="h-[1px] w-6 bg-brand-signal/50 mt-1" />
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 h-1 bg-brand-signal" 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Impulse Ripple (On Click) */}
      <AnimatePresence>
        {isMouseDown && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-20 h-20 border-2 border-white rounded-full mix-blend-difference"
            style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
