'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 'matchinsight',
      icon: '⚽',
      title: 'MatchInsight',
      subtitle: 'Analizador de Partidos',
      description: 'Plataforma web que analiza partidos de fútbol en tiempo real, mostrando estadísticas detalladas de jugadores clave, rendimiento del equipo y gráficos interactivos para una mejor comprensión del juego.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      status: 'En desarrollo'
    },
    {
      id: 'fintrack',
      icon: '💰',
      title: 'FinTrack',
      subtitle: 'Control de Gastos Personales',
      description: 'Aplicación móvil y web para el control de gastos personales con seguimiento automático de categorías, generación de reportes financieros y herramientas de productividad para una mejor gestión del dinero.',
      technologies: ['React Native', 'React', 'Node.js', 'MongoDB'],
      status: 'Completado'
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
            Mis Proyectos
          </h1>
          <p className="text-lg sm:text-xl dark:text-gray-300 light:text-gray-600 max-w-3xl mx-auto">
            Aquí puedes ver algunos de los proyectos en los que he trabajado, desde aplicaciones web hasta herramientas de análisis de datos.
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative dark:bg-gray-800 light:bg-gray-100 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700 light:border-gray-300 hover:border-orange-500 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Efecto de gradiente naranja */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Borde naranja animado */}
              <div className="absolute inset-0 rounded-xl border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Header del proyecto */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl sm:text-5xl">{project.icon}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold dark:text-white light:text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-orange-500 font-semibold text-sm sm:text-base">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Descripción */}
                <p className="dark:text-gray-300 light:text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Tecnologías */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold dark:text-white light:text-gray-900 mb-2">
                    Tecnologías:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-orange-500 text-black text-xs font-semibold rounded transition-colors duration-300 hover:bg-orange-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status y botón */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Completado' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-orange-500 text-black'
                  }`}>
                    {project.status}
                  </span>
                  
                  <Link href={`/proyectos/${project.id}`}>
                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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