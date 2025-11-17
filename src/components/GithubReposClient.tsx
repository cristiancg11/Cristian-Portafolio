'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaCalendarAlt } from 'react-icons/fa';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
  updated_at: string;
}

interface GithubReposClientProps {
  initialRepos: GitHubRepo[];
}

export default function GithubReposClient({ initialRepos }: GithubReposClientProps) {
  const [repos] = useState<GitHubRepo[]>(initialRepos);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('github-repos');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Get unique languages from repos
  const languages = Array.from(
    new Set(repos.map(repo => repo.language).filter(Boolean))
  ).sort() as string[];

  // Filter repos
  const allFilteredRepos = repos.filter(repo => {
    if (selectedLanguage !== 'all' && repo.language !== selectedLanguage) {
      return false;
    }
    if (onlyStarred && repo.stargazers_count === 0) {
      return false;
    }
    return true;
  });

  const filteredRepos = allFilteredRepos.slice(0, displayedCount);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 12);
  };

  const hasMore = filteredRepos.length < allFilteredRepos.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section 
      id="github-repos" 
      className="min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 py-8 sm:py-12 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Mis Repositorios de GitHub
          </h1>
          <p className="text-lg sm:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
            Explora mis proyectos y contribuciones en GitHub
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex-1">
            <label htmlFor="language-filter" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
              Filtrar por lenguaje:
            </label>
            <select
              id="language-filter"
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setDisplayedCount(12);
              }}
              className="w-full px-4 py-2 dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 rounded-lg border dark:border-gray-700 border-gray-300 focus:border-violet-600 focus:outline-none transition-all duration-300"
            >
              <option value="all">Todos los lenguajes</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyStarred}
                onChange={(e) => {
                  setOnlyStarred(e.target.checked);
                  setDisplayedCount(12);
                }}
                className="w-5 h-5 text-violet-600 rounded focus:ring-violet-600 focus:ring-2"
              />
              <span className="text-sm font-medium dark:text-white text-gray-900">
                Solo con estrellas (&gt;0)
              </span>
            </label>
          </div>
        </div>

        {/* Repos Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredRepos.map((repo, index) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative dark:bg-gray-800 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-500 dark:border-gray-700 border-gray-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-violet-600/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Orange gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-violet-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Repo name */}
                <div className="flex items-center gap-2 mb-2">
                  <FaGithub className="text-violet-600" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold dark:text-white text-gray-900 group-hover:text-violet-600 transition-colors duration-300 truncate">
                    {repo.name}
                  </h3>
                </div>
                
                {/* Description */}
                {repo.description && (
                  <p className="dark:text-gray-300 text-gray-600 text-sm mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                
                {/* Stats */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  {repo.language && (
                    <div className="flex items-center gap-1 dark:text-gray-300 text-gray-600">
                      <FaCodeBranch size={14} />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 dark:text-gray-300 text-gray-600">
                    <FaStar className="text-violet-600" size={14} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 dark:text-gray-300 text-gray-600">
                    <FaCalendarAlt size={14} />
                    <span>{formatDate(repo.pushed_at)}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className={`text-center mt-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-600/25"
            >
              Cargar más repositorios
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredRepos.length === 0 && repos.length === 0 && (
          <div className="text-center py-12">
            <FaGithub className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-lg dark:text-gray-300 text-gray-600 mb-2">
              No se pudieron cargar los repositorios de GitHub.
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-500">
              Esto puede deberse a límites de la API o problemas de conexión. Intenta recargar la página.
            </p>
          </div>
        )}

        {filteredRepos.length === 0 && repos.length > 0 && (
          <div className="text-center py-12">
            <p className="text-lg dark:text-gray-300 text-gray-600">
              No se encontraron repositorios con los filtros seleccionados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

