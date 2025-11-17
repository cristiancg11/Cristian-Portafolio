export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
  updated_at: string;
}

export async function fetchGitHubRepos(username: string = 'cristiancg11'): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        cache: 'no-store', // Force fresh fetch in production
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error ${response.status}:`, errorText);
      // Return empty array instead of throwing to prevent page crash
      return [];
    }

    const repos: GitHubRepo[] = await response.json();
    
    if (!Array.isArray(repos)) {
      console.error('GitHub API returned non-array response:', repos);
      return [];
    }
    
    // Sort by pushed_at (most recent first)
    return repos.sort((a, b) => {
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return empty array to prevent page crash
    return [];
  }
}

