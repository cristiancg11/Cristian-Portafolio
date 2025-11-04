'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center justify-center w-10 h-10 rounded-lg dark:bg-gray-800 light:bg-gray-200 dark:text-white light:text-gray-900 hover:dark:bg-gray-700 hover:light:bg-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg overflow-hidden"
      aria-label="Toggle language"
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Language icon */}
      <span className="relative text-lg group-hover:scale-110 transition-transform duration-300">
        {language === 'en' ? '🇪🇸' : '🇺🇸'}
      </span>
      
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-orange-500 opacity-0 group-hover:opacity-100 animate-ping" />
    </button>
  );
}

