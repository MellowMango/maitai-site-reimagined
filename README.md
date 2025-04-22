# Maitai Marketing Site (v2)

This repository contains the source code for the rebuilt [trymaitai.ai](https://trymaitai.ai) marketing website, based on the technical blueprint (Version 0.1 / 2025-04-21).

## 1. Technology Stack

| Layer          | Choice                    | Notes                                           |
|----------------|---------------------------|-------------------------------------------------|
| Framework      | Next.js 13 (App Router)   | React + file-system routing, edge-ready         |
| Language       | TypeScript 5.x          | Strict mode (`"strict": true`)                 |
| Styling        | Tailwind CSS v3           | Custom theme in `tailwind.config.js`            |
| UI Primitives  | Radix UI                  | Accessible, unstyled base components            |
| Component Kit  | shadcn/ui                 | Radix-powered, Tailwind-themed wrappers         |
| Icons          | lucide-react              | 1-stroke icon set                               |
| Animations     | Framer Motion v10         | Scroll/entrance + micro-interactions            |
| Forms          | React-Hook-Form + Zod     | Client validation + schema sharing              |
| Fonts          | Greycliff CF (local OTF)  | Loaded via `next/font/local` in `app/layout.tsx` |
| Images         | next/image                | Automatic srcset / WebP / lazy                  |
| Email          | SendGrid v3               | Triggered by `/api/demo` route                   |
| Anti-spam      | reCAPTCHA v3              | Token verified in API route (`@google-recaptcha/react`) |
| SEO            | next-seo                  | Per-page Open Graph & meta                      |
| Error Tracking | Sentry                    | `@sentry/nextjs`                                |
| CI/CD          | GitHub Actions → Vercel   | Lint → type-check → test → preview              |

## 2. Repository File Tree (Condensed)

```
maitai-site-v2/
├── app/
│   ├── layout.tsx                  # Root layout (Greycliff font, global styles)
│   ├── page.tsx                    # Home page (/)
│   ├── pricing/page.tsx            # Pricing page (/pricing)
│   ├── careers/page.tsx            # Careers page (/careers)
│   ├── demo/page.tsx               # Demo page (/demo)
│   └── api/
│       └── demo/route.ts           # API route for demo requests
├── components/
│   ├── Header.tsx                  # Placeholder
│   ├── Footer.tsx                  # Placeholder
│   ├── Hero.tsx                    # Placeholder
│   ├── Metrics.tsx                 # Placeholder
│   ├── FeaturesGrid.tsx            # Placeholder
│   ├── QuickStart.tsx              # Placeholder
│   ├── PricingTable.tsx            # Placeholder
│   └── ui/                         # shadcn-generated primitives (e.g., button, dialog)
├── content/
│   └── trymaitai_content.md        # Placeholder for Markdown/JSON content
├── lib/
│   ├── mailer.ts                   # Placeholder for SendGrid helper
│   ├── recaptcha.ts                # Placeholder for reCAPTCHA verify helper
│   └── utils.ts                    # shadcn/ui utility (cn function)
├── public/
│   ├── fonts/Greycliff-*.otf     # Local font files
│   ├── logos/                      # Site logos
│   ├── icons/                      # Placeholder for icon assets
│   └── animations/                 # Animation assets
├── styles/
│   └── globals.css                 # Tailwind base + shadcn CSS variables
├── .github/workflows/
│   └── ci.yml                      # GitHub Actions CI pipeline (Lint, Build, Test)
├── .gitignore
├── components.json                 # shadcn/ui CLI configuration
├── next-env.d.ts
├── next.config.js                  # Next.js configuration
├── next-seo.config.mjs             # Default next-seo configuration
├── package.json
├── package-lock.json / node_modules/
├── postcss.config.mjs              # PostCSS configuration (for Tailwind)
├── README.md                       # This file
├── tailwind.config.js              # Tailwind CSS configuration (custom theme)
└── tsconfig.json                   # TypeScript configuration (strict mode)
```

## 3. Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd maitai-site-v2
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory by copying `.env.example` (if one exists) or creating it from scratch. Add the following variables based on the blueprint:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM=demo@trymaitai.ai
SENTRY_DSN=https://...
```

Obtain the actual keys from the respective services (Google reCAPTCHA, SendGrid, Sentry).

## 4. Key Configuration Files & Concepts

- **`app/layout.tsx`**: Defines the root HTML structure, loads global CSS (`styles/globals.css`), and configures the primary font (`Greycliff CF`) using `next/font/local`. The font is available via the `--font-greycliff` CSS variable.
- **`tailwind.config.js`**: Configures Tailwind CSS. Includes paths for purging, defines the `fontFamily.sans` to use `--font-greycliff`, and sets up theme extensions (colors, border radius, keyframes) compatible with `shadcn/ui`.
- **`styles/globals.css`**: Imports Tailwind's base, components, and utilities. Defines root CSS variables for colors and theming, used by `shadcn/ui` components.
- **`components.json`**: Configures the `shadcn/ui` CLI, specifying paths for components, utils, Tailwind config, and global CSS.
- **`components/ui/`**: This directory will contain UI primitives added via the `shadcn/ui` CLI (e.g., `npx shadcn@latest add button`). These components are built using Radix UI and styled with Tailwind.
- **`lib/utils.ts`**: Contains the `cn` utility function for conditionally applying Tailwind classes, commonly used with `shadcn/ui`.
- **`next-seo.config.mjs`**: Sets default SEO metadata (title, description, Open Graph tags) used by `next-seo`.
- **`.github/workflows/ci.yml`**: Defines the continuous integration pipeline run on GitHub Actions for pull requests and pushes to `main`. It installs dependencies, lints, builds, and runs tests.

## 5. Scripts & Tooling

| Command          | What it Does                                  |
|------------------|-----------------------------------------------|
| `npm run dev`    | Starts the Next.js dev server (localhost:3000) |
| `npm run build`  | Builds the application for production + type-check |
| `npm run start`  | Starts the production server                  |
| `npm run lint`   | Runs ESLint and Prettier checks               |
| `npm run format` | Formats code with Prettier                    |
| `npm run test`   | Runs unit tests with Vitest                   |
| `npm run analyze`| Runs bundle analyzer (requires build profile) |

## 6. Contribution Workflow

Follow the workflow outlined in the technical blueprint (Section 8):
1.  Branch from `main` (`feat/<topic>`).
2.  Commit using Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
3.  Open a Pull Request against `main`. CI checks (lint, build, test) will run automatically. Vercel preview deployment should be configured.
4.  Require at least one approval + green CI to merge.
5.  Merging to `main` triggers production deployment via Vercel.

## 7. Deployment

Deployment is handled via Vercel, connected to this GitHub repository. See the blueprint (Section 9) for Vercel project setup and environment variable configuration.
