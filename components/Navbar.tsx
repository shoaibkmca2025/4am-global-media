
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Calendar, Zap, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MonkeyThemeToggle from './MonkeyThemeToggle';

const ConnectButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number;
    if (isHovered) {
      setStep(1);
      interval = window.setInterval(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 700);
    } else {
      setStep(0);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const steps = [
    { label: "Connect", icon: Zap },
    { label: "[SCANNING_SLOTS]", icon: Loader2, animate: true },
    { label: "[SYNCING_CALENDAR]", icon: Loader2, animate: true },
    { label: "READY_TO_LINK", icon: CheckCircle2 }
  ];

  const current = steps[step];

  return (
    <motion.button 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/contact')}
      className={`relative px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden min-w-[180px] flex items-center justify-center gap-3 ${
        isHovered 
        ? 'bg-brand-primary text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]' 
        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
      }`}
    >
      {/* 1. Border Beam Effect (The traveling light) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_70%,#ffffff_90%,transparent_100%)] opacity-40 mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Digital Scanline Overlay */}
      <AnimatePresence>
        {isHovered && step > 0 && step < 3 && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 3. Progress Background Fill */}
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 2.1, ease: "linear" }}
        className="absolute inset-0 bg-white/10 pointer-events-none z-0"
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -8, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.2, ease: "circOut" }}
          className="flex items-center gap-3 relative z-20"
        >
          {step === 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <current.icon className={`w-3.5 h-3.5 ${current.animate ? 'animate-spin' : ''}`} />}
          <span className="font-mono tracking-[0.2em]">{current.label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Pulsing signal ring on "Ready" */}
      {step === 3 && (
        <motion.div 
          className="absolute inset-0 border border-white/50 rounded-full"
          animate={{ scale: [1, 1.4], opacity: [1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  return (
    <div className={`fixed w-full z-50 px-6 pt-4 pointer-events-none transition-transform duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <motion.nav 
        animate={{ 
          y: 0,
          padding: scrolled ? "8px 24px" : "16px 40px",
          width: scrolled ? "auto" : "100%",
          maxWidth: scrolled ? "1000px" : "1200px"
        }}
        className={`mx-auto flex items-center justify-between glass rounded-full shadow-2xl pointer-events-auto transition-all duration-700 ease-[0.16, 1, 0.3, 1]`}
      >
        <Link 
          to="/" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
            <Rocket className="w-4 h-4 text-brand-primary relative z-10 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-sm font-display font-bold tracking-tighter text-slate-900 dark:text-white uppercase">4AM GLOBAL</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label}
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`magnetic-link text-[10px] font-bold transition-all uppercase tracking-[0.3em] ${
                location.pathname === item.href 
                ? 'text-brand-primary' 
                : 'text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />

          <div className="relative w-14 h-6 flex items-center justify-center">
            <div className="absolute top-[-34px]">
              <MonkeyThemeToggle compact={true} />
            </div>
          </div>
          
          <ConnectButton />
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
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 glass rounded-[2.5rem] p-10 flex flex-col gap-8 md:hidden pointer-events-auto shadow-3xl"
          >
             {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-2xl font-display font-bold text-slate-900 dark:text-white hover:text-brand-primary uppercase tracking-tighter"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full" />
            
            <div className="flex items-center justify-between py-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interface Theme</span>
              <MonkeyThemeToggle />
            </div>

            <button 
              onClick={() => {
                setIsOpen(false);
                navigate('/contact');
              }}
              className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl"
            >
              Book Strategy Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
