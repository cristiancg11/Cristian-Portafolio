'use client';

import { useState, useEffect } from 'react';

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
      title: "Curso de Git y GitHub",
      description: "Aprendí el control de versiones, creación de repositorios, manejo de ramas y colaboración en proyectos a través de GitHub. Dominé conceptos como commits, pull requests, merge y workflow de desarrollo colaborativo.",
      image: "/git-github.png",
      platform: "Platzi"
    },
    {
      id: 2,
      title: "Fundamentos de Programación",
      description: "Adquirí conocimientos sólidos en lógica de programación, variables, estructuras de control, algoritmos y fundamentos de programación orientada a objetos. Base esencial para el desarrollo de software.",
      image: "/programming.png",
      platform: "Platzi"
    },
    {
      id: 3,
      title: "MySQL Workbench",
      description: "Aprendí diseño de bases de datos, creación de tablas, consultas SQL, índices y optimización. Manejo de información estructurada y relaciones entre entidades para aplicaciones web robustas.",
      image: "/mysql.png",
      platform: "Platzi"
    }
  ];

  return (
    <section id="experiencias" className="min-h-screen dark:bg-black light:bg-white dark:text-white light:text-gray-900 py-8 sm:py-12 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Carrusel de la izquierda */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`dark:bg-gray-800 light:bg-gray-100 rounded-xl p-3 sm:p-4 transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700 light:border-gray-300 hover:border-orange-500/50 ${
                      activeCard === exp.id ? 'scale-105 shadow-2xl border-orange-500/50' : ''
                    }`}
                    onMouseEnter={() => setActiveCard(exp.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className="dark:bg-gray-700 light:bg-gray-200 rounded-lg h-24 sm:h-28 lg:h-32 mb-3 sm:mb-4 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl lg:text-4xl">📚</span>
                    </div>
                    <button className="w-full dark:bg-gray-900 light:bg-gray-300 dark:text-white light:text-gray-900 dark:hover:bg-gray-800 light:hover:bg-gray-400 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm">
                      {exp.title}
                    </button>
                  </div>
              ))}
            </div>
            
            {/* Indicadores de navegación */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button className="dark:text-white light:text-gray-900 hover:text-orange-500 transition-colors duration-300 text-lg sm:text-xl">
                ←
              </button>
              <div className="flex gap-2">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      activeCard === index ? 'bg-orange-500' : 'dark:bg-gray-600 light:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button className="dark:text-white light:text-gray-900 hover:text-orange-500 transition-colors duration-300 text-lg sm:text-xl">
                →
              </button>
            </div>
            
            <div className="text-center mt-3 sm:mt-4">
              <span className="text-orange-500 font-semibold text-sm sm:text-base">Platzi</span>
            </div>
          </div>

          {/* Descripción de la derecha */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white light:text-gray-900 text-center lg:text-left">
              Experiencias en Formación
            </h1>
            
            <div className="space-y-4 sm:space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`transition-all duration-500 ${
                    activeCard === exp.id ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-orange-500 mb-2 sm:mb-3 text-center lg:text-left">
                    {exp.title}
                  </h2>
                  <p className="dark:text-gray-300 light:text-gray-600 leading-relaxed text-sm sm:text-base text-center lg:text-left">
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

