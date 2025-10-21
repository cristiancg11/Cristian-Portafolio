'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TechnologiesPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const technologies = [
    {
      id: 1,
      title: "LENGUAJES",
      description: "Lenguajes de programación para la lógica e interacción de aplicaciones web modernas.",
      items: ["JavaScript (JS)", "TypeScript (TS)", "Python"],
      icon: "💻"
    },
    {
      id: 2,
      title: "FRAMEWORKS",
      description: "Herramientas para desarrollo más rápido y aplicaciones modernas y dinámicas.",
      items: ["Next.js", "React", "TailwindCSS"],
      icon: "⚡"
    },
    {
      id: 3,
      title: "HERRAMIENTAS",
      description: "Plataformas para control de versiones, colaboración y despliegue de proyectos.",
      items: ["Git", "GitHub", "Figma", "VS Code"],
      icon: "🛠️"
    },
    {
      id: 4,
      title: "ESTILOS / DISEÑO",
      description: "Tecnologías para interfaces visuales, diseño limpio y experiencia de usuario.",
      items: ["CSS3", "SASS", "Figma", "Adobe XD"],
      icon: "🎨"
    }
  ];

  return (
    <div className="min-h-screen dark:bg-black light:bg-white dark:text-white light:text-gray-900 py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white light:text-gray-900 mb-4">
            Tecnologías
          </h1>
          <p className="text-lg sm:text-xl dark:text-gray-300 light:text-gray-600 max-w-3xl mx-auto">
            Herramientas y tecnologías que utilizo para crear aplicaciones web modernas y eficientes.
          </p>
        </div>

        {/* Grid de tecnologías */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.id}
              className={`group relative dark:bg-gray-800 light:bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700 light:border-gray-300 hover:border-orange-500 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(tech.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Efecto de gradiente naranja */}
              <div className={`absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                hoveredCard === tech.id ? 'opacity-100' : ''
              }`} />
              
              {/* Borde naranja animado */}
              <div className={`absolute inset-0 rounded-xl border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                hoveredCard === tech.id ? 'opacity-100' : ''
              }`} />
              
              <div className="relative z-10">
                {/* Icono y título */}
                <div className="text-center mb-4">
                  <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold dark:text-white light:text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                    {tech.title}
                  </h3>
                </div>
                
                {/* Descripción */}
                <p className="dark:text-gray-300 light:text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed text-center">
                  {tech.description}
                </p>
                
                {/* Tecnologías */}
                <div className="space-y-2">
                  {tech.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 text-xs sm:text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección adicional */}
        <div className={`mt-12 sm:mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="dark:bg-gray-800 light:bg-gray-100 rounded-xl p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-5xl mb-4">🚀</div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white light:text-gray-900 mb-4">
              Siempre Aprendiendo
            </h2>
            <p className="dark:text-gray-300 light:text-gray-600 max-w-2xl mx-auto">
              Me mantengo actualizado con las últimas tecnologías y mejores prácticas en desarrollo web, 
              siempre buscando nuevas formas de crear experiencias digitales excepcionales.
            </p>
          </div>
        </div>

        {/* Botón de regreso */}
        <div className="mt-8 sm:mt-12 text-center">
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            ← Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}