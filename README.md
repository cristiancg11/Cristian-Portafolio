This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## GitHub Repositories Section

The portfolio includes a dynamic section that fetches and displays GitHub repositories. To use this feature:

### Configuration

1. Create a `.env.local` file in the root directory (if it doesn't exist).

2. Add your GitHub Personal Access Token (optional but recommended to avoid rate limits):

```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

### Getting a GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `public_repo` scope (or `repo` for private repos)
3. Copy the token and add it to `.env.local`

### Features

- Fetches public repositories from GitHub API
- Displays repository name, description, language, stars, and last update date
- Filter by programming language
- Toggle to show only starred repositories (>0 stars)
- Lazy loading with "Load more" button (shows 12 repos initially)
- Responsive design (grid on desktop, list on mobile)

### Default Username

By default, the section fetches repositories from `cristiancg11`. To change this, modify the username in `src/components/GithubReposSection.tsx`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
