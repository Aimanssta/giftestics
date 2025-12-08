# Deployment Guide

This repository is prepared for deployment to Vercel (static Vite build).

Local quick steps

- Install deps and build locally:

```powershell
npm install
npm run build
```

- Serve locally to verify (optional):

```powershell
npx serve dist
```

Create a remote GitHub repo and push

1. Create a repository on GitHub (via website) named e.g. `giftestics`.
2. Push your local repo to GitHub (run in project root):

```powershell
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Deploy options

- Option A — Connect GitHub repo to Vercel (recommended):
  - Go to https://vercel.com/new and import the GitHub repository.
  - Vercel will detect the project as a static Vite app. Ensure build command is `npm run build` and output directory is `dist`.

- Option B — Deploy from your machine with Vercel CLI:

```powershell
npm i -g vercel
vercel login
vercel --prod
```

Notes
- If you want me to create the GitHub repository and push it for you, provide a GitHub personal access token (scopes: `repo`) or authorize via GitHub CLI/desktop, and I can proceed.
- If you want a fully automatic Vercel deployment I can run `vercel` here, but you will need to authenticate interactively.
