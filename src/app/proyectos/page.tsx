'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 'matchinsight',
      icon: '',
      title: 'MatchInsight',
      subtitle: t.projects.matchAnalyzer,
      description: t.projects.matchDescription,
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      status: t.projects.inDevelopment
    },
    {
      id: 'fintrack',
      icon: '',
      title: 'FinTrack',
      subtitle: t.projects.personalExpenseControl,
      description: t.projects.finTrackDescription,
      technologies: ['React Native', 'React', 'Node.js', 'MongoDB'],
      status: t.projects.completed
    }
  ];

  return (
    <div className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900 mb-4">
            {t.projects.title}
          </h1>
          <p className="text-lg sm:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative dark:bg-gray-800 bg-gray-100 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700 border-gray-300 hover:border-orange-500 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Orange gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated orange border */}
              <div className="absolute inset-0 rounded-xl border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Project header */}
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-orange-500 font-semibold text-sm sm:text-base">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="dark:text-gray-300 text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2">
                    {t.projects.technologies}
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

                {/* Status and button */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === t.projects.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-orange-500 text-black'
                  }`}>
                    {project.status}
                  </span>
                  
                  <Link href={`/proyectos/${project.id}`}>
                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                      {t.projects.seeMore}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-8 sm:mt-12 text-center">
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            {t.common.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
}