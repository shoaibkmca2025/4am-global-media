
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ServicesPage from './components/ServicesPage';
import ServiceDetail from './components/ServiceDetail';
import WorkPage from './components/WorkPage';
import InsightsPage from './components/InsightsPage';
import ContactPage from './components/ContactPage';
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
  return (
    <div className="min-h-screen transition-colors duration-300 selection:bg-brand-primary selection:text-white">
      <CustomCursor />
      <ScrollIndicator />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-1 flex flex-col pt-20">
          {children}
        </div>

        <Footer />
      </div>
      
      <AIChatbot />
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
                <Route path="/work" element={<WorkPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/contact" element={<ContactPage />} />
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
