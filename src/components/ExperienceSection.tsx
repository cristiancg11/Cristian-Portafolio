'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number>(0);
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

    const element = document.getElementById('experiencias');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      id: 1,
      title: t.experience.gitTitle,
      description: t.experience.gitDescription,
      image: "/git-github.png",
      platform: "Platzi"
    },
    {
      id: 2,
      title: t.experience.programmingTitle,
      description: t.experience.programmingDescription,
      image: "/programming.png",
      platform: "Platzi"
    },
    {
      id: 3,
      title: t.experience.mysqlTitle,
      description: t.experience.mysqlDescription,
      image: "/mysql.png",
      platform: "Platzi"
    }
  ];

  return (
    <section id="experiencias" className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 py-8 sm:py-12 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left carousel */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`dark:bg-gray-800 bg-gray-100 rounded-xl p-3 sm:p-4 transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700 border-gray-300 hover:border-violet-600/50 cursor-pointer ${
                      activeCard === index ? 'scale-105 shadow-2xl border-violet-600/50 ring-2 ring-violet-600' : ''
                    }`}
                    onClick={() => setActiveCard(index)}
                  >
                    <div className="dark:bg-gray-700 bg-gray-200 rounded-lg h-24 sm:h-28 lg:h-32 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
                      {exp.image ? (
                        <Image
                          src={exp.image}
                          alt={exp.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="text-violet-600 text-2xl font-bold">{exp.title.charAt(0)}</div>
                      )}
                    </div>
                    <button className="w-full dark:bg-gray-900 bg-gray-300 dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-400 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm">
                      {exp.title}
                    </button>
                  </div>
              ))}
            </div>
            
            {/* Navigation indicators */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button 
                onClick={() => setActiveCard((prev) => (prev - 1 + experiences.length) % experiences.length)}
                className="dark:text-white text-gray-900 hover:text-violet-600 transition-colors duration-300 text-lg sm:text-xl hover:scale-110"
                aria-label="Previous experience"
              >
                ←
              </button>
              <div className="flex gap-2">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      activeCard === index ? 'bg-violet-600 shadow-lg shadow-violet-600/50' : 'dark:bg-gray-600 bg-gray-400 hover:bg-violet-500'
                    }`}
                    aria-label={`Go to experience ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveCard((prev) => (prev + 1) % experiences.length)}
                className="dark:text-white text-gray-900 hover:text-violet-600 transition-colors duration-300 text-lg sm:text-xl hover:scale-110"
                aria-label="Next experience"
              >
                →
              </button>
            </div>
            
            <div className="text-center mt-3 sm:mt-4">
              <span className="text-violet-600 font-semibold text-sm sm:text-base">Platzi</span>
            </div>
          </div>

          {/* Right description */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 text-center lg:text-left">
              {t.experience.title}
            </h1>
            
            <div className="space-y-4 sm:space-y-6 relative min-h-[200px]">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`transition-all duration-500 ${
                    activeCard === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-violet-600 mb-2 sm:mb-3 text-center lg:text-left">
                    {exp.title}
                  </h2>
                  <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-sm sm:text-base text-center lg:text-left">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

