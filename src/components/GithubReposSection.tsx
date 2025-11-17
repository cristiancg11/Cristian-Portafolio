import { fetchGitHubRepos } from '@/lib/github';
import GithubReposClient from './GithubReposClient';

export default async function GithubReposSection() {
  const repos = await fetchGitHubRepos('cristiancg11');

  return <GithubReposClient initialRepos={repos} />;
}
