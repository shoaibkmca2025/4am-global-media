
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Philosophy from './Philosophy';
import Process from './Process';
import Projects from './Projects';
import Articles from './Articles';
import NetworkMarquee from './NetworkMarquee';
import Contact from './Contact';

const LandingPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Delay slightly to ensure layout is complete
        timeoutId = setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <main>
      <Hero />
      <Philosophy />
      <Process />
      <Projects />
      <Articles />
      <NetworkMarquee />
      <Contact />
    </main>
  );
};

export default LandingPage;
