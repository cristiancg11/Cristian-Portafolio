'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Experiencias() {
  const { t } = useLanguage();
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        {t.experience.title}
      </h1>
      <ul className="space-y-4 text-lg text-gray-300">
        <li>📌 {t.experience.gitTitle} – Version control and repository management</li>
        <li>📌 {t.experience.programmingTitle} – Algorithms and logic</li>
        <li>📌 {t.experience.mysqlTitle} – Database management</li>
      </ul>
    </section>
  );
}
