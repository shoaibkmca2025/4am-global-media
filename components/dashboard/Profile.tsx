import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Save, Loader2, User, Mail, Camera, MapPin, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    jobTitle: '',
    location: '',
    phone: '',
    website: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: String(user.name || ''),
        bio: String(user.bio || ''),
        jobTitle: String(user.jobTitle || ''),
        location: String(user.location || ''),
        phone: String(user.phone || ''),
        website: String(user.website || '')
      });
    }
  }, [user]);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Profile sync failure:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Identity Hub</h2>
        <p className="text-gray-500 dark:text-gray-400">Configure your global professional uplink settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center sticky top-24">
            <div className="relative inline-block mb-4">
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`} 
                alt="Profile" 
                className="w-32 h-32 rounded-full bg-gray-100 dark:bg-white/10 border-4 border-white dark:border-white/5 shadow-xl"
              />
              <button className="absolute bottom-1 right-1 p-2.5 bg-brand-primary text-white rounded-full hover:scale-110 transition-transform shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{formData.name || 'Startup Architect'}</h3>
            <p className="text-brand-primary font-medium text-sm mt-1">{formData.jobTitle || 'Verified Member'}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
               <div className="flex items-center gap-3 text-xs text-gray-500 font-medium truncate">
                 <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                 {user?.email || 'N/A'}
               </div>
               <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                 <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                 {formData.location || 'Global Operations'}
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 space-y-8 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/5">
                  <User className="w-4 h-4 text-brand-primary" />
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Metadata</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Display Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Functional Role</label>
                    <input 
                      type="text" 
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="e.g. Lead Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Professional Bio</label>
                  <textarea 
                    rows={5}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="Briefly describe your expertise..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                   <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Uplink URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="url" 
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                        placeholder="https://4amglobal.media"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                <AnimatePresence>
                  {success && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-500 font-bold text-sm">
                      <Sparkles className="w-5 h-5" /> Node Identity Updated
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="ml-auto px-10 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all flex items-center gap-3 shadow-lg shadow-brand-primary/30 active:scale-95 disabled:opacity-50 font-display"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Deploy Identity Updates
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;