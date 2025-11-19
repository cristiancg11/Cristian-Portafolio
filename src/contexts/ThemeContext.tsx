'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Función helper para obtener el tema actual del DOM
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  
  try {
    // Primero intentar leer del localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    
    // Si no hay en localStorage, leer del DOM (establecido por el script)
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      return 'dark';
    }
    if (root.classList.contains('light')) {
      return 'light';
    }
  } catch (error) {
    console.error('Error reading initial theme:', error);
  }
  
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Usar función lazy para evitar problemas de hidratación
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return getInitialTheme();
  });
  const [mounted, setMounted] = useState(false);

  // Sincronizar con el DOM al montar
  useEffect(() => {
    const root = document.documentElement;
    
    try {
      // Leer el tema actual del DOM o localStorage
      const currentTheme = getInitialTheme();
      
      // Asegurar que el DOM esté sincronizado
      if (currentTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      
      setTheme(currentTheme);
      setMounted(true);
    } catch (error) {
      console.error('Error initializing theme:', error);
      root.classList.add('dark');
      root.classList.remove('light');
      setTheme('dark');
      setMounted(true);
    }
  }, []);

  // Aplicar cambios de tema cuando cambie el estado
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    try {
      // Aplicar la clase al documento
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      
      // Guardar en localStorage
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      // Aplicar inmediatamente para mejor UX
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      
      // Persistir en localStorage
      try {
        localStorage.setItem('theme', newTheme);
      } catch (storageError) {
        console.warn('Could not save theme to localStorage:', storageError);
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}


