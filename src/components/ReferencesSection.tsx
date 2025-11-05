'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReferencesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('referencias');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const references = [
    {
      id: 1,
      name: "Andres Parra",
      role: t.references.universityClassmate,
      description: "Excellent team member, very dedicated and always willing to help. His passion for web development is admirable.",
      avatar: "",
      contact: "maria.gonzalez@email.com",
      linkedin: "https://linkedin.com/in/mariagonzalez",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: t.references.projectMentor,
      description: "Cristian shows great potential in frontend development. His learning ability and adaptability are exceptional.",
      avatar: "",
      contact: "carlos.rodriguez@email.com",
      linkedin: "https://linkedin.com/in/carlosrodriguez",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: t.references.projectCollaborator,
      description: "Working with Cristian was a very positive experience. His creativity and technical skills are impressive.",
      avatar: "",
      contact: "ana.martinez@email.com",
      linkedin: "https://linkedin.com/in/anamartinez",
      rating: 5
    },
    {
      id: 4,
      name: "Dr. Luis Pérez",
      role: t.references.programmingProfessor,
      description: "Outstanding student with great potential. His dedication and curiosity to learn new technologies is remarkable.",
      avatar: "",
      contact: "luis.perez@universidad.edu",
      linkedin: "https://linkedin.com/in/luisperez",
      rating: 5
    }
  ];

  return (
    <section id="referencias" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
      
      <div className="relative z-10 w-full max-w-7xl px-4">
        <h1 className={`text-4xl font-bold text-orange-500 mb-4 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {t.references.title}
        </h1>
        <p className={`text-gray-400 text-center mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {t.references.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {references.map((ref, index) => (
            <div
              key={ref.id}
              className={`group relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 hover:border-orange-500/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredCard === ref.id ? 'scale-105 shadow-2xl border-orange-500/50' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(ref.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Header with avatar and name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={ref.avatar}
                      alt={ref.name}
                      className="w-16 h-16 rounded-full border-2 border-orange-500/30 group-hover:border-orange-500 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">★</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {ref.name}
                    </h3>
                    <p className="text-orange-500 font-semibold text-sm">
                      {ref.role}
                    </p>
                    
                    {/* Rating con estrellas */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(ref.rating)].map((_, i) => (
                        <span key={i} className="text-orange-500 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  &ldquo;{ref.description}&rdquo;
                </p>
                
                {/* Contact */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${ref.contact}`}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 text-sm"
                    >
                      <span className="text-lg">📧</span>
                      Email
                    </a>
                    <a
                      href={ref.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 text-sm"
                    >
                      <span className="text-lg">💼</span>
                      LinkedIn
                    </a>
                  </div>
                  
                  <div className="text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">&rdquo;</span>
                  </div>
                </div>
              </div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        
        {/* Additional testimonials section */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">💬 {t.references.featuredTestimonials}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                <div className="text-gray-300 text-sm">{t.references.recommendation}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">5.0</div>
                <div className="text-gray-300 text-sm">{t.references.averageRating}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">4+</div>
                <div className="text-gray-300 text-sm">{t.references.availableReferences}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


