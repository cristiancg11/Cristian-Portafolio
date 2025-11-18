'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'es';

interface Translations {
  nav: {
    home: string;
    projects: string;
    technologies: string;
    experience: string;
    references: string;
    downloadCV: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bullet1: string;
    bullet2: string;
    contactMe: string;
  };
  projects: {
    title: string;
    subtitle: string;
    seeMore: string;
    previous: string;
    next: string;
    inDevelopment: string;
    completed: string;
    technologies: string;
    matchAnalyzer: string;
    personalExpenseControl: string;
    matchDescription: string;
    finTrackDescription: string;
    helloWorld: string;
  };
  technologies: {
    title: string;
    subtitle: string;
    languages: string;
    languagesDesc: string;
    frameworks: string;
    frameworksDesc: string;
    tools: string;
    toolsDesc: string;
    stylesDesign: string;
    stylesDesc: string;
    alwaysLearning: string;
    alwaysLearningDesc: string;
    webDevelopment: string;
    webDevelopmentDesc: string;
  };
  experience: {
    title: string;
    gitTitle: string;
    gitDescription: string;
    programmingTitle: string;
    programmingDescription: string;
    mysqlTitle: string;
    mysqlDescription: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successMessage: string;
  };
  references: {
    title: string;
    subtitle: string;
    universityClassmate: string;
    projectMentor: string;
    projectCollaborator: string;
    programmingProfessor: string;
    featuredTestimonials: string;
    recommendation: string;
    averageRating: string;
    availableReferences: string;
    ref1Description: string;
    ref2Description: string;
    ref3Description: string;
    ref4Description: string;
    instagram: string;
  };
  githubRepos: {
    title: string;
    subtitle: string;
    filterByLanguage: string;
    allLanguages: string;
    onlyStarred: string;
    loadMore: string;
    errorLoading: string;
    errorDescription: string;
    noReposFound: string;
  };
  projectDetail: {
    projectDescription: string;
    mainFeatures: string;
    technologiesUsed: string;
    projectPreview: string;
    backToProjects: string;
    loading: string;
    viewDemo: string;
  };
  common: {
    backToHome: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'HOME',
      projects: 'PROJECTS',
      technologies: 'TECHNOLOGIES',
      experience: 'EXPERIENCE',
      references: 'REFERENCES',
      downloadCV: 'DOWNLOAD CV',
    },
    hero: {
      title: 'Dr. Cristian Gomez',
      subtitle: 'FUTURE SOFTWARE ENGINEER WITH A PASSION FOR WEB DEVELOPMENT AND CREATING PROJECTS THAT ADD REAL VALUE.',
      bullet1: '• PASSIONATE ABOUT FRONTEND, WEB INNOVATION AND CONSTANT LEARNING.',
      bullet2: '• FOCUSED ON CREATING USEFUL PROJECTS WITH GOOD DESIGN.',
      contactMe: 'CONTACT ME',
    },
    projects: {
      title: 'My Projects',
      subtitle: "Here you can see some of the projects I've worked on, from web applications to data analysis tools.",
      seeMore: 'See More',
      previous: 'Previous',
      next: 'Next',
      inDevelopment: 'In Development',
      completed: 'Completed',
      technologies: 'Technologies:',
      matchAnalyzer: 'Match Analyzer',
      personalExpenseControl: 'Personal Expense Control',
      matchDescription: 'Web platform that analyzes soccer matches in real-time, showing detailed statistics of key players, team performance and interactive charts for a better understanding of the game.',
      finTrackDescription: 'Mobile and web application for personal expense control with automatic category tracking, financial report generation and productivity tools for better money management.',
      helloWorld: 'HELLO WORLD!',
    },
    technologies: {
      title: 'Technologies',
      subtitle: 'Tools and technologies I use to create modern and efficient web applications.',
      languages: 'LANGUAGES',
      languagesDesc: 'Programming languages for logic and interaction of modern web applications.',
      frameworks: 'FRAMEWORKS',
      frameworksDesc: 'Tools for faster development and modern, dynamic applications.',
      tools: 'TOOLS',
      toolsDesc: 'Platforms for version control, collaboration and project deployment.',
      stylesDesign: 'STYLES / DESIGN',
      stylesDesc: 'Technologies for visual interfaces, clean design and user experience.',
      alwaysLearning: 'Always Learning',
      alwaysLearningDesc: 'I stay up to date with the latest technologies and best practices in web development, always looking for new ways to create exceptional digital experiences.',
      webDevelopment: 'Web Development',
      webDevelopmentDesc: 'Modern technologies to create exceptional digital experiences',
    },
    experience: {
      title: 'Training Experiences',
      gitTitle: 'Git and GitHub Course',
      gitDescription: 'I learned version control, repository creation, branch management and project collaboration through GitHub. I mastered concepts like commits, pull requests, merge and collaborative development workflow.',
      programmingTitle: 'Programming Fundamentals',
      programmingDescription: 'I acquired solid knowledge in programming logic, variables, control structures, algorithms and object-oriented programming fundamentals. Essential foundation for software development.',
      mysqlTitle: 'MySQL Workbench',
      mysqlDescription: 'I learned database design, table creation, SQL queries, indexes and optimization. Management of structured information and relationships between entities for robust web applications.',
    },
    contact: {
      title: 'CONTACT ME',
      subtitle: 'If you want to talk to me, fill out the form or write to me through my social networks.',
      name: 'NAME',
      email: 'EMAIL',
      message: 'Message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your@Email',
      messagePlaceholder: 'Write Your Message Here...',
      send: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Message sent! I will contact you soon.',
    },
    references: {
      title: 'References',
      subtitle: 'What people who have worked with me say',
      universityClassmate: 'University Classmate',
      projectMentor: 'Project Mentor',
      projectCollaborator: 'Project Collaborator',
      programmingProfessor: 'Programming Professor',
      featuredTestimonials: 'Featured Testimonials',
      recommendation: 'Recommendation',
      averageRating: 'Average Rating',
      availableReferences: 'Available References',
      ref1Description: 'Excellent team member, very dedicated and always willing to help. His passion for web development is admirable.',
      ref2Description: 'Cristian shows great potential in frontend development. His learning ability and adaptability are exceptional.',
      ref3Description: 'Working with Cristian was a very positive experience. His creativity and technical skills are impressive.',
      ref4Description: 'Outstanding student with great potential. His dedication and curiosity to learn new technologies is remarkable.',
      instagram: 'Instagram',
    },
    githubRepos: {
      title: 'My GitHub Repositories',
      subtitle: 'Explore my projects and contributions on GitHub',
      filterByLanguage: 'Filter by language:',
      allLanguages: 'All languages',
      onlyStarred: 'Only starred (>0)',
      loadMore: 'Load more repositories',
      errorLoading: 'Could not load GitHub repositories.',
      errorDescription: 'This may be due to API limits or connection issues. Try reloading the page.',
      noReposFound: 'No repositories found with the selected filters.',
    },
    projectDetail: {
      projectDescription: 'Project Description',
      mainFeatures: 'Main Features',
      technologiesUsed: 'Technologies Used',
      projectPreview: 'Project preview',
      backToProjects: '← Back to Projects',
      loading: 'Loading project...',
      viewDemo: 'View Demo',
    },
    common: {
      backToHome: '← Back to Home',
    },
  },
  es: {
    nav: {
      home: 'INICIO',
      projects: 'PROYECTOS',
      technologies: 'TECNOLOGÍAS',
      experience: 'EXPERIENCIAS',
      references: 'REFERENCIAS',
      downloadCV: 'DESCARGAR CV',
    },
    hero: {
      title: 'Dr. Cristian Gomez',
      subtitle: 'FUTURO INGENIERO EN SOFTWARE CON PASIÓN POR EL DESARROLLO WEB Y LA CREACIÓN DE PROYECTOS QUE APORTEN VALOR REAL.',
      bullet1: '• APASIONADO POR EL FRONTEND, LA INNOVACIÓN WEB Y EL APRENDIZAJE CONSTANTE.',
      bullet2: '• ENFOCADO EN CREAR PROYECTOS ÚTILES Y CON BUEN DISEÑO.',
      contactMe: 'CONTÁCTAME',
    },
    projects: {
      title: 'Mis Proyectos',
      subtitle: 'Aquí puedes ver algunos de los proyectos en los que he trabajado, desde aplicaciones web hasta herramientas de análisis de datos.',
      seeMore: 'Ver más',
      previous: 'Atrás',
      next: 'Siguiente',
      inDevelopment: 'En desarrollo',
      completed: 'Completado',
      technologies: 'Tecnologías:',
      matchAnalyzer: 'Analizador de Partidos',
      personalExpenseControl: 'Control de Gastos Personales',
      matchDescription: 'Plataforma web que analiza partidos de fútbol en tiempo real, mostrando estadísticas detalladas de jugadores clave, rendimiento del equipo y gráficos interactivos para una mejor comprensión del juego.',
      finTrackDescription: 'Aplicación móvil y web para el control de gastos personales con seguimiento automático de categorías, generación de reportes financieros y herramientas de productividad para una mejor gestión del dinero.',
      helloWorld: '¡HOLA MUNDO!',
    },
    technologies: {
      title: 'Tecnologías',
      subtitle: 'Herramientas y tecnologías que utilizo para crear aplicaciones web modernas y eficientes.',
      languages: 'LENGUAJES',
      languagesDesc: 'Lenguajes de programación para la lógica e interacción de aplicaciones web modernas.',
      frameworks: 'FRAMEWORKS',
      frameworksDesc: 'Herramientas para desarrollo más rápido y aplicaciones modernas y dinámicas.',
      tools: 'HERRAMIENTAS',
      toolsDesc: 'Plataformas para control de versiones, colaboración y despliegue de proyectos.',
      stylesDesign: 'ESTILOS / DISEÑO',
      stylesDesc: 'Tecnologías para interfaces visuales, diseño limpio y experiencia de usuario.',
      alwaysLearning: 'Siempre Aprendiendo',
      alwaysLearningDesc: 'Me mantengo actualizado con las últimas tecnologías y mejores prácticas en desarrollo web, siempre buscando nuevas formas de crear experiencias digitales excepcionales.',
      webDevelopment: 'Desarrollo Web',
      webDevelopmentDesc: 'Tecnologías modernas para crear experiencias digitales excepcionales',
    },
    experience: {
      title: 'Experiencias en Formación',
      gitTitle: 'Curso de Git y GitHub',
      gitDescription: 'Aprendí el control de versiones, creación de repositorios, manejo de ramas y colaboración en proyectos a través de GitHub. Dominé conceptos como commits, pull requests, merge y workflow de desarrollo colaborativo.',
      programmingTitle: 'Fundamentos de Programación',
      programmingDescription: 'Adquirí conocimientos sólidos en lógica de programación, variables, estructuras de control, algoritmos y fundamentos de programación orientada a objetos. Base esencial para el desarrollo de software.',
      mysqlTitle: 'MySQL Workbench',
      mysqlDescription: 'Aprendí diseño de bases de datos, creación de tablas, consultas SQL, índices y optimización. Manejo de información estructurada y relaciones entre entidades para aplicaciones web robustas.',
    },
    contact: {
      title: 'CONTÁCTAME',
      subtitle: 'Si quieres hablar conmigo, completa el formulario o escríbeme por mis redes.',
      name: 'NOMBRE',
      email: 'CORREO',
      message: 'Mensaje',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'Tu@Correo',
      messagePlaceholder: 'Escribe Tu Mensaje Aquí...',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      successMessage: '¡Mensaje enviado! Te contactaré pronto.',
    },
    references: {
      title: 'Referencias',
      subtitle: 'Lo que dicen las personas que han trabajado conmigo',
      universityClassmate: 'Compañera de Universidad',
      projectMentor: 'Mentor de Proyecto',
      projectCollaborator: 'Colaboradora en Proyecto',
      programmingProfessor: 'Profesor de Programación',
      featuredTestimonials: 'Testimonios Destacados',
      recommendation: 'Recomendación',
      averageRating: 'Calificación Promedio',
      availableReferences: 'Referencias Disponibles',
      ref1Description: 'Excelente miembro del equipo, muy dedicado y siempre dispuesto a ayudar. Su pasión por el desarrollo web es admirable.',
      ref2Description: 'Cristian muestra un gran potencial en el desarrollo frontend. Su capacidad de aprendizaje y adaptabilidad son excepcionales.',
      ref3Description: 'Trabajar con Cristian fue una experiencia muy positiva. Su creatividad y habilidades técnicas son impresionantes.',
      ref4Description: 'Estudiante destacado con gran potencial. Su dedicación y curiosidad por aprender nuevas tecnologías es notable.',
      instagram: 'Instagram',
    },
    githubRepos: {
      title: 'Mis Repositorios de GitHub',
      subtitle: 'Explora mis proyectos y contribuciones en GitHub',
      filterByLanguage: 'Filtrar por lenguaje:',
      allLanguages: 'Todos los lenguajes',
      onlyStarred: 'Solo con estrellas (>0)',
      loadMore: 'Cargar más repositorios',
      errorLoading: 'No se pudieron cargar los repositorios de GitHub.',
      errorDescription: 'Esto puede deberse a límites de la API o problemas de conexión. Intenta recargar la página.',
      noReposFound: 'No se encontraron repositorios con los filtros seleccionados.',
    },
    projectDetail: {
      projectDescription: 'Descripción del Proyecto',
      mainFeatures: 'Características Principales',
      technologiesUsed: 'Tecnologías Utilizadas',
      projectPreview: 'Vista previa del proyecto',
      backToProjects: '← Volver a Proyectos',
      loading: 'Cargando proyecto...',
      viewDemo: 'Ver Demo',
    },
    common: {
      backToHome: '← Volver al Inicio',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if there's a saved preference in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}


