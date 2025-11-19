import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ExperienceSection from '@/components/ExperienceSection';
import GithubReposSection from '@/components/GithubReposSection';
import ReferencesSection from '@/components/ReferencesSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechnologiesSection />
      <ExperienceSection />
      <GithubReposSection />
      <ReferencesSection />
      <ContactSection />
    </main>
  );
}