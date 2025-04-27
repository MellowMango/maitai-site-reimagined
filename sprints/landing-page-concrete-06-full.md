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
    *   `public/img/hero/` (Placeholder images/SVGs for event thumbs, partnership logos, illustrative SVGs)
*   **Key Requirements:**
    *   Layout: Full-width, `max-w-[1600px]`, specific min-heights.
    *   Navigation: Absolute positioned arrows, bottom pagination dots.
    *   Interaction: Click/drag-to-swipe (`framer-motion`), keyboard accessible.
    *   Card Variants: Implement distinct layouts for 'snapshot', 'partnership', 'event', 'why'.
    *   Animation: `framer-motion` variants for slide transitions.
    *   Data Handling: Inject 'snapshot' card at index 0.
    *   Responsive: Adapt layout and text truncation for mobile.
*   **Tasks:**
    *   [ ] Define data structures in `lib/heroCards.ts`.
    *   [ ] Create placeholder data in `lib/heroCards.ts`.
    *   [ ] Add placeholder assets to `public/img/hero/`.
    *   [ ] Implement `HeroCard.tsx` layouts for all variants.
    *   [ ] Implement `HeroCarousel.tsx` core structure and styling.
    *   [ ] Implement `framer-motion` carousel logic (state, pagination, arrows).
    *   [ ] Implement `framer-motion` drag-to-swipe interaction.
    *   [ ] Implement `framer-motion` animations.
    *   [ ] Ensure accessibility (focus states, ARIA roles).
    *   [ ] Responsive styling adjustments.

---

### Section #2: Performance Section

*   **Components:**
    *   `components/PerformanceSection/PerformanceSection.tsx`
    *   `components/PerformanceSection/ToggleTabs.tsx`
    *   `components/PerformanceSection/MetricCard.tsx`
*   **Data:**
    *   `lib/metrics.ts` (Define `MetricCard` type; add `text` and `voice` arrays)
*   **Assets:**
    *   `public/img/metrics/` (Placeholder chart SVGs/PNGs)
*   **Key Requirements:**
    *   Layout: Main section wrapper, grid for cards (2x2 desktop, column mobile).
    *   Tabs: Radix UI Tabs for "Text" / "Voice". Active state styling.
    *   Card: Simple structure (title, subhead, image).
    *   Interaction: Toggle tabs changes displayed metric grid.
    *   Animation: Fade transition on grid change (`AnimatePresence`).
*   **Tasks:**
    *   [ ] Define data structures and add placeholder data in `lib/metrics.ts`.
    *   [ ] Add placeholder assets to `public/img/metrics/`.
    *   [ ] Implement `MetricCard.tsx`.
    *   [ ] Implement `ToggleTabs.tsx` using Radix UI Tabs.
    *   [ ] Implement `PerformanceSection.tsx` layout.
    *   [ ] Connect Tabs to conditionally render metric grids.
    *   [ ] Add `AnimatePresence` for fade animation between grids.
    *   [ ] Responsive grid styling.

---

### Section #3: Compliance Strip

*   **Component:**
    *   `components/ComplianceStrip.tsx`
*   **Assets:**
    *   `public/img/compliance/` (`soc2.svg`, `hipaa.svg`, `ccpa.svg`)
*   **Key Requirements:**
    *   Layout: Centered flex row, specific gap, logo heights.
*   **Tasks:**
    *   [ ] Add compliance logo assets to `public/img/compliance/`.
    *   [ ] Implement `ComplianceStrip.tsx` with layout and image rendering (`next/image`).

---

### Section #4: Blog & Events CTA

*   **Component:**
    *   `components/BlogEventsCTA.tsx`
*   **Key Requirements:**
    *   Layout: Horizontal card structure (desktop), vertical stack (mobile).
    *   Content: Two distinct callouts ("View Blog", "Upcoming Events").
    *   Routing: Use `next/link` to `/blog?cat=all` and `/blog?cat=events`.
*   **Tasks:**
    *   [ ] Implement `BlogEventsCTA.tsx` structure and styling.
    *   [ ] Add `next/link` components with correct routes.
    *   [ ] Responsive styling adjustments.

---

### Section #5: Feature Scroller

*   **Components:**
    *   `components/FeatureScroller/FeatureScroller.tsx`
    *   `components/FeatureScroller/FeatureItem.tsx` (May just be `<li>` elements within `FeatureScroller.tsx`)
*   **Data:**
    *   `lib/features.ts` (Define `Feature` type; add feature list)
*   **Assets:**
    *   `public/img/features/` (Placeholder images for each feature - TBD, blueprint mentions `/public/img/...` generally but not a specific `/features` subdir, confirm asset paths)
*   **Key Requirements:**
    *   Layout: Two-column grid (lg+), left column sticky.
    *   Left Column: List (`ul`) of feature titles/links. Active state styling.
    *   Right Column: Relative container for images. Images fade based on scroll position.
    *   Interaction: Clicking list item scrolls to corresponding section (or syncs view), scrolling right column updates active item in left list.
    *   Scroll Behavior: Use IntersectionObserver (or Framer Motion `whileInView`) to trigger image fades and active state. Scroll snapping/margin.
*   **Tasks:**
    *   [ ] Define data structure and add placeholder data in `lib/features.ts`.
    *   [ ] Add placeholder assets to `public/img/features/` (or appropriate location).
    *   [ ] Implement `FeatureScroller.tsx` base layout (grid, sticky column).
    *   [ ] Implement left column list rendering.
    *   [ ] Implement right column image container.
    *   [ ] Implement scroll spy logic (IntersectionObserver or Framer Motion) to:
        *   Fade images in/out.
        *   Update active state in the left list.
    *   [ ] Implement smooth scrolling on list item click (optional but good UX).
    *   [ ] Responsive styling adjustments.

---

### Section #6: Sign-Up Banner

*   **Component:**
    *   `components/SignUpBanner.tsx`
*   **Key Requirements:**
    *   Reuse existing CTA component structure if applicable.
    *   Update copy: "Ready to build reliable AI? → Sign Up".
    *   Update route: Link to `/signup`.
*   **Tasks:**
    *   [ ] Identify and potentially rename/copy the old CTA component logic.
    *   [ ] Create `SignUpBanner.tsx`.
    *   [ ] Implement the banner with the new copy and link (`/signup`).

---

### Section #7: Docs and Code

*   **Component:**
    *   `components/DocsAndCode.tsx`
*   **Key Requirements:**
    *   No changes needed from existing implementation (as per blueprint).
*   **Tasks:**
    *   [ ] Verify component exists and is correctly placed/imported in the main page. (Covered by README update).

---

### Section #8: Partner Grid

*   **Component:**
    *   `components/PartnerGrid.tsx`
*   **Data:**
    *   `lib/partners.ts` (Define data structure for logo + link; add partner data)
*   **Assets:**
    *   `public/img/partners/` (Partner logos as SVG/PNG)
*   **Key Requirements:**
    *   Layout: Responsive grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`).
    *   Image Styling: `object-contain`, specific aspect ratio.
    *   Loading State: Placeholder skeleton with shimmer effect.
    *   Performance: Lazy load images (`next/image` `loading="lazy"`).
    *   Interaction: Clicking logo links to `/blog/[slug]` (Confirm slug source - likely from `lib/partners.ts`).
*   **Tasks:**
    *   [ ] Define data structure and add placeholder data (including slugs) in `lib/partners.ts`.
    *   [ ] Add partner logo assets to `public/img/partners/`.
    *   [ ] Implement `PartnerGrid.tsx` grid layout.
    *   [ ] Implement image rendering with `next/image`, `loading="lazy"`, and styling.
    *   [ ] Implement linking logic using `next/link`.
    *   [ ] Implement loading skeleton/shimmer effect (e.g., using Tailwind `animate-pulse`).

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
    *   [ ] Lazy load components or assets where appropriate (e.g., `PartnerGrid` images).
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