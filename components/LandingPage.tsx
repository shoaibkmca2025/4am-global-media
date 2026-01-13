
import React from 'react';
import Hero from './Hero';
import Philosophy from './Philosophy';
import TargetAudience from './TargetAudience';
import Services from './Services';
import Projects from './Projects';
import Articles from './Articles';
import NetworkMarquee from './NetworkMarquee';
import Contact from './Contact';
import ROICalculator from './ROICalculator';
import QuickAudit from './QuickAudit';

const LandingPage: React.FC = () => {
  return (
    <main>
      <Hero />
      
      {/* Quick Audit sits over the Hero transition */}
      <div className="container mx-auto px-6 -mt-24 relative z-50">
        <QuickAudit />
      </div>

      <Philosophy />
      
      <ROICalculator />

      <div id="services">
        <Services />
      </div>

      <TargetAudience />

      <div id="projects">
        <Projects />
      </div>

      <Articles />
      
      <NetworkMarquee />
      
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
};

export default LandingPage;
