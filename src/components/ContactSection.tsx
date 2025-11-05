'use client';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
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

    const element = document.getElementById('contacto');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    alert(t.contact.successMessage);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      id: 'github',
      name: 'GitHub',
      icon: <FaGithub size={24} />,
      url: 'https://github.com/cristiancg11',
      color: 'hover:bg-gray-700',
      description: 'My projects and code'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      url: 'www.linkedin.com/in/cristian-gomez-9935a4311',
      color: 'hover:bg-blue-600',
      description: 'My professional profile'
    },
    {
      id: 'email',
      name: 'Email',
      icon: '📧',
      url: 'cristiansantacruzz123321@gmail.com',
      color: 'hover:bg-red-600',
      description: 'Direct contact'
    },
    
  ];

  return (
    <section id="contacto" className="min-h-screen dark:bg-black light:bg-white dark:text-white light:text-gray-900 py-8 sm:py-12 relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="dark:text-white light:text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            {t.contact.subtitle}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white light:text-gray-900">
            {t.contact.title}
          </h1>
        </div>
        
        <div className={`dark:bg-gray-800 light:bg-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium dark:text-white light:text-gray-900 mb-2">{t.contact.name}</label>
                <input
                  type="text"
                  name="name"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 sm:p-4 rounded-lg dark:bg-gray-700 light:bg-gray-200 dark:text-white light:text-gray-900 dark:border-gray-600 light:border-gray-300 focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium dark:text-white light:text-gray-900 mb-2">{t.contact.email}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 sm:p-4 rounded-lg dark:bg-gray-700 light:bg-gray-200 dark:text-white light:text-gray-900 dark:border-gray-600 light:border-gray-300 focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium dark:text-white light:text-gray-900 mb-2">{t.contact.message}</label>
              <textarea
                name="message"
                placeholder={t.contact.messagePlaceholder}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-lg dark:bg-gray-700 light:bg-gray-200 dark:text-white light:text-gray-900 dark:border-gray-600 light:border-gray-300 focus:border-orange-500 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-black font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {t.contact.sending}
                </div>
              ) : (
                t.contact.send
              )}
            </button>
          </form>
        </div>
        
        {/* Social media */}
        <div className={`flex justify-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { name: "Instagram", icon: "📷", url: "https://www.instagram.com/cristiancg1111/" },
            { name: "Github", icon: "🐙", url: "https://github.com/cristiancg11" },
            { name: "Linkedin", icon: "💼", url: "https://linkedin.com/in/cristian" },
            { name: "Gmail", icon: "📧", url: "https://mail.google.com/mail/u/0/#inbox" }
          ].map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target={social.name !== 'Gmail' ? '_blank' : undefined}
              rel={social.name !== 'Gmail' ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center gap-1 sm:gap-2 dark:text-white light:text-gray-900 hover:text-orange-500 transition-all duration-300 hover:scale-110"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 dark:bg-white light:bg-gray-200 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300">
                <span className="text-black text-lg sm:text-xl">{social.icon}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

