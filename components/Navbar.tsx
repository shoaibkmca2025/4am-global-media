import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sun, Moon, User as UserIcon, Home } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      navigate(`/${href}`);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      const element = document.querySelector(href);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const isHome = location.pathname === '/';

  return (
    <div className="fixed w-full z-50 px-6 pt-6 pointer-events-none">
      <motion.nav 
        animate={{ 
          y: scrolled ? 0 : 0,
          padding: scrolled ? "12px 24px" : "16px 32px",
          width: scrolled ? "auto" : "100%",
          maxWidth: scrolled ? "900px" : "1200px"
        }}
        className={`mx-auto flex items-center justify-between glass rounded-full shadow-2xl pointer-events-auto transition-all duration-500 ease-[0.22, 1, 0.36, 1]`}
      >
        <Link 
          to="/" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
            <Rocket className="w-6 h-6 text-brand-primary relative z-10" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-slate-900 dark:text-white">4AM</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {isHome && NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white transition-all uppercase tracking-widest"
            >
              {item.label}
            </a>
          ))}

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />

          <button 
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-brand-primary/10 transition-colors text-slate-500 dark:text-slate-400 hover:text-brand-primary"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <Link 
              to="/dashboard" 
              className="px-6 py-2 rounded-full bg-brand-primary text-white font-bold text-xs hover:shadow-lg hover:shadow-brand-primary/30 transition-all flex items-center gap-2"
            >
              DASHBOARD
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:shadow-lg transition-all"
            >
              LOGIN
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 glass rounded-3xl p-8 flex flex-col gap-6 md:hidden pointer-events-auto shadow-3xl"
          >
             {isHome && NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xl font-display font-bold text-slate-900 dark:text-white hover:text-brand-primary"
              >
                {item.label}
              </a>
            ))}
            <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full" />
            <button onClick={toggleTheme} className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;