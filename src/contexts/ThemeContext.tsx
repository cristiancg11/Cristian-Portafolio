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

  useEffect(() => {
    // Aplicar tema inicial inmediatamente para evitar flash
    const root = document.documentElement;
    
    try {
      // Verificar si hay una preferencia guardada en localStorage
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      let initialTheme: Theme;
      
      if (savedTheme === 'dark' || savedTheme === 'light') {
        initialTheme = savedTheme;
      } else {
        // Verificar la preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'dark' : 'light';
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
      // Fallback en caso de error
      console.error('Error loading theme:', error);
      root.classList.add('dark');
      setTheme('dark');
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        const root = document.documentElement;
        localStorage.setItem('theme', theme);
        
        // Aplicar la clase al documento
        if (theme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      try {
        const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
        // Aplicar inmediatamente para mejor UX (sin esperar re-render)
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
      } catch (error) {
        console.error('Error toggling theme:', error);
        return prevTheme;
      }
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


