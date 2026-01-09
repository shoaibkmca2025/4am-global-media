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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#030303]">
        <div className="w-12 h-12 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
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
    { label: 'Uptime', count: '99.9%', icon: Activity, bg: 'bg-emerald-500/10', color: 'text-emerald-500' },
    { label: 'Software Sprints', count: '08', icon: Briefcase, bg: 'bg-blue-500/10', color: 'text-blue-500' },
    { label: 'Market Reach', count: '1.2M', icon: Zap, bg: 'bg-amber-500/10', color: 'text-amber-500' },
  ];

  const isRoot = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030303] flex text-gray-900 dark:text-white relative">
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-white dark:bg-[#080808] border-r border-gray-200 dark:border-white/5 z-[60] flex flex-col transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl hidden lg:block tracking-tight">4AM <span className="text-brand-primary">CORE</span></span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 hidden lg:block">Main Interface</p>
          {(menuItems || []).map((item) => {
            const active = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
                  active 
                  ? 'bg-brand-primary/10 text-brand-primary shadow-sm' 
                  : 'text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-primary' : ''}`} />
                <span className="font-bold text-sm hidden lg:block">{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/5">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 hidden lg:block">Tactical</p>
            {(secondaryMenu || []).map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
                    active 
                    ? 'bg-brand-primary/10 text-brand-primary shadow-sm' 
                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-primary' : ''}`} />
                  <span className="font-bold text-sm hidden lg:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-white/5">
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm hidden lg:block">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-20 lg:ml-64 min-h-screen transition-all duration-300">
        <header className="sticky top-0 z-[50] bg-[#F8FAFC]/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isRoot && (
              <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-brand-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Verified Node</span>
              <ChevronLeft className="w-3 h-3 rotate-180" />
              <span className="text-gray-900 dark:text-white">Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Go Home Desktop Button */}
            <Link 
              to="/" 
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-brand-primary bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 transition-all shadow-sm"
            >
              <Home className="w-4 h-4" />
              Back to Website
            </Link>

            <button onClick={toggleTheme} className="p-2.5 text-gray-400 hover:text-brand-primary bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 transition-all">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="p-2.5 text-gray-400 hover:text-brand-primary bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold truncate max-w-[120px]">{user?.name || 'Authorized Member'}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role || 'User'}</p>
              </div>
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=fallback`} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 p-0.5 bg-white dark:bg-white/5"
              />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10">
          <Routes>
            <Route index element={
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Node Command Center</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Global operations overview for node: {user?.email || 'N/A'}</p>
                  </div>
                  <button className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-white" />
                    Sync Resources
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(stats || []).map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 p-8 rounded-[2rem] shadow-sm group hover:border-brand-primary/50 transition-all"
                      >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <StatIcon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-4xl font-display font-bold">{stat.count}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="font-display font-bold text-xl">Operational History</h3>
                        <Link to="/dashboard/signals" className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">View All</Link>
                     </div>
                     <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group hover:bg-white dark:hover:bg-white/10 transition-all">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                                 <Radio className="w-5 h-5" />
                               </div>
                               <div>
                                 <p className="text-sm font-bold">Signal {i === 1 ? 'Optimization' : i === 2 ? 'Deploy' : 'Security'}</p>
                                 <p className="text-[10px] text-gray-500">2.4 hours ago // Cluster-Tokyo</p>
                               </div>
                             </div>
                             <ChevronLeft className="w-4 h-4 rotate-180 text-gray-300 group-hover:text-brand-primary transition-colors" />
                          </div>
                        ))}
                     </div>
                   </div>

                   <div className="bg-gradient-to-br from-brand-primary/20 via-brand-accent/5 to-transparent border border-brand-primary/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-primary/20">
                          <Rocket className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4">Ascend to <br/>Tier 2 Clearance</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xs">Access priority compute, advanced analytics, and tactical human support.</p>
                      </div>
                      <button className="mt-8 px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:scale-105 transition-all text-sm shadow-lg shadow-brand-primary/25">
                        Initialize Upgrade
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