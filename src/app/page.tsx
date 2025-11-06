import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ExperienceSection from '@/components/ExperienceSection';
import ReferencesSection from '@/components/ReferencesSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <TechnologiesSection />
      <ExperienceSection />
      <ReferencesSection />
      <ContactSection />
    </main>
  );
}