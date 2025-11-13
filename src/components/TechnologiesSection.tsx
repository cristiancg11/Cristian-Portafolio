'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TechnologiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('tecnologias');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const technologies = [
    {
      id: 1,
      title: t.technologies.languages,
      description: t.technologies.languagesDesc,
      items: ["JavaScript (JS)", "TypeScript (TS)", "Python"],
      icon: ""
    },
    {
      id: 2,
      title: t.technologies.frameworks,
      description: t.technologies.frameworksDesc,
      items: ["Next.js", "React", "TailwindCSS"],
      icon: ""
    },
    {
      id: 3,
      title: t.technologies.tools,
      description: t.technologies.toolsDesc,
      items: ["Git", "GitHub", "Figma", "VS Code"],
      icon: ""
    },
    {
      id: 4,
      title: t.technologies.stylesDesign,
      description: t.technologies.stylesDesc,
      items: ["CSS3", "SASS", "Figma", "Adobe XD"],
      icon: ""
    }
  ];

  return (
    <section id="tecnologias" className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 py-8 sm:py-12 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            {t.technologies.title}
          </h1>
          <p className="text-lg sm:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
            {t.technologies.subtitle}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Technologies grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {technologies.map((tech, index) => (
              <div
                key={tech.id}
                className={`group relative dark:bg-gray-800 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700 border-gray-300 hover:border-orange-500 cursor-pointer overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => scrollToSection('tecnologias')}
                onMouseEnter={() => setHoveredCard(tech.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Orange gradient effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  hoveredCard === tech.id ? 'opacity-100' : ''
                }`} />
                
                {/* Animated orange border */}
                <div className={`absolute inset-0 rounded-xl border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  hoveredCard === tech.id ? 'opacity-100' : ''
                }`} />
                
                <div className="relative z-10">
                  <div className="text-center mb-3">
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold dark:text-white text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                      {tech.title}
                    </h3>
                  </div>
                  
                  <p className="dark:text-gray-300 text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed text-center">
                    {tech.description}
                  </p>
                  
                  <div className="space-y-2">
                    {tech.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 text-xs sm:text-sm"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3D illustration */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="group relative dark:bg-gray-800 bg-gray-100 rounded-xl p-6 sm:p-8 h-64 sm:h-80 lg:h-96 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all duration-300"
                 onClick={() => scrollToSection('tecnologias')}>
              {/* Orange gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
                <div className="relative text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-500 mb-2 group-hover:text-orange-400 transition-colors duration-300">{t.technologies.webDevelopment}</div>
                <div className="dark:text-gray-300 text-gray-600 text-sm sm:text-base group-hover:text-orange-300 transition-colors duration-300">{t.technologies.webDevelopmentDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

