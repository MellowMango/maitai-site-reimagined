# sprint.md ─ Maitai Marketing Site v2
# Goal: ship a production‑ready rewrite of trymaitai.ai on Next 13,
#       marrying Maitai's brand assets with the polish of actively.ai.
# Breakdown is by **segments** (parallel‑friendly chunks), not calendar days.

────────────────────────────────────────────────────────────────────────────
SEGMENT 0  | REPO & ENV SETUP
────────────────────────────────────────────────────────────────────────────
[✓] pnpm init && pnpm add next@latest react react-dom tailwindcss@latest \
  radix-ui framer-motion lucide-react @hookform/resolvers zod react-hook-form \
  @vercel/analytics next-seo
[✓] npx tailwindcss init -p   # Created tailwind.config.js & postcss.config.mjs manually
[✓] Scaffold file tree per ✨ "Maitai Marketing Site Docs" textdoc
[✓] Configure `next.config.js` → images domains, React strict, etc. # Created config, strict mode set
[ ] Add `.env.example` with all keys (SendGrid, reCAPTCHA, Sentry…)
[ ] Commit baseline & push → CI passes, Vercel preview deploys

────────────────────────────────────────────────────────────────────────────
SEGMENT 1  | CORE LAYOUT & THEME
────────────────────────────────────────────────────────────────────────────
files: app/layout.tsx, components/Header.tsx, components/Footer.tsx, tailwind.config.js

Header.tsx
  [✓] Fixed, z-50, transparent → dark pill on scroll (50 px threshold) - Refined 2024-05-16
  [✓] Logo swap: /logos/primary.svg ↔ /logos/logo-all-white.svg - Refined 2024-05-16
  [✓] Nav links: Features, Pricing, Docs (external), Careers
  [✓] Single CTA: Get a Demo (darkPill ↔ lightPill variants) - Refined 2024-05-16
  [✓] Mobile: Radix Popover slide-down menu # Using shadcn Sheet

Footer.tsx
  [✓] 3-column grid: Product | Company | Resources
  [✓] Left column: Maitai logo + 3 social icons (SVGs in /public/icons/) # Used lucide icons as placeholders
  [✓] Bottom bar: © 2025 Maitai Inc., thin top border (#E5E7EB) # Used gray-700 border

Tailwind theme
  [✓] Colors: Lagoon #255D70, Lime #21B892, MintCream #F2FBF9,
            VampireBlack #090F0D, Pineapple #FFDB6A, Rum #EA5F40
  [✓] Font-family.sans → 'Greycliff CF' # Uses font name from @font-face
  [ ] Safelist dynamic classes for header scroll swap # Placeholder added, needs verification/population if needed

Checklist
[✓] Sticky header scroll flip works (inspect scrollY console) # Basic logic implemented
[✓] Global container: `.container mx-auto px-6 lg:px-8` # Implemented in Header/Footer
[✓] `<main className="pt-16">` offset for header height # Added to layout.tsx

────────────────────────────────────────────────────────────────────────────
SEGMENT 2  | HERO + METRICS STRIP
────────────────────────────────────────────────────────────────────────────
files: components/Hero.tsx, components/Metrics.tsx

Hero.tsx
  [✓] Two‑column (`lg:grid-cols-2`) inside container - Changed to single centered column
  [✓] Left: H1 48 px "AI With An Immune System"
  [✓] Subhead 18 px (concise copy)
  [✓] CTA buttons (reuse Header Button.tsx) - Adjusted variants for light bg
  [✓] Right: `<motion.img />` immune‑system.svg fade/slide in - Removed image for now
  [✓] Mobile: columns stack (image below copy) - N/A (single column)

Metrics.tsx
  [✓] Dark background #090F0D, full‑width section - Used bg-maitai-vampire-black
  [✓] Horizontal scroll container (`overflow-x-auto` + `snap-x`) - Implemented w/ scrollbar-hide
  [✓] Three cards (Threat Accuracy 99.9%, < 50 ms, 70 % cost ↓) - Implemented
        card: 240 w, rounded-lg shadow-lg bg-[#111] - Used w-60/w-72, bg-gray-900/60
  [✓] Icons from lucide-react (ShieldCheck, Clock, BarChart)
  [✓] `whileInView` pop‑in stagger (Framer) - Implemented

Checklist
[✓] Cards snap‑stop on mobile - Used snap-mandatory
[✓] A11y: `role="region" aria-label="Performance metrics"` - Added

────────────────────────────────────────────────────────────────────────────
SEGMENT 3  | FEATURES GRID
────────────────────────────────────────────────────────────────────────────
files: components/FeaturesGrid.tsx

• Intro block:
      micro‑label "EVERYTHING YOU NEED" Pineapple uppercase 12 px
      H2 32 px "Features"
      Body copy center‑aligned 18 px
• Grid: `grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12`
  cards:
    bg-white rounded-lg p-6 shadow-lg flex gap-4
    icon (lucide) 32 px
    title 18 px GCF Demi
    body 18 px / 1.6
• Pillars: Robustness (Shield‑Check), Speed (Zap), Cost‑Effectiveness (Badge‑Dollar),
           Observability (Camera)

Checklist
☐ Hover lift: translate‑y‑1, shadow‑xl
☐ All icons use Tint Lagoon for stroke

────────────────────────────────────────────────────────────────────────────
SEGMENT 4  | QUICK‑START CALLOUT
────────────────────────────────────────────────────────────────────────────
files: components/QuickStart.tsx

• MintCream section `bg-MintCream`
• Title 32 px "Get Started in Minutes" + 18 px body
• Code block: dark token, font‑mono, rounded-lg shadow-lg
• Secondary CTA: "Read the Docs →" outline Lagoon

Checklist
☐ next/image for lightbulb illustration (existing asset)
☐ Copy is selectable, no horizontal scroll on small screens

────────────────────────────────────────────────────────────────────────────
SEGMENT 5  | PRICING PAGE & COMPONENT
────────────────────────────────────────────────────────────────────────────
files: pricing/page.tsx, components/PricingTable.tsx

PricingTable
  • shadcn/ui Tabs – `Pro` | `Custom`
  • Each panel returns a `<PlanCard />`
    PlanCard props: title, price, ctaLabel, bullets[]
  • Pro bullets (4) vs Custom bullets (5)
  • Grid `lg:flex` side‑by‑side, stacked mobile
  • CTA button in each card → Demo Modal open

Checklist
☐ Tab underline animates (`transition-[transform,width]`)
☐ Copy pulled from content MD for future CMS

────────────────────────────────────────────────────────────────────────────
SEGMENT 6  | DEMO MODAL & FORM INFRA
────────────────────────────────────────────────────────────────────────────
files: components/DemoDialog.tsx, app/api/demo/route.ts

Dialog
  • Radix/Dialog inside shadcn `Dialog` wrapper
  • Fields: Name, Email, Company, Use Case
  • react-hook-form + zod schema (required, email pattern)
  • reCAPTCHA v3 token request `execute('demo_submit')`
  • On submit → `/api/demo` POST JSON

API route
  • Verify token w/ Google
  • Send email via SendGrid (template in lib/mailer)
  • Return 200 | 400

Checklist
☐ Success state "Thank you 🎉 We'll reach out within 24 h"
☐ Rate‑limit 3 req/IP/min (simple in‑memory Map)

────────────────────────────────────────────────────────────────────────────
SEGMENT 7  | DOCS & CAREERS ROUTES
────────────────────────────────────────────────────────────────────────────
• `/docs` external; just `router.push(external)` on click
• `/careers` page with YC link + commented Greenhouse embed snippet
• Add badge "Backed by YC S24" beside logo on careers page

────────────────────────────────────────────────────────────────────────────
SEGMENT 8  | FOOTER FINALIZATION & SOCIAL PROOF
────────────────────────────────────────────────────────────────────────────
• Insert 3 customer logos (png/svg from live site) horizontally
• Lazy‑load via `next/image` priority false
• Add SOC 2, GDPR mini badges row (24 px tall)

────────────────────────────────────────────────────────────────────────────
SEGMENT 9  | ACCESSIBILITY & SEO HARDENING
────────────────────────────────────────────────────────────────────────────
☐ Add skip‑link `a[href=\"#main\"]` visually hidden
☐ Focus rings via Tailwind `ring-2 ring-Pineapple`
☐ Per‑page <title>/<meta description> with next-seo
☐ JSON‑LD Product schema in `next-seo.config.mjs`

────────────────────────────────────────────────────────────────────────────
SEGMENT 10  | PERFORMANCE & DEPLOY
────────────────────────────────────────────────────────────────────────────
☐ `pnpm analyze` – any JS > 150 kB? → dynamic import
☐ Preload Greycliff w/ `<link rel=\"preload\" as=\"font\">`
☐ Vercel production deploy
☐ Lighthouse: LCP < 1.2 s, FID < 100 ms, CLS < 0.1
☐ Sentry captures front‑end errors, DSN set in env

────────────────────────────────────────────────────────────────────────────
## AGENT CHECKLIST (run every PR)
[ ] Prettier/lint passes  
[ ] `pnpm build` succeeds locally  
[ ] Mobile < 375 px viewport screenshots taken  
[ ] a11y checks via axe DevTools → no critical issues  
[ ] Preview link added to PR description  
[ ] Reviewer checklist satisfied

# End of sprint.md

# New segment added 2024-05-16 based on UI Clip recommendations
────────────────────────────────────────────────────────────────────────────
SEGMENT 11 | UI ANIMATION CLIPS (Hero/Features)
────────────────────────────────────────────────────────────────────────────
Goal: Replace static hero image/placeholder with short, polished UI video clips.

Approach:
[ ] Record short (3-5s) UI flow clips (60fps, WebM/MP4).
[ ] Create static poster frame for each clip.
[ ] Embed clips using `<video>` tag (autoplay, muted, loop, playsInline).
[ ] Implement lazy-loading for videos.
[ ] Add UI chrome (device frame) around video using React component.
[ ] Add Framer Motion entrance animation (fade/scale) to frame.
[ ] Optional: Add tiny Lottie/CSS overlay animations for clicks/feedback.
[ ] Ensure responsive video sizing.
[ ] Performance Check: Verify WebM usage, lazy-loading, poster fallback.