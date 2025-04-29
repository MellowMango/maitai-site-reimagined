# Sprint Plan: Landing Page Overhaul (CONCRETE-06-FULL)

**Goal:** Implement the new landing page design based on the "CONCRETE-06-FULL" blueprint.

**Repository:** `maitai-site-v2`
**Blueprint:** CONCRETE-06-FULL

---

## Order of Operations & Task Breakdown

This plan follows the section numbering from the blueprint.

### Pre-computation / Setup (Already Done)

*   [x] Update `README.md` with new file structure, tech stack, and archived components.
*   [x] Create new directory structure (`/components/HeroCarousel`, `/components/PerformanceSection`, etc.).
*   [x] Archive deprecated components and assets to `/archive`.
*   [x] Create placeholder data files in `/lib`.
*   [x] Create placeholder asset directories in `/public/img`.

---

### Section #1: Hero Carousel

*   **Components:**
    *   `components/HeroCarousel/HeroCarousel.tsx`
    *   `components/HeroCarousel/HeroCard.tsx`
*   **Data:**
    *   `lib/heroCards.ts` (Define `HeroCardData`, `HeroCardVariant`; add sample data)
*   **Assets:**
    *   `public/img/hero/` (Placeholder gradients used initially; actual assets can be added later)
*   **Key Requirements:**
    *   Layout: Full-width, `max-w-[1600px]`, specific min-heights.
    *   Navigation: Absolute positioned arrows, bottom pagination dots.
    *   Interaction: Click/drag-to-swipe (`framer-motion`), keyboard accessible.
    *   Card Variants: Implement distinct layouts for 'snapshot', 'partnership', 'event', 'why'.
    *   Animation: `framer-motion` variants for slide transitions.
    *   Data Handling: Inject 'snapshot' card at index 0.
    *   Responsive: Adapt layout and text truncation for mobile.
*   **Tasks:**
    *   [x] Define data structures in `lib/heroCards.ts`.
    *   [x] Create placeholder data in `lib/heroCards.ts`.
    *   [x] Add placeholder assets/gradients to `public/img/hero/`.
    *   [x] Implement `HeroCard.tsx` layouts for all variants (using full-width gradient approach).
    *   [x] Implement `HeroCarousel.tsx` core structure and styling.
    *   [x] Implement `framer-motion` carousel logic (state, pagination, arrows).
    *   [x] Implement `framer-motion` drag-to-swipe interaction.
    *   [x] Implement `framer-motion` animations.
    *   [x] Ensure accessibility (focus states, ARIA roles).
    *   [x] Responsive styling adjustments.

---

### Section #2: Performance Section

*   **Components:**
    *   `components/PerformanceSection/PerformanceSection.tsx`
    *   `components/PerformanceSection/ToggleTabs.tsx`
    *   `components/PerformanceSection/MetricCard.tsx`
    *   `components/PerformanceSection/charts/AccuracyChart.tsx` (Moved & Cleaned)
    *   `components/PerformanceSection/charts/TTFTComparison.tsx` (Moved & Cleaned)
*   **Data:**
    *   `lib/metrics.ts` (Updated `MetricCardData`; use specific PNGs/TSX components)
*   **Assets:**
    *   `public/animations/phonely-case-study/continuously-improving-v2.png`
    *   `public/animations/phonely-case-study/tps-graph-v2.png`
    *   (Removed old placeholder SVGs from `public/img/metrics/`)
*   **Key Requirements:**
    *   Layout: Main section wrapper, grid for cards (2x1 or 2x2 desktop, column mobile - adjusted to 2 cards).
    *   Tabs: Radix UI Tabs for "Text" / "Voice". Active state styling.
    *   Card: Renders `next/image` or React component based on data.
    *   Interaction: Toggle tabs changes displayed metric grid.
    *   Animation: Fade transition on grid change (`AnimatePresence`).
*   **Tasks:**
    *   [x] Define/Update data structures and add specific data in `lib/metrics.ts`.
    *   [x] Move and clean chart components (`AccuracyChart`, `TTFTComparison`).
    *   [x] Update `MetricCard.tsx` to render images or components.
    *   [x] Implement `ToggleTabs.tsx` using Radix UI Tabs.
    *   [x] Implement `PerformanceSection.tsx` layout.
    *   [x] Connect Tabs to conditionally render metric grids.
    *   [x] Add `AnimatePresence` for fade animation between grids.
    *   [x] Responsive grid styling.

---

### Section #3: Compliance Strip

*   **Component:**
    *   `components/ComplianceStrip.tsx`
*   **Assets:**
    *   `public/img/compliance/` (`soc2.svg`, `hipaa.svg`, `ccpa.svg`)
*   **Key Requirements:**
    *   Layout: Horizontal bar with 3 cards + heading (Responsive)
*   **Tasks:**
    *   [x] Implement `ComplianceStrip.tsx` with layout and content.

---

### Section #4: Blog & Events CTA

*   **Component:**
    *   `components/BlogEventsCTA.tsx`
*   **Key Requirements:**
    *   Layout: Two stacked colored panels (vertical).
    *   Content: Two distinct callouts ("Explore our Blog", "Explore Upcoming Events").
    *   Interaction: Hover triggers gradient and arrow visibility/slide.
    *   Routing: Use `next/link` to `/blog?cat=all` and `/blog?cat=events`.
*   **Tasks:**
    *   [x] Implement `BlogEventsCTA.tsx` structure and styling.
    *   [x] Add `next/link` components with correct routes.
    *   [x] Implement hover effects (gradient, arrow).
    *   [x] Responsive styling adjustments.
    *   (Note: Hover animation smoothness can be revisited if needed)

---

### Section #5: Feature Scroller

*   **Components:**
    *   `components/FeatureScroller/FeatureScroller.tsx`
*   **Data:**
    *   `lib/features.ts`
*   **Assets:**
    *   `public/img/features/` (Placeholders used in right column for now)
*   **Key Requirements:**
    *   Layout: Two-column grid (lg+), left column sticky.
    *   Left Column: List (`ul`) of feature titles/links. Active state styling (bold, color, bg tint, border).
    *   Right Column: Placeholder content sections for each feature.
    *   Interaction:
        *   Clicking list item smoothly scrolls to corresponding right column section.
        *   Scrolling right column updates active item in left list (Scroll Spy).
    *   Scroll Behavior: Use IntersectionObserver for scroll spy.
*   **Tasks:**
    *   [x] Define data structure and add placeholder data in `lib/features.ts`.
    *   [x] Add placeholder assets (text content) to right column.
    *   [x] Implement `FeatureScroller.tsx` base layout (grid, sticky column).
    *   [x] Implement left column list rendering and active state styling.
    *   [x] Implement right column placeholder content rendering.
    *   [x] Implement scroll spy logic (IntersectionObserver) to update active state in the left list.
    *   [x] Implement smooth scrolling on list item click.
    *   [x] Responsive styling adjustments.
    *   (Note: Right column needs actual images/visualizations)

---

### Section #6: Sign-Up Banner

*   **Component:**
    *   `components/SignUpBanner.tsx` (Implemented as an embedded form)
*   **API Route:**
    *   `app/api/signup/route.ts` (Placeholder, accepts form data)
*   **Key Requirements:**
    *   Implement as an embedded form (email input + submit).
    *   Capture fields: `firstName`, `lastName`, `businessEmail`, `companyName`, `companySize`, `whyMaitai`.
    *   Use `react-hook-form`, `zod` for validation.
    *   Integrate `reCAPTCHA v3`.
    *   Submit data + token to `/api/signup` route.
    *   Layout should be wider, potentially using a grid structure.
*   **Tasks:**
    *   [x] Create `components/SignUpBanner.tsx` with form logic.
    *   [x] Create placeholder `app/api/signup/route.ts`.
    *   [x] Integrate reCAPTCHA.
    *   [x] Remove `numSDRsAEs` field from `app/demo/page.tsx`.
    *   [x] Expand banner form fields and layout.
    *   [x] Update API route schema.
    *   [x] Ensure component is rendered in `app/page.tsx`.
    *   [x] Update documentation (`README.md`, this file).

---

### Section #7: Docs and Code

*   **Component:**
    *   `components/DocsAndCode.tsx`
*   **Key Requirements:**
    *   Replicate content from previous design (heading, text, docs link, code snippet).
    *   Use Python code snippet from `old-site-copy.md`.
    *   Basic code styling/highlighting.
*   **Tasks:**
    *   [x] Create/Implement `DocsAndCode.tsx` with content and layout.
    *   [x] Verify component exists and is correctly placed/imported in `app/page.tsx`.

---

### Section #8: Client Grid

*   **Note:** Renamed from "Partner Grid" to reflect focus on customers/clients.

*   **Component:**
    *   `components/ClientGrid.tsx`
*   **Data:**
    *   `lib/clients.ts` (Define data structure for multiple item types: logo, quote, image; add placeholder data)
*   **Assets:**
    *   `public/img/clients/` (Client logos, images as SVG/PNG)
*   **Key Requirements:**
    *   Layout: Responsive grid (e.g., `lg:grid-cols-4`) mimicking reference, allowing items to span rows/columns based on type.
    *   Card Types: Implement visual variations for Logo, Quote, and Image cards.
    *   Image Styling: Use `next/image`, `object-contain` for logos, `object-cover` for images.
    *   Interaction: Decorative '+' elements on quote/image cards link to specific `blogUrl` defined in `lib/clients.ts` (with fallback).
    *   Loading State: (Deferred - Basic implementation complete without loading state).
    *   Performance: Lazy load images (`next/image` `loading="lazy"`).
*   **Tasks:**
    *   [x] Rename component, data file, assets dir to `Client*`.
    *   [x] Update `README.md`, `app/page.tsx` references.
    *   [x] Define data structure (`ClientGridItem` union type, including `blogUrl`) and add placeholder data in `lib/clients.ts`.
    *   [x] Add placeholder assets to `public/img/clients/` (Phonely logo, headshot path).
    *   [x] Implement `ClientGrid.tsx` responsive grid layout.
    *   [x] Implement conditional rendering for different card types (Logo, Quote, Image).
    *   [x] Implement styling for each card type using `next/image`.
    *   [x] Add decorative '+' elements.
    *   [x] Link '+' buttons to `blogUrl` from data.
    *   [ ] Implement loading skeleton/shimmer effect (Deferred).

---

### Section #9: Footer

*   **Component:**
    *   `components/Footer.tsx`
*   **Key Requirements:**
    *   No changes needed from existing implementation.
*   **Tasks:**
    *   [ ] Verify component exists and is correctly placed/imported. (Covered by README update).

---

### Integration & Global Concerns

*   **Component Integration:**
    *   [ ] Update `app/page.tsx` to import and render all new section components in the correct order.
*   **Accessibility (Ongoing):**
    *   [ ] Ensure all images have meaningful `alt` text.
    *   [ ] Ensure keyboard navigability and visible focus states (`ring-2 brand`).
    *   [ ] Use semantic HTML and ARIA attributes where necessary.
*   **Performance (Ongoing):**
    *   [ ] Optimize images (`next/image`).
    *   [ ] Lazy load components or assets where appropriate (e.g., `ClientGrid` images).
    *   [ ] Monitor bundle size.
    *   [ ] Target Lighthouse score ≥ 90.
*   **Data Placeholders:**
    *   [ ] Track placeholder assets (hero illustrations, metric charts) that need replacement.
    *   [ ] Track placeholder data (e.g., 'Why' hero card content) needing updates.
*   **Styling & Responsiveness:**
    *   [ ] Ensure consistent use of Tailwind theme/tokens.
    *   [ ] Test thoroughly across specified breakpoints (sm, md, lg, xl, 2xl).

---

### Future Hooks / TODOs (Post-Sprint)

*   [ ] Replace placeholder metric charts with live `Chart.js` integration.
*   [ ] Populate "Why" hero card content.
*   [ ] Evaluate dynamic CMS integration for Hero/Blog content. 