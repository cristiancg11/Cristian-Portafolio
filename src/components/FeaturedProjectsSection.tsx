'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeaturedProject {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  status: string;
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  views?: number;
}

export default function FeaturedProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

    const element = document.getElementById('featured-projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const featuredProjects: FeaturedProject[] = useMemo(() => [
    {
      id: 1,
      slug: 'matchinsight',
      title: 'MatchInsight',
      subtitle: t.projects.matchAnalyzer,
      description: t.projects.matchDescription,
      image: '/projects/matchinsight-card.svg',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Next.js'],
      status: t.projects.inDevelopment,
      demoUrl: 'https://matchinsight-demo.vercel.app',
      githubUrl: 'https://github.com/cristiancg11/matchinsight',
      stars: 12,
      forks: 3,
      views: 1200
    },
    {
      id: 2,
      slug: 'fintrack',
      title: 'FinTrack',
      subtitle: t.projects.personalExpenseControl,
      description: t.projects.finTrackDescription,
      image: '/projects/fintrack-card.svg',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Next.js'],
      status: t.projects.completed,
      demoUrl: 'https://fintrack-demo.vercel.app',
      githubUrl: 'https://github.com/cristiancg11/fintrack',
      stars: 8,
      forks: 2,
      views: 890
    }
  ], [t]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const currentProject = featuredProjects[currentIndex];

  return (
    <section 
      id="featured-projects" 
      className="min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:text-white text-gray-900 py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900 mb-4">
            {t.featuredProjects.title}
          </h2>
          <p className="text-lg sm:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
            {t.featuredProjects.subtitle}
          </p>
        </div>

        {/* Main Project Card */}
        <div className={`transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative group">
            {/* Project Card */}
            <div className="dark:bg-gray-800/80 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border dark:border-gray-700 border-gray-200">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left: Image */}
                <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-violet-700/20" />
                  {currentProject.image ? (
                    <Image
                      src={currentProject.image}
                      alt={`${currentProject.title} - ${currentProject.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <Image
                      src="/projects/placeholder-project.svg"
                      alt={`Placeholder for ${currentProject.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      currentProject.status === t.projects.completed
                        ? 'bg-green-500/90 text-white'
                        : 'bg-yellow-500/90 text-black'
                    }`}>
                      {currentProject.status}
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-2">
                      {currentProject.title}
                    </h3>
                    <p className="text-violet-600 font-semibold text-lg sm:text-xl mb-4">
                      {currentProject.subtitle}
                    </p>
                    
                    <p className="dark:text-gray-300 text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                      {currentProject.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold dark:text-gray-400 text-gray-500 mb-3">
                        {t.featuredProjects.technologies}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 rounded-lg text-xs sm:text-sm font-medium border border-violet-600/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    {(currentProject.stars || currentProject.forks || currentProject.views) && (
                      <div className="flex flex-wrap gap-4 mb-6">
                        {currentProject.stars !== undefined && (
                          <div className="flex items-center gap-2 dark:text-gray-300 text-gray-600">
                            <FaStar className="text-violet-600" size={16} />
                            <span className="text-sm font-medium">{currentProject.stars} {t.featuredProjects.stars}</span>
                          </div>
                        )}
                        {currentProject.forks !== undefined && (
                          <div className="flex items-center gap-2 dark:text-gray-300 text-gray-600">
                            <FaCodeBranch className="text-violet-600" size={16} />
                            <span className="text-sm font-medium">{currentProject.forks} {t.featuredProjects.forks}</span>
                          </div>
                        )}
                        {currentProject.views !== undefined && (
                          <div className="flex items-center gap-2 dark:text-gray-300 text-gray-600">
                            <FaEye className="text-violet-600" size={16} />
                            <span className="text-sm font-medium">{currentProject.views} {t.featuredProjects.views}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {currentProject.demoUrl && (
                      <a
                        href={currentProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-600/25"
                      >
                        <FaExternalLinkAlt size={16} />
                        <span>{t.featuredProjects.viewDemo}</span>
                      </a>
                    )}
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 dark:bg-gray-700 bg-gray-200 dark:text-white text-gray-900 dark:hover:bg-gray-600 hover:bg-gray-300 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <FaGithub size={16} />
                        <span>{t.featuredProjects.viewCode}</span>
                      </a>
                    )}
                    <Link
                      href={`/proyectos/${currentProject.slug}`}
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 font-semibold rounded-lg transition-all duration-300 hover:scale-105 border dark:border-gray-700 border-gray-300"
                    >
                      <span>{t.featuredProjects.viewDetails}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center dark:bg-gray-800 bg-white rounded-full shadow-lg dark:text-white text-gray-900 hover:bg-violet-600 hover:text-black transition-all duration-300 hover:scale-110 z-20 border dark:border-gray-700 border-gray-200"
              aria-label="Previous project"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center dark:bg-gray-800 bg-white rounded-full shadow-lg dark:text-white text-gray-900 hover:bg-violet-600 hover:text-black transition-all duration-300 hover:scale-110 z-20 border dark:border-gray-700 border-gray-200"
              aria-label="Next project"
            >
              <FaChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-6 sm:mt-8">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 h-3 bg-violet-600 rounded-full'
                    : 'w-3 h-3 dark:bg-gray-600 bg-gray-400 rounded-full hover:bg-violet-500'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

