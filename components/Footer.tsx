import React from 'react';
import { Rocket, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const handleDummyClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-brand-primary" />
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">4AM Global Media</span>
          </div>
          
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 4AM Global Media. All rights reserved.
          </div>

          <div className="flex gap-4">
            <a href="#" onClick={handleDummyClick} className="p-2 bg-white/50 dark:bg-white/5 rounded-full hover:bg-brand-primary hover:text-white transition-all text-gray-500 dark:text-gray-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" onClick={handleDummyClick} className="p-2 bg-white/50 dark:bg-white/5 rounded-full hover:bg-brand-primary hover:text-white transition-all text-gray-500 dark:text-gray-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" onClick={handleDummyClick} className="p-2 bg-white/50 dark:bg-white/5 rounded-full hover:bg-brand-primary hover:text-white transition-all text-gray-500 dark:text-gray-400">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;