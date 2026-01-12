
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ServicesPage from './components/ServicesPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ServiceDetail from './components/ServiceDetail';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import AIChatbot from './components/AIChatbot';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './components/AuthContext';
import { ArticleProvider } from './components/ArticleContext';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[200] origin-left"
      style={{ scaleX }}
    />
  );
};

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen transition-colors duration-300 selection:bg-brand-primary selection:text-white">
      <CustomCursor />
      {!isDashboard && <ScrollIndicator />}
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isDashboard && <Navbar />}
        
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {!isDashboard && <Footer />}
      </div>
      
      {!isDashboard && <AIChatbot />}
      <BackgroundParticles />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <ArticleProvider>
          <ThemeProvider>
            <LayoutWrapper>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </LayoutWrapper>
          </ThemeProvider>
        </ArticleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
