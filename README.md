# Maitai Marketing Site (v2) - Landing Page Rebuild (CONCRETE-06-FULL)

This repository contains the source code for the [trymaitai.ai](https://trymaitai.ai) marketing website.

**As of [Current Date], the landing page (`/`) is being rebuilt according to the "CONCRETE-06-FULL" blueprint.** This document reflects the *target* structure and components for this rebuild. Existing components not part of this blueprint will be archived to the `/archive` directory.

## 1. Technology Stack (Largely Unchanged)

| Layer          | Choice                    | Notes                                                    |
|----------------|---------------------------|----------------------------------------------------------|
| Framework      | Next.js 13 (App Router)   | React + file-system routing, edge-ready                  |
| Language       | TypeScript 5.x          | Strict mode (`"strict": true`), `"type": "module"`         |
| Styling        | Tailwind CSS v3           | Custom theme in `tailwind.config.cjs`                    |
| UI Primitives  | Radix UI                  | Accessible, unstyled base components (esp. for Tabs)     |
| Component Kit  | shadcn/ui                 | Radix-powered, Tailwind-themed wrappers                  |
| Icons          | lucide-react              | 1-stroke icon set                                        |
| Animations     | Framer Motion v10         | Used for Hero Carousel, Performance toggles, scrolling   |
| Forms          | React-Hook-Form + Zod     | Client validation + schema sharing (primarily for /demo) |
| Fonts          | Greycliff CF (local OTF)  | Loaded via `@font-face` in `styles/globals.css`          |
| Images         | next/image                | Automatic srcset / WebP / lazy                           |
| Email          | SendGrid v3               | Triggered by `/api/demo` route (unchanged)               |
| Anti-spam      | reCAPTCHA v3              | Token verified in API route (`@google-recaptcha/react`)  |
| Live Chat      | Intercom                  | Via `next/script` in `app/layout.tsx` (unchanged)       |
| SEO            | next-seo                  | Per-page Open Graph & meta (unchanged)                   |
| Error Tracking | Sentry                    | `@sentry/nextjs` (unchanged)                             |
| CI/CD          | GitHub Actions → Vercel   | Lint → type-check → test → preview (unchanged)           |

## 2. Repository File Tree (Target Structure for Landing Page Rebuild)

```
maitai-site-v2/
├── app/
│   ├── layout.tsx                  # Root layout (global styles, font application) - REUSED
│   ├── page.tsx                    # Home page (/) - Renders NEW landing page sections
│   ├── pricing/page.tsx            # Pricing page (/pricing) - Existing, potentially needs style updates
│   ├── careers/page.tsx            # Careers page (/careers) - Existing, potentially needs style updates
│   ├── demo/page.tsx               # Demo page (/demo) - Existing
│   └── api/
│       └── demo/route.ts           # API route for demo requests - REUSED
├── components/
│   ├── Header.tsx                  # Site header - REUSED (potentially minor scroll effect adjustments)
│   ├── Footer.tsx                  # Site footer - REUSED (unchanged as per blueprint)
│   │
│   ├── HeroCarousel/               # NEW: Section #1
│   │   ├── HeroCarousel.tsx
│   │   └── HeroCard.tsx
│   ├── PerformanceSection/         # NEW: Section #2
│   │   ├── PerformanceSection.tsx
│   │   ├── ToggleTabs.tsx
│   │   └── MetricCard.tsx
│   ├── ComplianceStrip.tsx         # NEW: Section #3
│   ├── BlogEventsCTA.tsx           # NEW: Section #4
│   ├── FeatureScroller/            # NEW: Section #5
│   │   ├── FeatureScroller.tsx
│   │   └── FeatureItem.tsx
│   ├── SignUpBanner.tsx            # NEW: Section #6 (Relabel/reuse of old CTA component logic likely)
│   ├── DocsAndCode.tsx             # NEW: Section #7 (placeholder - implement content from previous design)
│   ├── PartnerGrid.tsx             # NEW: Section #8
│   │
│   └── ui/                         # shadcn-generated primitives - REUSED
├── content/                        # ARCHIVED
│   └── trymaitai_content.md        # ARCHIVED
├── hooks/                          # Custom React hooks - REUSED as needed
│   ├── useIsMobile.ts
│   └── useVoiceInput.ts            # Placeholder
├── lib/
│   ├── heroCards.ts                # NEW: Data for HeroCarousel
│   ├── metrics.ts                  # NEW: Data for PerformanceSection
│   ├── features.ts                 # NEW: Data for FeatureScroller
│   ├── partners.ts                 # NEW: Data for PartnerGrid
│   │
│   ├── mailer.ts                   # Placeholder for SendGrid helper - REUSED
│   ├── recaptcha.ts                # Placeholder for reCAPTCHA verify helper - REUSED
│   └── utils.ts                    # shadcn/ui utility (cn function) - REUSED
├── public/
│   ├── fonts/Greycliff-*.otf     # Local font files - REUSED
│   ├── logos/                      # Site logos (Header/Footer) - REUSED
│   └── img/                        # NEW: Specific assets for landing page sections
│       ├── compliance/             # (soc2.svg, hipaa.svg, ccpa.svg)
│       ├── partners/               # (*.svg or *.png)
│       ├── metrics/                # (placeholder svgs/charts)
│       └── hero/                   # (event thumbs, card illustrations etc.)
├── styles/
│   └── globals.css                 # @font-face, Tailwind base, shadcn vars - REUSED
├── archive/                        # NEW: Deprecated components/assets moved here
├── .github/workflows/ci.yml        # CI pipeline - REUSED
├── .gitignore
├── components.json                 # shadcn/ui CLI config - REUSED
├── next-env.d.ts
├── next.config.js                  # Next.js config - REUSED
├── next-seo.config.mjs             # Default SEO config - REUSED
├── package.json                    # Note: "type": "module" - REUSED
├── package-lock.json / node_modules/
├── postcss.config.cjs              # PostCSS config - REUSED
├── README.md                       # This file (Updated)
├── tailwind.config.cjs             # Tailwind config - REUSED (May need minor breakpoint/theme tweaks)
└── tsconfig.json                   # TypeScript config - REUSED
```

**Archived Components/Assets:**
The following components, assets, and hooks from the previous structure are being deprecated/removed for the landing page rebuild and have been moved to `/archive` (or deleted):
*   **Components:**
    *   `components/Hero.tsx`
    *   `components/HeroMaitai.tsx`
    *   `components/OrchestratorConstellation.tsx`
    *   `components/Metrics.tsx`
    *   `components/FeaturesGrid.tsx`
    *   `components/QuickStart.tsx`
    *   `components/PartnersMarquee.tsx`
    *   `components/HeroPanel.tsx`
    *   `components/HeroActively.tsx`
    *   `components/IntentPlayground.tsx`
    *   `components/FocusModeWrappers.tsx`
    *   `components/InteractiveDemos.tsx`
    *   `components/LoRASwap.tsx`
    *   `components/PortalScrub.tsx`
    *   `components/ComplianceSection.tsx`
    *   `components/ModeToggle.tsx` (Deleted, not archived)
*   **Public Assets:**
    *   `public/animations/`
    *   `public/code-blocks/`
    *   `public/compliance-icons/`
    *   `public/partner-companies/`
*   **Library Files:**
    *   `lib/hero-nodes.ts`
    *   `lib/hero-utils.ts`
*   **Hooks:**
    *   `hooks/useFocusModeStore.ts` (Deleted, not archived)
*   **Content:**
    *   `content/trymaitai_content.md`

### Public Assets (`/public/` directory - Target Structure)

- **`/fonts/`**: Contains local `.otf` files for Greycliff CF (unchanged).
- **`/logos/`**: Includes primary site logos for Header/Footer, favicon, etc. (unchanged).
- **`/img/`**: **NEW** location for landing-page-specific visual assets:
    - **`/img/compliance/`**: Contains `soc2.svg`, `hipaa.svg`, `ccpa.svg` for the `ComplianceStrip`.
    - **`/img/partners/`**: Contains partner logos (`*.svg`, `*.png`) for the `PartnerGrid`.
    - **`/img/metrics/`**: Contains placeholder charts/SVGs for `PerformanceSection`.
    - **`/img/hero/`**: Contains event thumbnails, card illustrations, etc., for `HeroCarousel`.

Assets under `public/img/` should be optimized using `next/image`.

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

Create a `.env.local` file in the root directory by copying `.env.example` or creating it from scratch. Add the following variables:

```
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx

# SendGrid Email Service
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM=demo@trymaitai.ai

# Sentry Error Tracking
SENTRY_DSN=https://...

# Intercom Chat Widget
NEXT_PUBLIC_INTERCOM_APP_ID=xxx
```

Obtain the actual keys from the respective services (Google reCAPTCHA, SendGrid, Sentry, Intercom).

## 4. Key Configuration Files & Concepts (Largely Unchanged)

- **`package.json`**: `"type": "module"` remains crucial.
- **Config File Extensions**: `.cjs` for CommonJS files (`tailwind.config.cjs`, `postcss.config.cjs`) remains necessary.
- **`styles/globals.css`**: Continues to handle `@font-face`, Tailwind directives, shadcn theming, and base styles.
- **`tailwind.config.cjs`**: Defines theme, fonts (`'Greycliff CF'`), and content paths. May require minor updates for new component paths or styles.
- **`postcss.config.cjs`**: Unchanged.
- **`app/layout.tsx`**: Root structure, imports `globals.css`. Font loading strategy remains the same.
- **`components.json`**: shadcn/ui config, unchanged.
- **`next-seo.config.mjs`**: Default SEO settings, unchanged.
- **`.github/workflows/ci.yml`**: CI pipeline, unchanged.

## 5. Scripts & Tooling (Unchanged)

| Command          | What it Does                                  |
|------------------|-----------------------------------------------|
| `npm run dev`    | Starts the Next.js dev server (localhost:3000) |
| `npm run build`  | Builds the application for production + type-check |
| `npm run start`  | Starts the production server                  |
| `npm run lint`   | Runs ESLint and Prettier checks               |
| `npm run format` | Formats code with Prettier                    |
| `npm run test`   | Runs unit tests with Vitest                   |
| `npm run analyze`| Runs bundle analyzer (requires build profile) |

## 6. Contribution Workflow (Unchanged)

Follow the workflow outlined in the technical blueprint (Section 8):
1.  Branch from `main` (`feat/<topic>`).
2.  Commit using Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
3.  Open a Pull Request against `main`. CI checks (lint, build, test) will run automatically. Vercel preview deployment should be configured.
4.  Require at least one approval + green CI to merge.
5.  Merging to `main` triggers production deployment via Vercel.

**Important Notes:**
*   **`next/link` `legacyBehavior`:** Continue to check `Link` components after any codemods.
*   **Environment Variables:** Ensure `.env.local` is set up correctly.
*   **Blueprint:** Refer to the "CONCRETE-06-FULL" blueprint for detailed component specifications.

## 7. Deployment (Unchanged)

Deployment is handled via Vercel, connected to this GitHub repository. See the blueprint (Section 9) for Vercel project setup and environment variable configuration.

## 8. Email Templates (Unchanged)

The following HTML email templates are available in the `lib/email-templates/` directory:

*   `demo-request-notification.html`: Sent internally when a new demo request is submitted via the website form.
    *   Used by: `lib/mailer.ts` (placeholder)
    *   Requires data: `firstName`, `lastName`, `businessEmail`, `companyName`, `companySize`, `numSDRsAEs`, `whyMaitai` (optional), `currentDate`.

---
*Add new templates to this list as they are created.*
