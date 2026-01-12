
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sun, Moon, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserMenu from './UserMenu';
import MonkeyThemeToggle from './MonkeyThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
      return;
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="fixed w-full z-50 px-6 pt-4 pointer-events-none">
      <motion.nav 
        animate={{ 
          y: 0,
          padding: scrolled ? "6px 20px" : "8px 32px",
          width: scrolled ? "auto" : "100%",
          maxWidth: scrolled ? "900px" : "1100px"
        }}
        className={`mx-auto flex items-center justify-between glass rounded-full shadow-2xl pointer-events-auto transition-all duration-500 ease-[0.22, 1, 0.36, 1]`}
      >
        <Link 
          to="/" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
            <Rocket className="w-4 h-4 text-brand-primary relative z-10" />
          </div>
          <span className="text-base font-display font-bold tracking-tighter text-slate-900 dark:text-white">4AM</span>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label}
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-[9px] font-bold transition-all uppercase tracking-[0.2em] ${
                location.pathname === item.href 
                ? 'text-brand-primary' 
                : 'text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

          {/* Animated Monkey Toggle - Positioned to not expand header height */}
          <div className="relative w-14 h-6 flex items-center justify-center">
            <div className="absolute top-[-34px]">
              <MonkeyThemeToggle compact={true} />
            </div>
          </div>

          {user ? (
            <div className="relative ml-2">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 bg-emerald-100/30 dark:bg-emerald-500/10 rounded-full border border-emerald-500/20 group hover:border-emerald-500/40 transition-all"
              >
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt="" 
                  className="w-7 h-7 rounded-full border border-white/20 shadow-sm bg-emerald-600"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-bold text-slate-900 dark:text-white truncate max-w-[80px] leading-tight">
                    {user.name}
                  </span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <UserMenu 
                user={user} 
                isOpen={isUserMenuOpen} 
                onClose={() => setIsUserMenuOpen(false)} 
                onLogout={handleLogout}
              />
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-5 py-1.5 ml-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-[9px] hover:shadow-lg transition-all"
            >
              LOGIN
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white pointer-events-auto p-2">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 glass rounded-[2.5rem] p-6 flex flex-col gap-5 md:hidden pointer-events-auto shadow-3xl"
          >
             {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-base font-display font-bold text-slate-900 dark:text-white hover:text-brand-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full" />
            
            <div className="flex items-center justify-center py-4">
              <MonkeyThemeToggle />
            </div>

            {user && (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 text-rose-500 font-bold uppercase tracking-widest text-[9px]"
              >
                Logout Account
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
