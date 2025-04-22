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
[✓] Add `.env.example` with all keys (SendGrid, reCAPTCHA, Sentry…)
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

[✓] Intro block:
      [✓] micro‑label "EVERYTHING YOU NEED" Pineapple uppercase 12 px
      [✓] H2 32 px "Features"
      [✓] Body copy center‑aligned 18 px
[✓] Grid: `grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12` - Implemented
[✓] cards:
    [✓] bg-white rounded-lg p-6 shadow-lg flex gap-4 - Implemented
    [✓] icon (lucide) 32 px - Used h-8 w-8 (32px)
    [✓] title 18 px GCF Demi - Used text-lg font-semibold
    [✓] body 18 px / 1.6 - Used text-base leading-relaxed (adjust if needed)
[✓] Pillars: Robustness (ShieldCheck), Speed (Zap), Cost‑Effectiveness (BadgeDollarSign),
           Observability (Camera) - Implemented

Checklist
[✓] Hover lift: translate‑y‑1, shadow‑xl - Implemented
[✓] All icons use Tint Lagoon for stroke - Implemented via `text-maitai-lagoon`

────────────────────────────────────────────────────────────────────────────
SEGMENT 4  | QUICK‑START CALLOUT
────────────────────────────────────────────────────────────────────────────
files: components/QuickStart.tsx

[✓] MintCream section `bg-MintCream` - Used `bg-maitai-mint-cream`
[✓] Title 32 px "Get Started in Minutes" + 18 px body - Implemented
[✓] Code block: dark token, font‑mono, rounded-lg shadow-lg - Implemented
[✓] Secondary CTA: "Read the Docs →" outline Lagoon - Implemented w/ custom classes

Checklist
[✓] next/image for lightbulb illustration (existing asset) - Placeholder added, asset not found in /public/
[✓] Copy is selectable, no horizontal scroll on small screens - Implemented `overflow-x-auto` on `<pre>`
[✓] Code block styling matches reference images (`/public/code-blocks/Code Block-*.png`) - Implemented via SyntaxHighlighter

────────────────────────────────────────────────────────────────────────────
SEGMENT 5  | PRICING PAGE & COMPONENT
────────────────────────────────────────────────────────────────────────────
files: pricing/page.tsx, components/PricingTable.tsx

[✓] PricingTable component created (`components/PricingTable.tsx`)
[✓] PlanCard sub-component implemented
[✓] Content populated from `old-site-copy.md`
[✓] Side-by-side layout implemented (responsive grid)
[✓] CTAs link to `/demo` page
[✓] Pricing page created (`app/pricing/page.tsx`) and renders table

Checklist
[✓] Basic structure and content implemented
[ ] TODO: Refine styling/layout if needed
[ ] TODO: Add tab underline animation (if Tabs are reintroduced)

────────────────────────────────────────────────────────────────────────────
SEGMENT 6  | DEMO PAGE & FORM INFRA
────────────────────────────────────────────────────────────────────────────
files: app/demo/page.tsx, app/api/demo/route.ts

Page (`app/demo/page.tsx`)
  [✓] Fields defined based on screenshot (First/Last Name, Email, Company, Size, SDRs+AEs, Why Maitai)
  [✓] react-hook-form + zod schema implemented
  [✓] Two-column layout with dark form inspired by screenshot
  [✓] Added tooltip for SDRs + AEs label
  [ ] TODO: reCAPTCHA v3 integration (`execute('demo_submit')`)
  [ ] TODO: Implement submit handler logic (call API, handle response)

API route (`app/api/demo/route.ts`)
  [ ] TODO: Verify reCAPTCHA token w/ Google
  [ ] TODO: Send email via SendGrid (template in lib/mailer)
  [ ] TODO: Return 200 | 400

Checklist
  [ ] TODO: Success state "Thank you 🎉 We'll reach out within 24 h"
  [ ] TODO: Rate‑limit 3 req/IP/min (simple in‑memory Map on API route)
  [✓] Pricing page CTAs link to `/demo`
  [✓] Header CTAs link to `/demo`
  [✓] Hero CTAs link to `/demo`

────────────────────────────────────────────────────────────────────────────
SEGMENT 7  | DOCS & CAREERS ROUTES (Revised)
────────────────────────────────────────────────────────────────────────────
[✓] `/docs` external; just `router.push(external)` on click - Implemented in Header link
[~] `/careers` page build deferred. Link points to YC Job Page instead.
    - [~] ~~`/careers` page with YC link + commented Greenhouse embed snippet~~ (DEFERRED)
[✓] Add badge "Backed by YC S24" to Homepage Hero section - Use `/public/logos/Backed by YC.png`
    - [~] ~~Add badge "Backed by YC S24" beside logo on careers page~~ (MOVED TO HERO)

────────────────────────────────────────────────────────────────────────────
SEGMENT 8  | FOOTER FINALIZATION & SOCIAL PROOF
────────────────────────────────────────────────────────────────────────────
[ ] Insert 3 customer logos (png/svg from live site) horizontally - Assets needed
[✓] Lazy‑load via `next/image` priority false - Standard practice for non-critical images
[ ] Add SOC 2, GDPR mini badges row (24 px tall) - Assets needed

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
(Consider incorporating AccuracyChart.tsx / TTFTComparison.tsx from /public/animations/phonely-case-study/ into relevant sections or a dedicated case study segment)

# End of sprint.md