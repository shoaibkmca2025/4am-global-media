import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  const words = "In a world of noise, we engineer the signal. Impact isn't just visibility—it's resonance. We fuse data precision with human creativity to architect outcomes that don't just capture attention; they command it.".split(" ");

  return (
    <section ref={containerRef} className="py-64 bg-white dark:bg-brand-obsidian relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.04)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.04)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 flex items-center gap-6"
          >
            <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs">
              01 // CORE_PHILOSOPHY
            </span>
            <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/5" />
          </motion.div>

          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-display font-bold leading-[0.95] flex flex-wrap gap-x-[0.3em] gap-y-2 text-gray-900 dark:text-white tracking-tighter transition-colors">
            {words.map((word, i) => {
              const start = i / (words.length * 1.5);
              const end = start + 0.15;
              return (
                <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
              );
            })}
          </h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-gray-200 dark:border-white/5"
          >
             {[
               { label: 'Signal_Latency', value: '< 1.4ms', detail: 'Zero-lag growth architectures' },
               { label: 'Data_Integrity', value: '100%', detail: 'Cryptographic result verification' },
               { label: 'Network_Scale', value: 'Infinity', detail: 'Stateless node scalability' }
             ].map((stat, idx) => (
               <div key={idx} className="space-y-4">
                 <p className="text-[10px] font-mono text-brand-primary uppercase tracking-[0.3em] font-bold">{stat.label}</p>
                 <p className="text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tighter transition-colors">{stat.value}</p>
                 <p className="text-xs text-gray-500 font-medium tracking-wide leading-relaxed">{stat.detail}</p>
               </div>
             ))}
          </motion.div>
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
  const opacity = useTransform(progress, range, [0.03, 1]);
  const blur = useTransform(progress, range, ['15px', '0px']);
  const y = useTransform(progress, range, ['20px', '0px']);

  return (
    <motion.span 
      style={{ opacity, filter: `blur(${blur})`, y }} 
      className="inline-block"
    >
      {word}
    </motion.span>
  );
};

export default Philosophy;