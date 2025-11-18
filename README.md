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

## Images and Media Assets

The portfolio uses images for projects and experiences sections. All images are stored in the `/public` directory and organized by category.

### Project Images

Project images are located in `/public/projects/`:
- `matchinsight-card.svg` - Image for MatchInsight project
- `fintrack-card.svg` - Image for FinTrack project
- `placeholder-project.svg` - Placeholder image for projects without a specific image

**To replace project images:**
1. Add your image file to `/public/projects/` with the naming convention: `<project-slug>-card.<extension>`
2. Supported formats: `.svg`, `.png`, `.jpg`, `.webp`
3. Recommended size: 600x400px for optimal display
4. Update the `image` property in the project object in `src/components/ProjectsSection.tsx` or `src/app/proyectos/[id]/page.tsx`

### Experience Images

Experience images are located in `/public/experiences/`:
- `github-exp.svg` - Image for Git & GitHub experience
- `fundamentos-exp.svg` - Image for Programming Fundamentals experience
- `mysql-exp.svg` - Image for MySQL Workbench experience
- `teamwork-exp.svg` - Image for Teamwork experience
- `placeholder-exp.svg` - Placeholder image for experiences without a specific image

**To replace experience images:**
1. Add your image file to `/public/experiences/` with the naming convention: `<experience-slug>-exp.<extension>`
2. Supported formats: `.svg`, `.png`, `.jpg`, `.webp`
3. Recommended size: 400x300px for optimal display
4. Update the `image` property in the experience object in `src/components/ExperienceSection.tsx`

### Image Optimization

All images are automatically optimized by Next.js using the `next/image` component. The component provides:
- Automatic image optimization
- Lazy loading
- Responsive images with proper sizing
- WebP format support when available

**Note:** When adding new images, ensure they are free of copyright restrictions or you have proper licensing. SVG images are recommended for scalability and smaller file sizes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
