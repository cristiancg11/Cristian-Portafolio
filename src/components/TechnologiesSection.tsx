'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TechnologiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
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
      icon: "",
      detailedDescription: "JavaScript is a versatile programming language used for creating interactive web applications. TypeScript adds static typing to JavaScript, improving code quality and developer experience. Python is a powerful language known for its simplicity and versatility, used in web development, data science, and automation."
    },
    {
      id: 2,
      title: t.technologies.frameworks,
      description: t.technologies.frameworksDesc,
      items: ["Next.js", "React", "TailwindCSS"],
      icon: "",
      detailedDescription: "Next.js is a React framework that enables server-side rendering and static site generation for optimal performance. React is a JavaScript library for building user interfaces with component-based architecture. TailwindCSS is a utility-first CSS framework that allows rapid UI development with pre-built classes."
    },
    {
      id: 3,
      title: t.technologies.tools,
      description: t.technologies.toolsDesc,
      items: ["Git", "GitHub", "Figma", "VS Code"],
      icon: "",
      detailedDescription: "Git is a distributed version control system for tracking changes in code. GitHub is a platform for hosting and collaborating on Git repositories. Figma is a collaborative design tool for creating user interfaces and prototypes. VS Code is a powerful code editor with extensive extensions and debugging capabilities."
    },
    {
      id: 4,
      title: t.technologies.stylesDesign,
      description: t.technologies.stylesDesc,
      items: ["CSS3", "SASS", "Figma", "Adobe XD"],
      icon: "",
      detailedDescription: "CSS3 provides advanced styling capabilities including animations, transitions, and responsive design features. SASS is a CSS preprocessor that adds variables, nesting, and mixins for more maintainable stylesheets. Figma and Adobe XD are design tools for creating and prototyping user interfaces before development."
    }
  ];

  useEffect(() => {
    // Set first technology as selected by default
    if (technologies.length > 0 && selectedTech === null) {
      setSelectedTech(technologies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextTech = () => {
    const nextIndex = (currentTechIndex + 1) % technologies.length;
    setCurrentTechIndex(nextIndex);
    setSelectedTech(technologies[nextIndex].id);
  };

  const prevTech = () => {
    const prevIndex = (currentTechIndex - 1 + technologies.length) % technologies.length;
    setCurrentTechIndex(prevIndex);
    setSelectedTech(technologies[prevIndex].id);
  };

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
          {/* Technologies grid with navigation */}
          <div className="relative">
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {technologies.map((tech, index) => (
              <div
                key={tech.id}
                onClick={() => setSelectedTech(tech.id)}
                className={`group relative dark:bg-gray-800 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-500 dark:border-gray-700 border-gray-300 overflow-hidden cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${
                  selectedTech === tech.id ? 'ring-2 ring-violet-600 scale-105' : 'hover:scale-105'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTech(tech.id);
                  }
                }}
                aria-label={`Select ${tech.title}`}
              >
                
                <div className="relative z-10">
                  <div className="text-center mb-3">
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold dark:text-white text-gray-900 group-hover:text-violet-600 transition-colors duration-300">
                      {tech.title}
                    </h3>
                  </div>
                  
                  <p className="dark:text-gray-300 text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed text-center">
                    {tech.description}
                  </p>
                  
                  <div className="space-y-2">
                    {tech.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        role="button"
                        aria-label={item}
                        className="w-full bg-violet-600 text-black font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
              <button 
                onClick={prevTech}
                className="group relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 hover:bg-violet-600 hover:text-black transition-all duration-300 hover:scale-110 rounded-xl shadow-lg hover:shadow-xl hover:shadow-violet-600/25 border-2 border-transparent hover:border-violet-600/50 overflow-hidden"
                aria-label="Previous technology"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-violet-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-3xl sm:text-4xl font-bold">←</span>
              </button>
              <div className="flex gap-2">
                {technologies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTechIndex(index);
                      setSelectedTech(technologies[index].id);
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      currentTechIndex === index ? 'bg-violet-600 shadow-lg shadow-violet-600/50' : 'dark:bg-gray-600 bg-gray-400 hover:bg-violet-500'
                    }`}
                    aria-label={`Go to technology ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTech}
                className="group relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 hover:bg-violet-600 hover:text-black transition-all duration-300 hover:scale-110 rounded-xl shadow-lg hover:shadow-xl hover:shadow-violet-600/25 border-2 border-transparent hover:border-violet-600/50 overflow-hidden"
                aria-label="Next technology"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-violet-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-3xl sm:text-4xl font-bold">→</span>
              </button>
            </div>
          </div>

          {/* Description panel */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="group relative dark:bg-gray-800 bg-gray-100 rounded-xl p-6 sm:p-8 h-64 sm:h-80 lg:h-96 flex items-center justify-center overflow-hidden border-2 border-violet-600/30 transition-all duration-300">
              {/* Orange gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-violet-700/10 transition-opacity duration-300" />
              
              <div className="relative text-center px-4">
                {selectedTech ? (
                  <>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-violet-600 mb-4 transition-colors duration-300">
                      {technologies.find(t => t.id === selectedTech)?.title}
                    </div>
                    <div className="dark:text-gray-300 text-gray-600 text-sm sm:text-base leading-relaxed transition-colors duration-300">
                      {technologies.find(t => t.id === selectedTech)?.detailedDescription}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-violet-600 mb-2 transition-colors duration-300">{t.technologies.webDevelopment}</div>
                    <div className="dark:text-gray-300 text-gray-600 text-sm sm:text-base transition-colors duration-300">{t.technologies.webDevelopmentDesc}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

