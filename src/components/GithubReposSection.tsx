import { fetchGitHubRepos } from '@/lib/github';
import GithubReposClient from './GithubReposClient';

export default async function GithubReposSection() {
  try {
    const repos = await fetchGitHubRepos('cristiancg11');
    
    // Si no hay repos, aún mostramos la sección con mensaje
    return <GithubReposClient initialRepos={repos} />;
  } catch (error) {
    console.error('Error in GithubReposSection:', error);
    // Retornar componente con array vacío para que muestre el estado vacío
    return <GithubReposClient initialRepos={[]} />;
  }
}
