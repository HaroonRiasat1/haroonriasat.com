# haroonriasat.com

Portfolio of Haroon Riasat, a full-stack and AI software engineer in Turku, Finland. Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, Motion for React and Lucide.

- **Live:** https://haroonriasat.com
- **AI resume assistant:** https://ask.haroonriasat.com ([source](https://github.com/HaroonRiasat1/resume-chatbot))

## What's here

- `lib/content.ts`: every fact the site shows. It mirrors the resume behind ask.haroonriasat.com; never add a claim that isn't in the resume.
- `app/page.tsx`: the homepage. Hero, projects bento, experience timeline, AI chat, expertise, job-fit checker, education, "Beyond the Code", Medium posts and contact.
- `app/projects/[slug]`: case-study pages, statically generated for projects that have a `caseStudy`.
- `lib/medium.ts`: latest Medium posts, fetched on the server and revalidated hourly, with a static fallback.
- `lib/api.ts`: the chat and fit checker call `https://ask.haroonriasat.com/api/chat` and `/api/fit` (or `http://localhost:5190` in development). That backend only allows this domain and `localhost:5195` through CORS.
- SEO: metadata, Open Graph image (`app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt` and Person/CreativeWork structured data.
- `public/Haroon_Riasat_Resume.pdf`: the downloadable CV, without a phone number since the site is public.

Design tokens live in `app/globals.css` (dark by default, light via the toggle). Animations respect `prefers-reduced-motion`, and the hero animates in CSS so the first screen never waits for JavaScript.

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5195. For the AI features, also run the resume-chatbot dev server on port 5190.

## Deploy

Vercel builds it as a Next.js app (`vercel.json` sets the framework, since the project was first imported as a static site).
