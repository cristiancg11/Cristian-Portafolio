'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['inicio', 'proyectos', 'tecnologias', 'experiencias', 'referencias', 'contacto'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed w-full top-0 z-50 dark:bg-black/90 bg-white/90 backdrop-blur-sm border-b dark:border-gray-800 border-gray-200">
      <div className="flex justify-between items-center py-3 px-2 sm:py-4 sm:px-4">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="group relative flex items-center justify-center w-10 h-10 rounded-lg dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 hover:dark:bg-gray-700 hover:bg-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg overflow-hidden"
          aria-label="Toggle theme"
        >
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Theme icon */}
          <span className="relative text-lg group-hover:scale-110 transition-transform duration-300">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </span>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-lg border-2 border-violet-600 opacity-0 group-hover:opacity-100 animate-ping" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto">
          {[
            { id: 'inicio', labelKey: 'home'  },
            { id: 'proyectos', labelKey: 'projects' },
            { id: 'tecnologias', labelKey: 'technologies' },
            { id: 'experiencias', labelKey: 'experience' },
            { id: 'referencias', labelKey: 'references' },
            { id: 'contacto', labelKey: 'downloadCV' }
          ].map(({ id, labelKey }) => (
            <button 
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group relative px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
                activeSection === id
                  ? 'bg-violet-600 text-black shadow-lg shadow-violet-600/25'
                  : 'dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-lg'
              }`}
            >
              {/* Hover gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                activeSection === id ? 'opacity-100' : ''
              }`} />
              
              {/* Button content */}
              <span className="relative flex items-center gap-1 sm:gap-2 group-hover:scale-105 transition-transform duration-300">
                <span className="text-xs sm:text-sm"></span>
                <span className="hidden sm:inline">{t.nav[labelKey as keyof typeof t.nav]}</span>
                <span className="sm:hidden">{t.nav[labelKey as keyof typeof t.nav].split(' ')[0]}</span>
              </span>
              
              {/* Active section indicator */}
              {activeSection === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="group relative flex items-center justify-center w-10 h-10 dark:bg-gray-800 bg-gray-200 dark:text-white text-gray-900 hover:dark:bg-gray-700 hover:bg-gray-300 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div 
              className="absolute top-full right-0 mt-2 w-48 dark:bg-gray-800 bg-white border dark:border-gray-700 border-gray-200 shadow-xl z-50 rounded-lg overflow-hidden animate-in"
              role="menu"
              aria-orientation="vertical"
            >
              {[
                { id: 'inicio', labelKey: 'home'  },
                { id: 'proyectos', labelKey: 'projects' },
                { id: 'tecnologias', labelKey: 'technologies' },
                { id: 'experiencias', labelKey: 'experience' },
                { id: 'referencias', labelKey: 'references' },
                { id: 'contacto', labelKey: 'downloadCV' }
              ].map(({ id, labelKey }, index) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 border-b dark:border-gray-700 border-gray-200 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-inset ${
                    activeSection === id
                      ? 'bg-violet-600 text-white'
                      : 'dark:text-white text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    animation: `slideInFromRight 0.2s ease-out ${index * 50}ms forwards`,
                    opacity: 0
                  }}
                  onAnimationEnd={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                  }}
                  aria-label={t.nav[labelKey as keyof typeof t.nav]}
                  role="menuitem"
                >
                  {t.nav[labelKey as keyof typeof t.nav]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language switcher and space */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div className="w-10 h-10"></div>
        </div>
      </div>
    </nav>
  );
}

