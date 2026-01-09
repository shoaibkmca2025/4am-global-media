import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './components/AuthContext';
import { ArticleProvider } from './components/ArticleContext';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark text-gray-900 dark:text-white transition-colors duration-300 selection:bg-brand-primary selection:text-white">
      <CustomCursor />
      <div className="global-noise"></div>
      <BackgroundParticles />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isDashboard && <Navbar />}
        
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {!isDashboard && <Footer />}
      </div>
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