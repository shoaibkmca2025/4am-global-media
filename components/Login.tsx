import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, Loader2, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Handle immediate navigation on auth state change
  useEffect(() => {
    if (user) {
      // Use replace: true to prevent back-button loops
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // navigation is triggered by useEffect
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
       <div className="absolute inset-0 bg-radial-gradient from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-md bg-white dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
       >
         <div className="flex flex-col items-center mb-8">
           <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
             <Rocket className="w-6 h-6 text-brand-primary" />
           </div>
           <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Identity Check</h2>
           <p className="text-gray-500 text-sm">Secure access to 4AM Node</p>
         </div>

         {error && (
           <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center font-medium">
             {error}
           </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-5">
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Terminal ID (Email)</label>
             <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input 
                 type="email" 
                 autoComplete="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                 placeholder="name@example.com"
                 required
               />
             </div>
           </div>
           
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Passkey</label>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input 
                 type="password" 
                 autoComplete="current-password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                 placeholder="••••••••"
                 required
               />
             </div>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-primary/25 flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
           >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authorize Connection'}
           </button>
         </form>

         <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
           <p className="text-gray-500 text-sm">
             New to the network?{' '}
             <Link to="/register" className="text-brand-primary font-bold hover:underline">
               Register Node
             </Link>
           </p>
         </div>
       </motion.div>
    </div>
  );
};

export default Login;