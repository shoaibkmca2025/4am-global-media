
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Zap, Calendar, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SubmitButton: React.FC<{ status: string }> = ({ status }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button 
      type="submit" 
      disabled={status === 'submitting'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full bg-brand-primary text-white font-bold py-5 rounded-2xl transition-all overflow-hidden shadow-xl hover:shadow-brand-primary/50 border border-white/10`}
    >
      {/* Border Beam */}
      <AnimatePresence>
        {isHovered && status !== 'submitting' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_70%,#ffffff_90%,transparent_100%)] opacity-20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-slate-900 dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] z-0" />
      
      <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-[10px] group-hover:text-white dark:group-hover:text-black transition-colors font-mono">
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            TRANSMITTING_DATA...
          </>
        ) : (
          <>
            Initiate Growth Protocol
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
            </motion.div>
          </>
        )}
      </span>
    </motion.button>
  );
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative bg-white dark:bg-brand-obsidian transition-colors duration-500">
       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs">05 // Strategy Uplink</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-gray-900 dark:text-white tracking-tighter uppercase leading-none">
                Initialize <br /> <span className="text-brand-primary">Growth.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-medium leading-relaxed max-w-lg italic">
                Ready to build a digital system that works while you sleep? Book your free strategy call and bridge the gap to ROI.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { label: 'Secure_Mail', value: 'contact@4amglobal.media', icon: Mail },
                { label: 'Voice_Uplink', value: '+1 (555) 000-0000', icon: Phone },
                { label: 'Base_Coordinates', value: 'Global Operations / Digital Space', icon: MapPin },
              ].map((item) => (
                <div key={item.label} className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-sm border border-gray-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 group-hover:border-brand-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative bg-white dark:bg-[#050505] border border-gray-100 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl transition-all h-full min-h-[500px] flex flex-col">
              {/* Form Status Bar */}
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100 dark:border-white/5">
                 <div className="flex items-center gap-3">
                   <Calendar className="w-4 h-4 text-brand-primary" />
                   <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                     Inquiry Protocol: Strategy Call
                   </span>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
              </div>

              {status === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex-1 flex flex-col items-center justify-center py-16 text-center"
                 >
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                     <CheckCircle className="w-10 h-10 text-emerald-500" />
                   </div>
                   <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Signal Received.</h3>
                   <p className="text-gray-500 dark:text-gray-400 mb-10">Our architects will reach out within 24 hours to schedule your session.</p>
                   <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-10 py-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest hover:shadow-xl transition-all rounded-xl"
                    >
                      Send New Inquiry
                    </button>
                   </div>
                 </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        id="contact-name"
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-brand-primary transition-all"
                        placeholder="Operator Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        id="contact-email"
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-brand-primary transition-all"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="service-select" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Strategic_Focus</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select 
                          id="service-select"
                          className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-all font-mono text-xs [&>option]:text-black"
                        >
                          <option value="">SELECT MISSION TYPE</option>
                          <option value="dev">Software Engineering</option>
                          <option value="ads">Growth & Ads Optimization</option>
                          <option value="branding">Branding & Creative</option>
                          <option value="seo">SEO & Organic Growth</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget-select" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Capital_Allocation</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select 
                          id="budget-select"
                          className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-all font-mono text-xs [&>option]:text-black"
                        >
                          <option value="">SELECT BUDGET RANGE</option>
                          <option value="startup">&lt; $5,000</option>
                          <option value="growth">$5,000 - $15,000</option>
                          <option value="scale">$15,000 - $50,000</option>
                          <option value="enterprise">$50,000+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Mission Briefing</label>
                    <textarea 
                      required
                      id="contact-message"
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all font-mono text-sm resize-none"
                      placeholder="DESCRIBE YOUR CORE CHALLENGES..."
                    ></textarea>
                  </div>

                  <SubmitButton status={status} />
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
