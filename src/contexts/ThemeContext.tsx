'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Inicializar tema desde localStorage al montar
  useEffect(() => {
    const root = document.documentElement;
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      let initialTheme: Theme = 'dark';
      
      if (savedTheme === 'dark' || savedTheme === 'light') {
        initialTheme = savedTheme;
      }
      
      // Aplicar tema inmediatamente
      if (initialTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      
      setTheme(initialTheme);
      setMounted(true);
    } catch (error) {
      console.error('Error loading theme:', error);
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


