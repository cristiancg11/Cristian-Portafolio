'use client';

import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';

const projects = [
  {
    id: 'matchinsight',
    title: 'MatchInsight',
    subtitle: 'Analizador de Partidos',
    description: 'Plataforma web que analiza partidos de fútbol en tiempo real, mostrando estadísticas detalladas de jugadores clave, rendimiento del equipo y gráficos interactivos para una mejor comprensión del juego.',
    longDescription: 'MatchInsight es una aplicación web innovadora diseñada para analizar partidos de fútbol en tiempo real. La plataforma utiliza algoritmos avanzados para procesar datos de partidos y generar estadísticas detalladas que ayudan a entrenadores, analistas y aficionados a comprender mejor el rendimiento de los equipos y jugadores.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Node.js'],
    features: [
      'Análisis en tiempo real de partidos',
      'Estadísticas detalladas de jugadores',
      'Gráficos interactivos y visualizaciones',
      'Dashboard intuitivo para entrenadores',
      'API REST para integración con otros sistemas'
    ],
    image: '/matchinsight-preview.png',
    status: 'En desarrollo',
    github: 'https://github.com/cristian/matchinsight',
    demo: 'https://matchinsight-demo.vercel.app'
  },
  {
    id: 'fintrack',
    title: 'FinTrack',
    subtitle: 'Control de Gastos Personales',
    description: 'Aplicación móvil y web para el control de gastos personales con seguimiento automático de categorías, generación de reportes financieros y herramientas de productividad para una mejor gestión del dinero.',
    longDescription: 'FinTrack es una aplicación completa para la gestión financiera personal que permite a los usuarios controlar sus gastos, crear presupuestos y generar reportes detallados. La aplicación cuenta con una interfaz intuitiva y funcionalidades avanzadas para el análisis financiero.',
    technologies: ['React Native', 'React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
    features: [
      'Seguimiento automático de gastos',
      'Categorización inteligente',
      'Reportes financieros detallados',
      'Presupuestos personalizables',
      'Sincronización entre dispositivos'
    ],
    image: '/fintrack-preview.png',
    status: 'Completado',
    github: 'https://github.com/cristian/fintrack',
    demo: 'https://fintrack-demo.vercel.app'
  }
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen dark:bg-black light:bg-white dark:text-white light:text-gray-900 py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header del proyecto */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl sm:text-5xl">
              {project.id === 'matchinsight' ? '⚽' : '💰'}
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white light:text-gray-900">
                {project.title}
              </h1>
              <p className="text-orange-500 font-semibold text-lg sm:text-xl">
                {project.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              project.status === 'Completado' 
                ? 'bg-green-500 text-white' 
                : 'bg-orange-500 text-black'
            }`}>
              {project.status}
            </span>
            <div className="flex gap-2">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                GitHub
              </a>
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Ver Demo
              </a>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Descripción */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white light:text-gray-900">
                Descripción del Proyecto
              </h2>
              <p className="dark:text-gray-300 light:text-gray-600 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white light:text-gray-900">
                Características Principales
              </h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 dark:text-gray-300 light:text-gray-600">
                    <span className="text-orange-500">→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tecnologías e imagen */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white light:text-gray-900">
                Tecnologías Utilizadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-orange-500 text-black font-semibold rounded-lg text-sm hover:bg-orange-600 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Imagen del proyecto */}
            <div className="dark:bg-gray-800 light:bg-gray-100 rounded-xl p-6 h-64 sm:h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl sm:text-8xl mb-4">
                  {project.id === 'matchinsight' ? '⚽' : '💰'}
                </div>
                <div className="text-lg font-semibold text-orange-500">
                  {project.title}
                </div>
                <div className="dark:text-gray-300 light:text-gray-600 text-sm">
                  Vista previa del proyecto
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de regreso */}
        <div className="mt-8 sm:mt-12 text-center">
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            ← Volver a Proyectos
          </button>
        </div>
      </div>
    </div>
  );
}
