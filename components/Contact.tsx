import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

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
    <section id="contact" className="py-24 relative">
       {/* Decorative gradient */}
       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white">Let's build<br />something great.</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Ready to take your brand to the next level? Our team of experts is ready to craft your success story.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium">Email Us</h4>
                  <a href="mailto:contact@4amglobal.media" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">contact@4amglobal.media</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium">Call Us</h4>
                  <span className="text-gray-500 dark:text-gray-400">+1 (555) 000-0000</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium">Headquarters</h4>
                  <span className="text-gray-500 dark:text-gray-400">Global Operations<br/>Digital Space</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative">
            {status === 'success' ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white/90 dark:bg-black/80 backdrop-blur-sm z-20">
                 <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                 <p className="text-gray-500 dark:text-gray-400 mt-2">We'll be in touch shortly.</p>
                 <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-gray-200 dark:bg-white/10 rounded-full hover:bg-gray-300 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                 >
                   Send another
                 </button>
               </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                  <input 
                    required 
                    type="text" 
                    id="name"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <input 
                    required 
                    type="email" 
                    id="email"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Interest</label>
                <select 
                  id="service"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors [&>option]:text-black"
                >
                  <option value="">Select a service...</option>
                  <option value="social">Social Media Growth</option>
                  <option value="dev">Web/App Development</option>
                  <option value="ads">SEO & Paid Ads</option>
                  <option value="crypto">Crypto Advisory</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-500 dark:text-gray-400">Message</label>
                <textarea 
                  required
                  id="message"
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Tell us about your project goals..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-brand-primary text-white font-bold py-4 rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;