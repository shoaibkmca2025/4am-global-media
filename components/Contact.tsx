
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
                <span className="text-brand-primary font-mono font-bold tracking-[0.5em] uppercase text-xs">05 // UPLINK_CENTER</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-gray-900 dark:text-white tracking-tighter uppercase transition-colors">
                Initialize <br /> Connection.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-medium leading-relaxed max-w-lg italic">
                Ready to engineer your growth? Transmit your data modules below and our core team will bridge the signal.
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
            
            <div className="relative bg-white dark:bg-[#050505] border border-gray-100 dark:border-white/5 p-8 md:p-12 rounded-sm shadow-2xl transition-all">
              {/* Form Status Bar */}
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100 dark:border-white/5">
                 <div className="flex items-center gap-3">
                   <Terminal className="w-4 h-4 text-brand-primary" />
                   <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">TRANSMISSION_STATUS: READY</span>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
              </div>

              {status === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center py-16 text-center"
                 >
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                     <CheckCircle className="w-10 h-10 text-emerald-500" />
                   </div>
                   <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Signal Received.</h3>
                   <p className="text-gray-500 dark:text-gray-400 mb-10">Data packets successfully merged with core servers.</p>
                   <button 
                    onClick={() => setStatus('idle')}
                    className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
                   >
                     Send New Signal
                   </button>
                 </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Name_Metadata</label>
                      <input 
                        required 
                        type="text" 
                        id="contact-name"
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-sm px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all font-mono text-sm"
                        placeholder="IDENTIFY YOURSELF"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Digital_Address</label>
                      <input 
                        required 
                        type="email" 
                        id="contact-email"
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-sm px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all font-mono text-sm"
                        placeholder="UPLINK@MAIL.NODE"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="service-select" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Selected_Module</label>
                    <select 
                      id="service-select"
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-sm px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-all font-mono text-sm [&>option]:text-black"
                    >
                      <option value="">SELECT PROTOCOL</option>
                      <option value="dev">CUSTOM SOFTWARE ENG</option>
                      <option value="ads">GROWTH & ADS MATRIX</option>
                      <option value="seo">SEO & CONTENT SIGNAL</option>
                      <option value="crypto">BLOCKCHAIN ADVISORY</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Request_Body</label>
                    <textarea 
                      required
                      id="contact-message"
                      rows={5}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-sm px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all font-mono text-sm resize-none"
                      placeholder="DESCRIBE YOUR OBJECTIVES..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="group relative w-full bg-brand-primary text-white font-bold py-6 rounded-sm transition-all overflow-hidden shadow-xl hover:shadow-brand-primary/40 active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gray-900 dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                    <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-sm group-hover:text-white dark:group-hover:text-black transition-colors">
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          Initiate Uplink
                          <Zap className="w-4 h-4 fill-current" />
                        </>
                      )}
                    </span>
                  </button>
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
