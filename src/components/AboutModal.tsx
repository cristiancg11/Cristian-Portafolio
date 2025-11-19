'use client';

import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl dark:bg-gray-800 bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center dark:bg-gray-700 bg-gray-200 dark:text-white text-gray-900 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 hover:scale-110"
          aria-label="Cerrar"
        >
          <FaTimes size={18} />
        </button>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 text-center">
            {t.about.title}
          </h2>
          
          <div className="dark:text-gray-300 text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>{t.about.description}</p>
          </div>

          {/* Close button at bottom */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t.about.closeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

