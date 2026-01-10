
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Briefcase, Activity, FileText, 
  User, Bell, ChevronLeft, 
  Zap, Rocket, LogOut,
  LayoutGrid, Sun, Moon, ArrowLeft,
  HelpCircle, FileCode, Radio, Home
} from 'lucide-react';
import { motion } from 'framer-motion';
import Profile from './dashboard/Profile';
import MyArticles from './dashboard/MyArticles';
import CVBuilder from './dashboard/CVBuilder';
import SignalLog from './dashboard/SignalLog';
import Support from './dashboard/Support';
import Docs from './dashboard/Docs';
import { useTheme } from './ThemeContext';

const Dashboard: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-brand-dark">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const menuItems = [
    { label: 'Overview', icon: LayoutGrid, path: '/dashboard' },
    { label: 'Publishing', icon: FileText, path: '/dashboard/publishing' },
    { label: 'CV Architect', icon: FileCode, path: '/dashboard/cv' },
    { label: 'Signal Stream', icon: Radio, path: '/dashboard/signals' },
    { label: 'Identity', icon: User, path: '/dashboard/profile' },
  ];

  const secondaryMenu = [
    { label: 'Public Website', icon: Home, path: '/' },
    { label: 'Library', icon: Briefcase, path: '/dashboard/docs' },
    { label: 'Support', icon: HelpCircle, path: '/dashboard/support' },
  ];

  const stats = [
    { label: 'Uptime', count: '99.9%', icon: Activity, gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Sprints', count: '08', icon: Briefcase, gradient: 'from-brand-primary to-indigo-600' },
    { label: 'Reach', count: '1.2M', icon: Zap, gradient: 'from-brand-accent to-pink-500' },
  ];

  const isRoot = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-transparent flex text-slate-900 dark:text-white relative font-sans">
      {/* Sidebar - Floating Glass */}
      <aside className="fixed left-6 top-6 bottom-6 w-20 lg:w-72 glass rounded-[2.5rem] z-[60] flex flex-col shadow-2xl transition-all duration-500 border border-white/40 dark:border-white/5">
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/30">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl hidden lg:block tracking-tighter">4AM <span className="text-brand-primary">CORE</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          <p className="px-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 hidden lg:block opacity-60">Operations</p>
          {menuItems.map((item) => {
            const active = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group ${
                  active 
                  ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/25' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-brand-primary/5 hover:text-brand-primary'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0`} />
                <span className="font-bold text-sm hidden lg:block tracking-tight">{item.label}</span>
                {active && <motion.div layoutId="nav-pill" className="absolute left-0 w-1 h-6 bg-white rounded-full lg:hidden" />}
              </Link>
            );
          })}

          <div className="pt-8 mt-8 border-t border-slate-100 dark:border-white/5">
            <p className="px-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 hidden lg:block opacity-60">System</p>
            {secondaryMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-bold text-sm hidden lg:block tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-6">
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-5 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden lg:block">TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-32 lg:ml-80 mr-6 py-6 min-h-screen transition-all duration-500">
        {/* Header - Floating Pill */}
        <header className="sticky top-0 z-[50] glass rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-xl mb-12 border border-white/50 dark:border-white/5">
          <div className="flex items-center gap-6">
            {!isRoot && (
              <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-brand-primary transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">NODE_UPLINK: ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <button onClick={toggleTheme} className="p-3 text-slate-500 hover:text-brand-primary transition-all">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="relative">
              <button className="p-3 text-slate-500 hover:text-brand-primary transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-brand-primary rounded-full border-2 border-white dark:border-brand-obsidian"></span>
              </button>
            </div>

            <div className="h-8 w-[1px] bg-slate-100 dark:bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-display font-bold">{user?.name || 'Architect'}</p>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{user?.role || 'Operator'}</p>
              </div>
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`} 
                alt="Avatar" 
                className="w-12 h-12 rounded-2xl border-2 border-white dark:border-white/10 shadow-lg bg-white dark:bg-white/5"
              />
            </div>
          </div>
        </header>

        <div className="relative z-10 px-4">
          <Routes>
            <Route index element={
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                  <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tighter uppercase">Command <br/> Center.</h1>
                    <p className="text-slate-500 font-medium text-lg">Managing operations for <span className="text-brand-primary font-bold">{user?.email}</span></p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full shadow-2xl transition-all flex items-center gap-3 uppercase text-xs tracking-widest"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Synchronize Node
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-[2.5rem] p-10 border border-white/50 dark:border-white/5 group hover:shadow-2xl transition-all duration-500"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                      <p className="text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">{stat.count}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div className="glass rounded-[3rem] p-10 border border-white/50 dark:border-white/5">
                     <div className="flex justify-between items-center mb-10">
                        <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Signal History</h3>
                        <Link to="/dashboard/signals" className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest hover:underline">View All Logs</Link>
                     </div>
                     <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-white dark:border-white/5 group hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer">
                             <div className="flex items-center gap-6">
                               <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                                 <Radio className="w-5 h-5" />
                               </div>
                               <div>
                                 <p className="text-base font-bold text-slate-900 dark:text-white">Module {i === 1 ? 'Optimization' : i === 2 ? 'Deploy' : 'Security'} Sync</p>
                                 <p className="text-xs text-slate-400 font-mono">NODE_TKY_0{i} // 02:44:11</p>
                               </div>
                             </div>
                             <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 group-hover:text-brand-primary transition-colors" />
                          </div>
                        ))}
                     </div>
                   </div>

                   <div className="bg-gradient-to-br from-brand-primary via-indigo-600 to-brand-accent rounded-[3rem] p-12 text-white flex flex-col justify-between shadow-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] group-hover:blur-[80px] transition-all" />
                      <div>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 shadow-xl">
                          <Rocket className="w-8 h-8" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tighter leading-[0.9] uppercase">Ascend to <br/>clearance_2.</h3>
                        <p className="text-white/80 font-medium text-lg max-w-xs">Access priority compute, private clusters, and 24/7 technical oversight.</p>
                      </div>
                      <button className="mt-12 px-12 py-5 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all text-xs tracking-widest shadow-2xl">
                        INITIALIZE UPGRADE
                      </button>
                   </div>
                </div>
              </div>
            } />
            <Route path="profile" element={<Profile />} />
            <Route path="publishing" element={<MyArticles />} />
            <Route path="cv" element={<CVBuilder />} />
            <Route path="signals" element={<SignalLog />} />
            <Route path="support" element={<Support />} />
            <Route path="docs" element={<Docs />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
