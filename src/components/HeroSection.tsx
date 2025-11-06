'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="inicio" 
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-16 sm:py-20 dark:bg-gradient-to-b dark:from-black dark:to-gray-900 light:bg-gradient-to-b light:from-white light:to-gray-100 dark:text-white light:text-gray-900 relative overflow-hidden"
    >
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-2 h-2 bg-orange-500/20 rounded-full animate-pulse"
          style={{
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            transition: 'all 0.3s ease'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-orange-500/30 rounded-full animate-pulse"
          style={{
            left: `${mousePosition.x * 0.2}px`,
            top: `${mousePosition.y * 0.2}px`,
            transition: 'all 0.5s ease'
          }}
        />
      </div>

      {/* Avatar on the left */}
      <div className={`flex-1 flex justify-center lg:justify-start z-10 mb-8 lg:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
        <div className="relative group">
          <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-orange-500 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/25 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-orange-500/50 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Content on the right */}
      <div className={`flex-1 text-center lg:text-left space-y-4 sm:space-y-6 z-10 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold dark:text-white light:text-gray-900">
          {t.hero.title}
        </h1>
        
        <p className="text-sm sm:text-lg lg:text-xl dark:text-white light:text-gray-700 font-medium max-w-2xl mx-auto lg:mx-0">
          {t.hero.subtitle}
        </p>

        <div className="space-y-2 sm:space-y-3 dark:text-white light:text-gray-700">
          <p className="text-sm sm:text-base lg:text-lg">{t.hero.bullet1}</p>
          <p className="text-sm sm:text-base lg:text-lg">{t.hero.bullet2}</p>
        </div>

        {/* Button and social media */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button 
            onClick={() => {
              const element = document.getElementById('contacto');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 w-full sm:w-auto"
          >
            {t.hero.contactMe}
          </button>
          
          {/* Social media */}
          <div className="flex gap-3 sm:gap-4">
            <a href="mailto:cristian@example.com" className="w-8 h-8 sm:w-10 sm:h-10 dark:bg-white light:bg-gray-200 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 hover:scale-110">
            </a>
            <a href="https://instagram.com/cristian" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 dark:bg-white light:bg-gray-200 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 hover:scale-110">
            </a>
            <a href="https://linkedin.com/in/cristian" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 dark:bg-white light:bg-gray-200 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 hover:scale-110">
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

