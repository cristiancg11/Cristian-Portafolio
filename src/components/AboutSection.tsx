'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('acerca-de-mi');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="acerca-de-mi" 
      className="min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gradient-to-b from-gray-100 to-white dark:text-white text-gray-900 py-12 sm:py-16 relative overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            {t.about.title}
          </h1>
        </div>

        <div className={`dark:bg-gray-800/80 bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-700/50 dark:border-gray-700 border-gray-200 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg lg:text-xl dark:text-gray-300 text-gray-700 leading-relaxed text-center sm:text-left">
              {t.about.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

