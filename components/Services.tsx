import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { Instagram, Target, Code, TrendingUp, PenTool, Bitcoin, X, ArrowRight, Check, Loader2, Send, ArrowLeft, CheckCircle } from 'lucide-react';

const iconMap: any = {
  instagram: <Instagram className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'pen-tool': <PenTool className="w-6 h-6" />,
  bitcoin: <Bitcoin className="w-6 h-6" />,
};

const iconMapLarge: any = {
  instagram: <Instagram className="w-10 h-10" />,
  target: <Target className="w-10 h-10" />,
  code: <Code className="w-10 h-10" />,
  'trending-up': <TrendingUp className="w-10 h-10" />,
  'pen-tool': <PenTool className="w-10 h-10" />,
  bitcoin: <Bitcoin className="w-10 h-10" />,
};

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect: (s: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onSelect }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
    
    // Spotlight calculations
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(service)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-panel p-8 rounded-2xl group relative cursor-pointer spotlight-card min-h-[300px] flex flex-col justify-between"
    >
       {/* Perspective Content Container */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
          {iconMap[service.icon]}
        </div>
        <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-300">
          {service.description}
        </p>
      </div>
      
      <div style={{ transform: "translateZ(20px)" }} className="mt-6 flex items-center text-brand-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        Initialize <ArrowRight className="w-4 h-4 ml-2" />
      </div>

      {/* Gloss Effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"
        style={{ transform: "translateZ(1px)" }} 
      />
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
    setShowForm(false);
    setFormStatus('idle');
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setShowForm(false);
    setFormStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="services" className="py-24 relative bg-gray-50 dark:bg-brand-dark perspective-1000 transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">Deploy Solutions</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mt-4 md:mt-0 text-right font-light">
            Advanced strategies for the modern digital ecosystem. We don't just follow trends; we create them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onSelect={handleOpenModal} 
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            key="modal-container"
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-gray-900/50 dark:bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden relative z-10 shadow-2xl shadow-brand-primary/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 right-0 p-4 z-20">
                <button 
                  onClick={handleCloseModal}
                  className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 md:p-10">
                {showForm ? (
                   <motion.div
                    key="service-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                   >
                     <div className="flex items-center gap-3 mb-6">
                       <button 
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                       >
                         <ArrowLeft className="w-5 h-5" />
                       </button>
                       <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Inquire about {selectedService.title}</h3>
                     </div>

                     {formStatus === 'success' ? (
                       <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
                         <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                           <CheckCircle className="w-8 h-8 text-green-500" />
                         </div>
                         <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Request Received!</h3>
                         <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
                           We've received your inquiry about {selectedService.title}. Our team will review it and get back to you within 24 hours.
                         </p>
                         <button 
                          onClick={handleCloseModal}
                          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                         >
                           Close
                         </button>
                       </div>
                     ) : (
                       <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label htmlFor="modal-name" className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                             <input 
                               required 
                               type="text" 
                               id="modal-name"
                               className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                               placeholder="John Doe"
                             />
                           </div>
                           <div className="space-y-2">
                             <label htmlFor="modal-email" className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                             <input 
                               required 
                               type="email" 
                               id="modal-email"
                               className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                               placeholder="john@example.com"
                             />
                           </div>
                         </div>
                         
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Service</label>
                            <input 
                              disabled
                              value={selectedService.title}
                              className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                            />
                         </div>

                         <div className="space-y-2">
                           <label htmlFor="modal-message" className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Details</label>
                           <textarea 
                             required
                             id="modal-message"
                             rows={4}
                             className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                             placeholder="Tell us about your specific needs..."
                           ></textarea>
                         </div>

                         <button 
                           type="submit" 
                           disabled={formStatus === 'submitting'}
                           className="w-full bg-brand-primary text-white font-bold py-4 rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 mt-2"
                         >
                           {formStatus === 'submitting' ? (
                             <>
                               <Loader2 className="w-5 h-5 animate-spin" />
                               Sending...
                             </>
                           ) : (
                             <>
                               Send Inquiry
                               <Send className="w-4 h-4" />
                             </>
                           )}
                         </button>
                       </form>
                     )}
                   </motion.div>
                ) : (
                  <motion.div
                    key="service-details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                        {iconMapLarge[selectedService.icon]}
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold mb-2 text-gray-900 dark:text-white">
                          {selectedService.title}
                        </h3>
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-medium uppercase tracking-wider">
                          Available Service
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Overview</h4>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedService.longDescription || selectedService.description}
                      </p>
                    </div>

                    {selectedService.features && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                              <div className="mt-1 w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-brand-primary" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex justify-end gap-4">
                      <button 
                        onClick={handleCloseModal}
                        className="px-6 py-3 rounded-lg text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium transition-colors"
                      >
                        Close
                      </button>
                      <button 
                        onClick={() => setShowForm(true)}
                        className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        Inquire Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;