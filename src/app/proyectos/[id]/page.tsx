'use client';

import { notFound } from 'next/navigation';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  image: string;
  status: string;
  github: string;
  demo: string;
}

// This will be moved inside the component to use translations


export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const projects: Project[] = useMemo(() => [
    {
      id: 'matchinsight',
      title: 'MatchInsight',
      subtitle: t.projects.matchAnalyzer,
      description: t.projects.matchDescription,
      longDescription: 'MatchInsight is an innovative web application designed to analyze soccer matches in real-time. The platform uses advanced algorithms to process match data and generate detailed statistics that help coaches, analysts and fans better understand team and player performance.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Node.js'],
      features: [
        'Real-time match analysis',
        'Detailed player statistics',
        'Interactive charts and visualizations',
        'Intuitive dashboard for coaches',
        'REST API for integration with other systems'
      ],
      image: '/projects/matchinsight-card.svg',
      status: t.projects.inDevelopment,
      github: 'https://github.com/cristian/matchinsight',
      demo: 'https://matchinsight-demo.vercel.app'
    },
    {
      id: 'fintrack',
      title: 'FinTrack',
      subtitle: t.projects.personalExpenseControl,
      description: t.projects.finTrackDescription,
      longDescription: 'FinTrack is a complete application for personal financial management that allows users to control their expenses, create budgets and generate detailed reports. The application features an intuitive interface and advanced features for financial analysis.',
      technologies: ['React Native', 'React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
      features: [
        'Automatic expense tracking',
        'Smart categorization',
        'Detailed financial reports',
        'Customizable budgets',
        'Synchronization between devices'
      ],
      image: '/projects/fintrack-card.svg',
      status: t.projects.completed,
      github: 'https://github.com/cristian/fintrack',
      demo: 'https://fintrack-demo.vercel.app'
    }
  ], [t]);

  useEffect(() => {
    const id = params.id as string;
    const foundProject = projects.find((p) => p.id === id);
    
    if (!foundProject) {
      notFound();
    } else {
      setProject(foundProject);
      setLoading(false);
    }
  }, [params.id, projects]);

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">{t.projectDetail.loading}</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header del proyecto */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900">
                {project.title}
              </h1>
              <p className="text-orange-500 font-semibold text-lg sm:text-xl">
                {project.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              project.status === t.projects.completed 
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
                {t.projectDetail.viewDemo}
              </a>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Description */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">
                {t.projectDetail.projectDescription}
              </h2>
              <p className="dark:text-gray-300 text-gray-600 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">
                {t.projectDetail.mainFeatures}
              </h2>
              <ul className="space-y-2">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 dark:text-gray-300 text-gray-600">
                    <span className="text-orange-500">→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies and image */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">
                {t.projectDetail.technologiesUsed}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
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
            <div className="dark:bg-gray-800 bg-gray-100 rounded-xl p-6 h-64 sm:h-80 flex items-center justify-center overflow-hidden relative">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.subtitle}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  title={project.title}
                />
              ) : (
                <Image
                  src="/projects/placeholder-project.svg"
                  alt={`Placeholder for ${project.title}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  title={project.title}
                />
              )}
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 sm:mt-12 text-center">
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            {t.projectDetail.backToProjects}
          </button>
        </div>
      </div>
    </div>
  );
}
