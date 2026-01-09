import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  // Top-level hook calls (Correct placement)
  const springX = useSpring(0, { stiffness: 1000, damping: 50, mass: 0.1 });
  const springY = useSpring(0, { stiffness: 1000, damping: 50, mass: 0.1 });
  const ringX = useSpring(0, { stiffness: 500, damping: 40 });
  const ringY = useSpring(0, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const onFirstMove = () => {
      setIsVisible(true);
      document.documentElement.classList.add('has-custom-cursor');
    };

    const updateMousePosition = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element)) return;
      const target = e.target as Element;
      
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
      const isText = target.closest('p, h1, h2, h3, h4, span, li');
      
      setIsHovering(!!isClickable);
      
      if (isClickable) setCursorType('pointer');
      else if (isText && !isClickable) setCursorType('text');
      else setCursorType('default');
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onFirstMove, { once: true });
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [springX, springY, ringX, ringY]);

  // Disable on touch devices
  if (typeof window === 'undefined' || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div 
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: 'none' }} 
      className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-500"
    >
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-primary mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 30,
          height: isHovering ? 60 : 30,
          borderWidth: isHovering ? 1 : 2,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0)',
        }}
      />

      {/* Center Core */}
      <motion.div
        className="fixed top-0 left-0 bg-brand-primary rounded-full mix-blend-difference shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 10 : 6,
          height: isHovering ? 10 : 6,
          scale: isMouseDown ? 0.6 : 1,
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-[-4px] border border-white/20 rounded-full animate-ping"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Context Indicator */}
      <AnimatePresence>
        {cursorType === 'text' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 20 }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-0 left-0 w-[1px] bg-brand-primary"
            style={{
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;