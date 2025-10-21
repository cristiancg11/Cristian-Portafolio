'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detectar sección activa
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
  };

  return (
    <nav className="fixed w-full top-0 z-50 dark:bg-black/90 light:bg-white/90 backdrop-blur-sm border-b dark:border-gray-800 light:border-gray-200">
      <div className="flex justify-between items-center py-3 px-2 sm:py-4 sm:px-4">
        {/* Botón de toggle de tema */}
        <button
          onClick={toggleTheme}
          className="group relative flex items-center justify-center w-10 h-10 rounded-lg dark:bg-gray-800 light:bg-gray-200 dark:text-white light:text-gray-900 hover:dark:bg-gray-700 hover:light:bg-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg overflow-hidden"
          aria-label="Toggle theme"
        >
          {/* Efecto de hover con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icono del tema */}
          <span className="relative text-lg group-hover:scale-110 transition-transform duration-300">
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
          
          {/* Efecto de pulso */}
          <div className="absolute inset-0 rounded-lg border-2 border-orange-500 opacity-0 group-hover:opacity-100 animate-ping" />
        </button>

        {/* Links centrados */}
        <div className="flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto">
          {[
            { id: 'inicio', label: 'INICIO', icon: '🏠' },
            { id: 'proyectos', label: 'PROYECTOS', icon: '💻' },
            { id: 'tecnologias', label: 'TECNOLOGIAS', icon: '⚡' },
            { id: 'experiencias', label: 'EXPERIENCIAS', icon: '🎯' },
            { id: 'referencias', label: 'REFERENCIAS', icon: '⭐' },
            { id: 'contacto', label: 'DESCARGAR CV', icon: '📄' }
          ].map(({ id, label, icon }) => (
            <button 
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group relative px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
                activeSection === id
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/25'
                  : 'dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 light:bg-gray-200 light:text-gray-900 light:hover:bg-gray-300 hover:shadow-lg'
              }`}
            >
              {/* Efecto de hover con gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                activeSection === id ? 'opacity-100' : ''
              }`} />
              
              {/* Contenido del botón */}
              <span className="relative flex items-center gap-1 sm:gap-2 group-hover:scale-105 transition-transform duration-300">
                <span className="text-xs sm:text-sm">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(' ')[0]}</span>
              </span>
              
              {/* Indicador de sección activa */}
              {activeSection === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Espacio para balancear el diseño */}
        <div className="w-10 h-10"></div>
      </div>
    </nav>
  );
}

