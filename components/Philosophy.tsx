import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const words = "In a world of noise, we engineer the signal. We believe that true digital impact isn't just about visibility—it's about resonance. By fusing data-driven precision with human-centric creativity, we don't just capture attention; we command it.".split(" ");

  return (
    <section ref={containerRef} className="py-32 bg-gray-50 dark:bg-brand-dark relative overflow-hidden transition-colors duration-300">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            style={{ opacity, y }}
            className="mb-12"
          >
            <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Philosophy
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] flex flex-wrap gap-x-4 gap-y-2 text-gray-900 dark:text-white">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              return (
                <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
              );
            })}
          </h2>
        </div>
      </div>
    </section>
  );
};

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-colors duration-500">
      {word}
    </motion.span>
  );
};

export default Philosophy;