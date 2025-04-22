# sprint2.md ─ Case‑Study Page + Announcement Banner
# Scope: launch “Groq × Phonely” case‑study page (assets provided as TSX from Framer)
#         and deploy a global announcement banner promoting it.

────────────────────────────────────────────────────────────────────────────
SEGMENT 0  | ASSET INTAKE & CONVERSION
────────────────────────────────────────────────────────────────────────────
☐ Collect provided TSX files:
      • HeroHeadline.tsx  (groq + phonely logos, title block)
      • LatencyBars.tsx   (animated comparison bars)
      • AccuracyChart.tsx (bar graph component)
☐ Inspect each for Framer‑specific imports (`import { Frame } from 'framer'`)
☐ Replace Framer primitives with **Framer‑Motion** equivalents:
      • `<Frame animate>` → `<motion.div initial … animate … transition …>`
☐ Ensure animations rely on Tailwind classes & variants, no inline CSS.
☐ Import assets (logos, bar images) to `/public/case-study/`.

────────────────────────────────────────────────────────────────────────────
SEGMENT 1  | ANNOUNCEMENT BANNER
────────────────────────────────────────────────────────────────────────────
File: components/AnnouncementBanner.tsx

• Fixed to top, above `<Header>`, height 44 px, full‑width
• Message: “NEW ▶️ Groq × Phonely Case Study — see how Maitai slashed TTFP by 73%”
• CTA Button: “Read Now →” linking to `/case-studies/groq-phonely`
• Colors: bg-Pineapple text-[#090F0D]; on close (×) hide via useState + localStorage flag
• Add to `layout.tsx` above `<Header />`

Checklist
☐ Banner does not push content (body added `pt-44` only when banner visible)
☐ Focusable close button with `aria-label="Dismiss announcement"`

────────────────────────────────────────────────────────────────────────────
SEGMENT 2  | ROUTE & PAGE SHELL
────────────────────────────────────────────────────────────────────────────
Path: `app/case-studies/groq-phonely/page.tsx`

• Metadata via `generateMetadata()`:
    title, description, og:image `/case-study/og-groq-phonely.png`, publishedTime
• Hero section: import `HeroHeadline` component
• Sections map:
    ├── “Real‑Time Responsiveness” → <LatencyBars />
    ├── “Continuous Improvement” → <AccuracyChart />
    ├── Article body (MDX) pulled from `/content/case-groq-phonely.mdx`
    └── CTA footer: “Talk to Sales →”

Checklist
☐ Content width `.prose lg:prose-lg mx-auto`
☐ Green headline underline via pseudo `after:w-16 h-[3px] bg-Lime`

────────────────────────────────────────────────────────────────────────────
SEGMENT 3  | GRAPH & CHART POLISH
────────────────────────────────────────────────────────────────────────────
LatencyBars.tsx
  • Use Framer‑Motion `useInView` to trigger one‑time fill animation
  • Accessibility: `role="img" aria-label="Latency comparison bar chart"`

AccuracyChart.tsx
  • Switch to `recharts` BarChart if easier (no Framer) OR retain static SVG
  • Colors: bars — shades of Lagoon → MintCream gradient
  • Add `tabIndex=0` & tooltip text on hover

────────────────────────────────────────────────────────────────────────────
SEGMENT 4  | RESPONSIVE, DARK MODE
────────────────────────────────────────────────────────────────────────────
☐ Bars/graphs max‑width 600px, center on mobile
☐ Break long headings at `sm:` with `<br className="hidden sm:block" />`
☐ Respect existing dark‑mode toggle (if implemented later): use `dark:` classes

────────────────────────────────────────────────────────────────────────────
SEGMENT 5  | SEO & STRUCTURED DATA
────────────────────────────────────────────────────────────────────────────
☐ `<Article>` JSON‑LD:
    - headline, datePublished, author (Maitai), image, mainEntityOfPage
☐ Canonical tag in page head
☐ `case-studies/robots.txt` inherits robots allow

────────────────────────────────────────────────────────────────────────────
SEGMENT 6  | QA, ANALYTICS, & LAUNCH
────────────────────────────────────────────────────────────────────────────
☐ Axe a11y scan → zero critical issues
☐ Lighthouse: CLS < 0.1, LCP < 1.5 s on case‑study route
☐ Add Vercel Analytics custom event “cs_groq_phonely_read”
☐ Update sitemap.xml with new slug
☐ Merge PR → production; verify banner appears on home & internal pages

────────────────────────────────────────────────────────────────────────────
DEVELOPER CHECKLIST (each PR)
[ ] Updated snapshots / visual tests pass  
[ ] Preview link in PR description  
[ ] Confirm localStorage banner flag works (!)  
[ ] Mobile (>375px) screenshots attached  
[ ] Reviewer sign‑off

# End of sprint2.md