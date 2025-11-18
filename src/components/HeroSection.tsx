'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="inicio" 
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-16 sm:py-20 dark:bg-gradient-to-b dark:from-black dark:to-gray-900 bg-gradient-to-b from-white to-gray-100 dark:text-white text-gray-900 relative overflow-hidden"
    >
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-2 h-2 bg-violet-600/20 rounded-full animate-pulse"
          style={{
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            transition: 'all 0.3s ease'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-violet-600/30 rounded-full animate-pulse"
          style={{
            left: `${mousePosition.x * 0.2}px`,
            top: `${mousePosition.y * 0.2}px`,
            transition: 'all 0.5s ease'
          }}
        />
      </div>

      {/* Avatar on the left */}
      <div className={`flex-1 flex justify-center lg:justify-start z-10 mb-8 lg:mb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
        <div className="relative group" style={{
          // Ajusta la posición horizontal del círculo (valores negativos = izquierda, positivos = derecha)
          marginLeft: '60px', // Movido más hacia la derecha para mejor posicionamiento en PC
          marginTop: '0px' // Cambia este valor para mover verticalmente: '20px' = abajo, '-20px' = arriba
        }}>
          <div 
            className="rounded-full border-4 border-violet-600 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-violet-600/25 overflow-hidden relative mx-auto lg:mx-0"
            style={{
              // Ajusta el tamaño del círculo aquí (en píxeles)
              // Desktop (pantallas grandes): ajusta estos valores
              width: '350px', // Cambia este valor para hacerlo más grande o pequeño (ej: '360px' = más grande, '280px' = más pequeño)
              height: '340px', // Debe ser el mismo valor que width para mantener el círculo
              // Para móviles, el tamaño se ajustará automáticamente, pero puedes forzar un tamaño específico aquí
            }}
          >
            <Image
              src="/cristian-profile.jpg"
              alt="Foto de Cristian Gómez"
              width={320}
              height={320}
              className="rounded-full object-cover shadow-lg w-full h-full"
              style={{
                objectPosition: '50% 3%' // Ajusta estos valores: primer número (50%) = horizontal (0% izquierda, 100% derecha), segundo número (30%) = vertical (0% arriba, 100% abajo)
              }}
              priority
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
            />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-violet-600/50 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      {/* Content on the right */}
      <div className={`flex-1 text-center lg:text-left space-y-4 sm:space-y-6 z-10 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold dark:text-white text-gray-900">
          {t.hero.title}
        </h1>
        
        <p className="text-sm sm:text-lg lg:text-xl dark:text-white text-gray-700 font-medium max-w-2xl mx-auto lg:mx-0">
          {t.hero.subtitle}
        </p>

        <div className="space-y-2 sm:space-y-3 dark:text-white text-gray-700">
          <p className="text-sm sm:text-base lg:text-lg">{t.hero.bullet1}</p>
          <p className="text-sm sm:text-base lg:text-lg">{t.hero.bullet2}</p>
        </div>

        {/* Social media */}
        <div className="flex gap-3 sm:gap-4 justify-center">
            <a 
              href="https://www.instagram.com/cristiancg1111/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 sm:w-12 sm:h-12 dark:bg-white bg-gray-200 rounded-full flex items-center justify-center hover:bg-violet-600 transition-all duration-300 hover:scale-110"
              title="Instagram"
              aria-label="Instagram"
            >
              <FaInstagram className="text-black" size={20} />
            </a>
            <a 
              href="mailto:cristiansantacruzz123321@gmail.com" 
              className="w-10 h-10 sm:w-12 sm:h-12 dark:bg-white bg-gray-200 rounded-full flex items-center justify-center hover:bg-violet-600 transition-all duration-300 hover:scale-110"
              title="Gmail"
              aria-label="Gmail"
            >
              <FaEnvelope className="text-black" size={20} />
            </a>
            <a 
              href="https://github.com/cristiancg11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 sm:w-12 sm:h-12 dark:bg-white bg-gray-200 rounded-full flex items-center justify-center hover:bg-violet-600 transition-all duration-300 hover:scale-110"
              title="GitHub"
              aria-label="GitHub"
            >
              <FaGithub className="text-black" size={20} />
            </a>
          </div>
      </div>
    </section>
  );
}

