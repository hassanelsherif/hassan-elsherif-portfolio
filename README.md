# Hassan El-Sherif — Cloud / DevOps Portfolio

Personal portfolio website for Hassan El-Sherif, Cloud & Infrastructure Engineer.
Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Email | Resend (server-side only) |
| Testing | Vitest + Playwright |
| CI | GitHub Actions |
| Hosting | Vercel (Hobby) |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For email delivery | Server-side Resend API key |
| `CONTACT_TO_EMAIL` | Optional | Defaults to `hassanelsherif73x@gmail.com` |
| `NEXT_PUBLIC_BASE_URL` | For SEO | Full public URL, no trailing slash |

**Never commit `.env.local` or any file containing real secrets.**

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server (after build)
npm run lint       # ESLint
npm run typecheck  # TypeScript check (no emit)
npm run test       # Unit tests (Vitest)
npm run test:e2e   # E2E tests (Playwright, requires running server)
npm run format     # Prettier
```

## Project structure

```
src/
  app/                  # Next.js App Router pages
    api/contact/        # Server-side contact form handler
    about/
    experience/
    projects/
      [slug]/           # Dynamic project detail pages
    contact/
  components/
    layout/             # Header, Footer, ThemeProvider
    ui/                 # Badge, StatusBadge, SectionHeading, ThemeToggle
    projects/           # ProjectCard, ProjectFilter
    contact/            # ContactForm
  content/              # Typed local content (no CMS)
    profile.ts
    experience.ts
    projects.ts
  lib/
    utils.ts
    validation.ts       # Zod schemas
    email.ts            # Server-only email sender
  types/
    index.ts
public/
  resume/               
tests/
  unit/
  e2e/
.github/workflows/
  ci.yml
```


## Updating content

- **Profile / skills:** `src/content/profile.ts`
- **Experience / certifications / education:** `src/content/experience.ts`
- **Projects:** `src/content/projects.ts` — update `status`, `repositoryUrl`, `architectureDiagram` as lab projects are completed

## Deployment

1. Push to GitHub.
2. Connect repository to Vercel.
3. Set environment variables in Vercel project settings (never in code).
4. Set `NEXT_PUBLIC_BASE_URL` to your assigned subdomain.
5. Verify contact form email delivery end-to-end before launch.

## Truthfulness note

- Docker / Kubernetes / Terraform / CI/CD items are labelled as personal lab demonstrations, not production employment claims.
- No employer customer names, internal IPs, or proprietary diagrams are included.
- Project case study pages show an "in progress" or "planned" banner until evidence gate requirements are met.
