# Managing Hero Carousel Content

This document explains how to add, remove, and update the content displayed in the main landing page Hero Carousel.

## Data Source

The content for the Hero Carousel is managed in the following file:

```
lib/heroCards.ts
```

This file exports an array named `heroCardsData`, where each object in the array represents a single card (slide) in the carousel.

## Data Structure (`HeroCardData`)

Each card object conforms to the `HeroCardData` interface:

```typescript
import type { StaticImageData } from 'next/image';

export type HeroCardVariant = 'snapshot' | 'partnership' | 'event' | 'why';

export interface HeroCardData {
  id: string; // Unique identifier for the card (e.g., 'snapshot', 'partner-acme', 'event-webinar-q3')
  variant: HeroCardVariant; // Determines the card's layout and required fields
  title: string; // Main heading text for the card
  body?: string; // Optional body text (used primarily for 'snapshot')
  logo?: StaticImageData; // Optional partner logo (used for 'partnership' - Requires importing the image)
  stat?: string; // Optional highlight text (used for 'partnership')
  date?: string; // Optional event date (used for 'event')
  location?: string; // Optional event location (used for 'event')
  thumb?: StaticImageData; // Optional event thumbnail (used for 'event' - Requires importing the image)
}
```

## Card Variants

The `variant` property determines how the card is rendered and which data fields are expected:

*   **`snapshot`**: 
    *   Purpose: High-level pitch for Maitai.
    *   Required: `id`, `variant`, `title`
    *   Optional: `body`
    *   Note: A card with `id: 'snapshot'` is *always* automatically placed as the first card in the carousel, regardless of its position in the `heroCardsData` array.
*   **`partnership`**:
    *   Purpose: Showcase a partner integration or case study.
    *   Required: `id`, `variant`, `title`
    *   Optional: `stat` (e.g., "↓35% latency"), `logo` (Import the image file)
*   **`event`**:
    *   Purpose: Promote an upcoming webinar, conference, etc.
    *   Required: `id`, `variant`, `title`
    *   Optional: `date`, `location`, `thumb` (Import the image file)
*   **`why`**:
    *   Purpose: Placeholder for key value propositions (content TBD).
    *   Required: `id`, `variant`, `title`
    *   Optional: `body` (Currently unused in the component, but can be added later)

## How to Manage Content

### Adding a New Card

1.  Open `lib/heroCards.ts`.
2.  Scroll to the end of the `heroCardsData` array.
3.  Add a new object literal (`{ ... }`) inside the array.
4.  Define the required properties:
    *   `id`: Choose a unique, descriptive ID (e.g., `'partner-newcorp'`, `'event-conf-sf'`).
    *   `variant`: Set to `'partnership'`, `'event'`, or another appropriate variant (avoid creating a second `'snapshot'` or `'why'` unless intended).
    *   `title`: Add the main heading.
5.  Add any optional properties relevant to the chosen `variant` (e.g., `stat`, `date`, `location`).
6.  **If adding an image (`logo` or `thumb`):**
    *   Place the optimized image file (SVG, PNG, JPG, WebP) in `public/img/hero/`.
    *   Add an `import` statement at the top of `lib/heroCards.ts`, like:
        ```typescript
        import newPartnerLogo from '@/public/img/hero/new-partner-logo.svg';
        ```
    *   Assign the imported variable to the `logo` or `thumb` property in your new card object.

### Removing a Card

1.  Open `lib/heroCards.ts`.
2.  Find the object in the `heroCardsData` array that corresponds to the card you want to remove.
3.  Delete the entire object (from the opening `{` to the closing `}`), including the trailing comma if necessary.
4.  If the removed card had an associated image import at the top of the file, remove that import statement as well if it's no longer used by any other card.

### Updating Content

1.  Open `lib/heroCards.ts`.
2.  Find the object in the `heroCardsData` array for the card you want to update.
3.  Modify the values of the properties (`title`, `body`, `stat`, `date`, etc.) as needed.
4.  If changing an image, update the corresponding `import` statement and the `logo`/`thumb` property value.

## Important Notes

*   **Snapshot Card:** The card with `id: 'snapshot'` is always displayed first. You only need to edit its content within the array; its position doesn't matter.
*   **Ordering:** Other cards appear in the order they are listed in the `heroCardsData` array (after the snapshot card).
*   **Placeholders:** Currently, the component uses CSS gradients as placeholders for images. To use actual images, uncomment the `Image` components within `components/HeroCarousel/HeroCard.tsx` and ensure the `logo`/`thumb` properties are correctly set in `lib/heroCards.ts` with valid image imports. 