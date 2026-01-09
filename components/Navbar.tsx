import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sun, Moon, User as UserIcon, Home } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="absolute inset-0 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5" 
           style={{ opacity: scrolled ? 1 : 0, pointerEvents: 'none' }} />
      
      <div className="container mx-auto px-6 relative z-50">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity rounded-full"></div>
              <Rocket className="w-8 h-8 text-brand-dark dark:text-white relative z-10 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-dark via-brand-primary to-brand-accent dark:from-white dark:via-brand-primary dark:to-brand-accent">
                4AM
              </span>
              <span className="text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">Global Media</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!isHome && (
              <Link 
                to="/"
                className="text-sm font-bold text-brand-primary flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            )}

            {isHome && NAV_ITEMS.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all hover:after:w-full cursor-pointer px-2 py-1"
              >
                {item.label}
              </a>
            ))}

            <button 
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <Link 
                to="/dashboard" 
                className="px-5 py-2.5 rounded-full bg-brand-primary text-white font-semibold text-sm hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="px-5 py-2.5 rounded-full bg-brand-dark dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-105 transition-transform duration-200 cursor-pointer inline-block"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-900 dark:text-white p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors relative z-50"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-gray-50/95 dark:bg-brand-dark/95 backdrop-blur-xl z-40 transition-transform duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-display font-medium text-gray-900 dark:text-white hover:text-brand-primary transition-colors flex items-center gap-3"
            >
              <Home className="w-6 h-6 text-brand-primary" />
              Home
            </Link>
         {isHome && NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl font-display font-medium text-gray-900 dark:text-white hover:text-brand-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link 
            to={user ? "/dashboard" : "/login"}
            onClick={() => setIsOpen(false)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-lg"
          >
            {user ? "Dashboard" : "Login"}
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;