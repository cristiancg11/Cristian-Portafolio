'use client';

import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [isVisible, duration, onClose]);

  if (!shouldRender) return null;

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  }[type];

  const icon = {
    success: <FaCheckCircle size={20} />,
    error: <FaTimesCircle size={20} />,
    info: <FaCheckCircle size={20} />
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 ${bgColor} text-white rounded-lg shadow-2xl transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
      style={{ minWidth: '300px', maxWidth: '90vw' }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setShouldRender(false);
          setTimeout(onClose, 300);
        }}
        className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Cerrar"
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
}

