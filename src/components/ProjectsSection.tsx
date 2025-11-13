'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
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

    const element = document.getElementById('proyectos');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      icon: "",
      title: "MatchInsight",
      subtitle: t.projects.matchAnalyzer,
      description: t.projects.matchDescription,
      keywords: ["Soccer", "data analysis", "visualization", "charts"],
      image: "/matchinsight-preview.png",
      status: t.projects.inDevelopment
    },
    {
      id: 2,
      icon: "",
      title: "FinTrack",
      subtitle: t.projects.personalExpenseControl,
      description: t.projects.finTrackDescription,
      keywords: ["Personal finance", "organization", "reports", "productivity"],
      image: "/fintrack-preview.png",
      status: t.projects.completed
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="proyectos" className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 flex items-center py-8 sm:py-12 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 text-center lg:text-left">
              {t.projects.title}
            </h1>
            
            <div className="space-y-4 sm:space-y-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-500 ${
                    currentProject === index ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold dark:text-white text-gray-900">{project.title}</h2>
                      <p className="text-orange-500 font-semibold text-sm sm:text-base">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="dark:text-gray-300 text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {project.keywords.map((keyword, keyIndex) => (
                      <div key={keyIndex} className="flex items-center gap-1 text-orange-500 text-xs sm:text-sm">
                        <span>→</span>
                        <span>{keyword}</span>
                      </div>
                    ))}
                  </div>

                  {/* See More button */}
                  <div className="mb-4">
                    <Link href={`/proyectos/${project.title === 'MatchInsight' ? 'matchinsight' : 'fintrack'}`}>
                      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 text-sm">
                        {t.projects.seeMore} →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={prevProject}
                className="group relative px-4 sm:px-6 py-2 sm:py-3 dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-300 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">{t.projects.previous}</span>
              </button>
              <button
                onClick={nextProject}
                className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 text-sm sm:text-base overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">{t.projects.next}</span>
              </button>
            </div>
          </div>

          {/* Right carousel */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`group relative dark:bg-gray-800 bg-gray-100 rounded-xl p-3 sm:p-4 transition-all duration-500 cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-500 ${
                      currentProject === index ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                    }`}
                    onClick={() => scrollToSection('proyectos')}
                  >
                    {/* Orange gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="dark:bg-gray-700 bg-gray-200 rounded-lg h-32 sm:h-40 lg:h-48 mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
                      </div>
                      <button className="w-full dark:bg-gray-900 bg-gray-300 dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-400 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm group-hover:bg-orange-500 group-hover:text-black group-hover:font-bold">
                        {project.title}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation indicators */}
              <div className="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button onClick={prevProject} className="group dark:text-white text-gray-900 hover:text-orange-500 transition-all duration-300 text-lg sm:text-xl hover:scale-110">
                  <span className="group-hover:drop-shadow-lg">←</span>
                </button>
                <div className="flex gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProject(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        currentProject === index ? 'bg-orange-500 shadow-lg shadow-orange-500/50' : 'dark:bg-gray-600 bg-gray-400 hover:bg-orange-400'
                      }`}
                    />
                  ))}
                </div>
                <button onClick={nextProject} className="group dark:text-white text-gray-900 hover:text-orange-500 transition-all duration-300 text-lg sm:text-xl hover:scale-110">
                  <span className="group-hover:drop-shadow-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

